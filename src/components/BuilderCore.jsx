'use client';
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Database, Shield, Code2, Settings, ChevronRight, Check, Terminal, Copy, CheckCheck, HardDrive, RefreshCw, File, FolderOpen } from 'lucide-react';
import { useSessionStorage } from '@/hooks/useSessionStorage';

const databases = ['MongoDB', 'PostgreSQL'];
const middlewareOptions = ['CORS', 'Rate Limiting', 'Helmet', 'Compression', 'Morgan'];

const keywordClass = 'text-[#c586c0]';
const fnClass = 'text-[#dcdcaa]';
const stringClass = 'text-[#6a9fb5]';
const commentClass = 'text-[#4a4a4a] italic';
const defaultClass = 'text-[#a0a0a0]';

const keywords = new Set(['const','let','var','function','return','if','else','try','catch','async','await','new','import','require','from','export','default','class','extends','true','false','null','undefined','throw','for','while','switch','case','break','continue','typeof','instanceof','this','module']);
const fns = new Set(['app','express','mongoose','jwt','bcrypt','redis','Router','Pool','Schema','model','use','get','post','put','delete','listen','connect','query','find','findById','findOne','save','update','deleteOne','create','sign','verify','compare','genSalt','hash','json','send','status']);

function SyntaxHighlight({ line }) {
  if (!line) return <span>&nbsp;</span>;
  const parts = [];
  const regex = /(\/\/.*|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`|\b\w+\b)/g;
  let lastIndex = 0, match;
  while ((match = regex.exec(line)) !== null) {
    if (match.index > lastIndex)
      parts.push(<span key={lastIndex} className={defaultClass}>{line.slice(lastIndex, match.index)}</span>);
    const val = match[0];
    let cls = defaultClass;
    if (val.startsWith('//')) cls = commentClass;
    else if (val.startsWith('"') || val.startsWith("'") || val.startsWith('`')) cls = stringClass;
    else if (keywords.has(val)) cls = keywordClass;
    else if (fns.has(val)) cls = fnClass;
    parts.push(<span key={match.index} className={cls}>{val}</span>);
    lastIndex = match.index + val.length;
  }
  if (lastIndex < line.length)
    parts.push(<span key={lastIndex} className={defaultClass}>{line.slice(lastIndex)}</span>);
  return <>{parts}</>;
}

function CodeView({ code, fileName, onCopy, copied }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/[0.06] bg-white/[0.02] shrink-0">
        <div className="flex items-center gap-2 text-xs text-[#a0a0a0]">
          <File size={12} />
          {fileName}
        </div>
        <button onClick={onCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 text-xs rounded glass hover:bg-white/[0.08] transition-colors text-[#a0a0a0] hover:text-white"
        >
          {copied ? <CheckCheck size={12} className="text-green-400" /> : <Copy size={12} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="p-4 text-sm leading-6 overflow-auto flex-1">
        <code className="font-mono">
          {code.split('\n').map((line, i) => (
            <div key={i} className="whitespace-pre">
              <span className="select-none text-[#444] inline-block w-8 mr-4 text-right text-xs">{i + 1}</span>
              <SyntaxHighlight line={line} />
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
}

function FileTree({ files, selected, onSelect }) {
  const groups = {};
  files.forEach((f) => {
    const parts = f.path.split('/');
    if (parts.length > 1) {
      const dir = parts[0];
      if (!groups[dir]) groups[dir] = [];
      groups[dir].push(f);
    } else {
      if (!groups['/']) groups['/'] = [];
      groups['/'].push(f);
    }
  });

  const sortedDirs = Object.keys(groups).sort((a, b) => {
    if (a === '/') return -1;
    if (b === '/') return 1;
    return a.localeCompare(b);
  });

  return (
    <div className="p-2 space-y-0.5">
      {sortedDirs.map((dir) => (
        <div key={dir}>
          {dir !== '/' && (
            <div className="flex items-center gap-1.5 px-2 py-1.5 text-xs text-[#666]">
              <FolderOpen size={10} />
              {dir}/
            </div>
          )}
          {groups[dir].map((f) => (
            <button
              key={f.path}
              onClick={() => onSelect(f.path)}
              className={`w-full flex items-center gap-2 px-3 py-1.5 rounded text-xs transition-colors text-left ${
                selected === f.path
                  ? 'bg-accent/15 text-accent'
                  : 'text-[#a0a0a0] hover:text-white hover:bg-white/[0.03]'
              }`}
            >
              <File size={10} className="shrink-0" />
              <span className="truncate">{f.path.split('/').pop()}</span>
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function BuilderCore({ compact = false }) {
  const [db, setDb] = useSessionStorage('builder-db', 'MongoDB');
  const [auth, setAuth] = useSessionStorage('builder-auth', true);
  const [apiGen, setApiGen] = useSessionStorage('builder-api', true);
  const [useRedis, setUseRedis] = useSessionStorage('builder-redis', true);
  const [selectedMiddleware, setSelectedMiddleware] = useSessionStorage('builder-middleware', ['CORS']);
  const [generated, setGenerated] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [copiedFile, setCopiedFile] = useState(null);

  const toggleMiddleware = (m) => {
    setSelectedMiddleware((prev) =>
      prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]
    );
  };

  const handleGenerate = async () => {
    setGenerating(true);
    setCopiedFile(null);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ db, auth, apiGen, redis: useRedis, middleware: selectedMiddleware }),
      });
      const data = await res.json();
      if (data.success) {
        setFiles(data.files);
        setSelectedFile(data.files[0]?.path || null);
        setGenerated(true);
      } else {
        setFiles([{ path: 'error.txt', code: '// Error generating code' }]);
        setSelectedFile('error.txt');
        setGenerated(true);
      }
    } catch {
      setFiles([{ path: 'error.txt', code: '// Error: Could not reach generation endpoint' }]);
      setSelectedFile('error.txt');
      setGenerated(true);
    }
    setGenerating(false);
  };

  const handleCopy = async (path) => {
    const f = files.find((x) => x.path === path);
    if (!f) return;
    try {
      await navigator.clipboard.writeText(f.code);
      setCopiedFile(path);
      setTimeout(() => setCopiedFile(null), 2000);
    } catch {}
  };

  const controls = (
    <div className="glass rounded-xl p-6 space-y-6">
      <div>
        <label className="text-sm font-medium text-[#a0a0a0] mb-3 flex items-center gap-2">
          <Database size={16} className="text-accent" /> Database
        </label>
        <div className="flex gap-2">
          {databases.map((d) => (
            <button key={d} onClick={() => setDb(d)}
              className={`px-4 py-2 rounded-lg text-sm transition-all ${db === d ? 'bg-accent text-[#0a0a0a] font-medium' : 'glass text-[#a0a0a0] hover:text-white'}`}
            >{d}</button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-[#a0a0a0] mb-3 flex items-center gap-2">
          <Settings size={16} className="text-accent" /> Middleware
        </label>
        <div className="flex flex-wrap gap-2">
          {middlewareOptions.map((m) => (
            <button key={m} onClick={() => toggleMiddleware(m)}
              className={`px-3 py-1.5 rounded-lg text-xs transition-all ${selectedMiddleware.includes(m) ? 'bg-accent/20 text-accent border border-accent/30' : 'glass text-[#666] hover:text-[#a0a0a0] border border-transparent'}`}
            >{selectedMiddleware.includes(m) && <Check size={10} className="inline mr-1" />}{m}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-[#a0a0a0] mb-3 flex items-center gap-2">
            <Shield size={16} className="text-accent" /> JWT Auth
          </label>
          <button onClick={() => setAuth(!auth)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${auth ? 'bg-accent' : 'bg-white/[0.1]'}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${auth ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>

        <div>
          <label className="text-sm font-medium text-[#a0a0a0] mb-3 flex items-center gap-2">
            <Code2 size={16} className="text-accent" /> API Generator
          </label>
          <button onClick={() => setApiGen(!apiGen)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${apiGen ? 'bg-accent' : 'bg-white/[0.1]'}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${apiGen ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>

        <div>
          <label className="text-sm font-medium text-[#a0a0a0] mb-3 flex items-center gap-2">
            <HardDrive size={16} className="text-accent" /> Redis Cache
          </label>
          <button onClick={() => setUseRedis(!useRedis)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${useRedis ? 'bg-accent' : 'bg-white/[0.1]'}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${useRedis ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>
      </div>

      <button onClick={handleGenerate} disabled={generating}
        className="btn-primary w-full justify-center text-base disabled:opacity-50"
      >
        {generating ? <><RefreshCw size={16} className="animate-spin" /> Generating...</>
        : generated ? <><RefreshCw size={16} /> Regenerate</>
        : <>Generate Code <ChevronRight size={18} /></>}
      </button>
    </div>
  );

  const currentFile = files.find((f) => f.path === selectedFile);
  const output = (
    <div className="glass rounded-xl overflow-hidden flex flex-col h-[550px]">
      {generating ? (
        <div className="flex items-center justify-center flex-1">
          <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-accent text-sm flex items-center gap-2"
          >
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
              className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full"
            />
            Generating your Express.js app...
          </motion.div>
        </div>
      ) : generated && files.length > 0 ? (
        <div className="flex flex-1 overflow-hidden">
          <div className="w-44 shrink-0 border-r border-white/[0.06] overflow-y-auto bg-white/[0.01]">
            <div className="px-3 py-2 text-xs text-[#666] border-b border-white/[0.06] flex items-center gap-1.5">
              <Terminal size={10} />
              files
            </div>
            <FileTree files={files} selected={selectedFile} onSelect={setSelectedFile} />
          </div>
          <div className="flex-1 overflow-hidden">
            {currentFile ? (
              <CodeView
                code={currentFile.code}
                fileName={currentFile.path}
                onCopy={() => handleCopy(currentFile.path)}
                copied={copiedFile === currentFile.path}
              />
            ) : (
              <div className="flex items-center justify-center h-full text-[#666] text-sm">
                Select a file
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center flex-1 text-[#666] text-sm">
          Configure options and click Generate
        </div>
      )}
    </div>
  );

  if (compact) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4">{controls}</div>
          <div className="lg:col-span-8">{output}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2">{controls}</div>
        <div className="lg:col-span-3">{output}</div>
      </div>
    </div>
  );
}

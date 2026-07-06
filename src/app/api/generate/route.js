import { generateCode } from '@/utils/codeGenerator';

export async function POST(request) {
  try {
    const options = await request.json();
    const files = generateCode(options);
    const fileList = Object.entries(files).map(([path, code]) => ({ path, code }));
    return Response.json({ files: fileList, success: true });
  } catch (err) {
    return Response.json({ error: 'Failed to generate code', success: false }, { status: 400 });
  }
}

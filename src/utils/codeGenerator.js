function lines(strs) {
  return strs.join('\n');
}

export function generateCode({
  db = 'MongoDB',
  auth = true,
  apiGen = true,
  redis = true,
  middleware = [],
} = {}) {
  const files = {};

  // ─── config/env.js ───
  files['config/env.js'] = lines([
    `module.exports = {`,
    `  port: process.env.PORT || 3000,`,
    db === 'MongoDB'
      ? `  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/express-api',`
      : `  db: {`,
    db !== 'MongoDB' ? `    host: process.env.DB_HOST || 'localhost',` : '',
    db !== 'MongoDB' ? `    port: parseInt(process.env.DB_PORT) || 5432,` : '',
    db !== 'MongoDB' ? `    database: process.env.DB_NAME || 'express_api',` : '',
    db !== 'MongoDB' ? `    user: process.env.DB_USER || 'postgres',` : '',
    db !== 'MongoDB' ? `    password: process.env.DB_PASSWORD || 'password',` : '',
    db !== 'MongoDB' ? `  },` : '',
    ...(auth ? [
      `  jwtSecret: process.env.JWT_SECRET || 'your-secret-key-change-in-production',`,
      `  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',`,
    ] : []),
    ...(redis ? [
      `  redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',`,
    ] : []),
    `};`,
    ``,
  ]);

  // ─── config/database.js ───
  if (db === 'MongoDB') {
    files['config/database.js'] = lines([
      `const mongoose = require('mongoose');`,
      `const { mongoUri } = require('./env');`,
      ``,
      `const connectDB = async () => {`,
      `  try {`,
      `    await mongoose.connect(mongoUri);`,
      `    console.log('MongoDB connected successfully');`,
      `  } catch (err) {`,
      `    console.error('MongoDB connection error:', err);`,
      `    process.exit(1);`,
      `  }`,
      `};`,
      ``,
      `module.exports = connectDB;`,
      ``,
    ]);
  } else {
    files['config/database.js'] = lines([
      `const { Pool } = require('pg');`,
      `const { db: dbConfig } = require('./env');`,
      ``,
      `const pool = new Pool(dbConfig);`,
      ``,
      `const connectDB = async () => {`,
      `  try {`,
      `    await pool.query('SELECT NOW()');`,
      `    console.log('PostgreSQL connected successfully');`,
      `  } catch (err) {`,
      `    console.error('PostgreSQL connection error:', err);`,
      `    process.exit(1);`,
      `  }`,
      `};`,
      ``,
      `const initTables = async () => {`,
      ...(auth ? [
        `  await pool.query('CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, name VARCHAR(255) NOT NULL, email VARCHAR(255) UNIQUE NOT NULL, password VARCHAR(255) NOT NULL, created_at TIMESTAMP DEFAULT NOW())');`,
      ] : []),
      ...(apiGen ? [
        `  await pool.query('CREATE TABLE IF NOT EXISTS items (id SERIAL PRIMARY KEY, name VARCHAR(255) NOT NULL, description TEXT, created_at TIMESTAMP DEFAULT NOW(), updated_at TIMESTAMP DEFAULT NOW())');`,
      ] : []),
      `};`,
      ``,
      `module.exports = { pool, connectDB, initTables };`,
      ``,
    ]);
  }

  // ─── config/redis.js ───
  if (redis) {
    files['config/redis.js'] = lines([
      `const redis = require('redis');`,
      `const { redisUrl } = require('./env');`,
      ``,
      `const redisClient = redis.createClient({ url: redisUrl });`,
      ``,
      `redisClient.on('error', (err) => console.error('Redis Client Error', err));`,
      ``,
      `const getOrSetCache = async (key, fetchFn, ttl = 60) => {`,
      `  try {`,
      `    const cached = await redisClient.get(key);`,
      `    if (cached) {`,
      `      console.log('Cache hit for:', key);`,
      `      return JSON.parse(cached);`,
      `    }`,
      `    console.log('Cache miss for:', key);`,
      `    const data = await fetchFn();`,
      `    await redisClient.setEx(key, ttl, JSON.stringify(data));`,
      `    return data;`,
      `  } catch (err) {`,
      `    console.error('Cache error:', err);`,
      `    return fetchFn();`,
      `  }`,
      `};`,
      ``,
      `module.exports = { redisClient, getOrSetCache };`,
      ``,
    ]);
  }

  // ─── middleware/auth.middleware.js ───
  if (auth) {
    files['middleware/auth.middleware.js'] = lines([
      `const jwt = require('jsonwebtoken');`,
      `const { jwtSecret } = require('../config/env');`,
      ``,
      `const authenticateToken = (req, res, next) => {`,
      `  const authHeader = req.headers['authorization'];`,
      `  const token = authHeader && authHeader.split(' ')[1];`,
      `  if (!token) return res.status(401).json({ error: 'Access token required' });`,
      ``,
      `  jwt.verify(token, jwtSecret, (err, user) => {`,
      `    if (err) return res.status(403).json({ error: 'Invalid or expired token' });`,
      `    req.user = user;`,
      `    next();`,
      `  });`,
      `};`,
      ``,
      `module.exports = { authenticateToken };`,
      ``,
    ]);
  }

  // ─── middleware/errorHandler.js ───
  files['middleware/errorHandler.js'] = lines([
    `const errorHandler = (err, req, res, next) => {`,
    `  console.error('Unhandled error:', err);`,
    `  res.status(500).json({ error: 'Internal server error' });`,
    `};`,
    ``,
    `const notFoundHandler = (req, res) => {`,
    `  res.status(404).json({ error: 'Route not found' });`,
    `};`,
    ``,
    `module.exports = { errorHandler, notFoundHandler };`,
    ``,
  ]);

  // ─── models/User.model.js ───
  if (auth && db === 'MongoDB') {
    files['models/User.model.js'] = lines([
      `const mongoose = require('mongoose');`,
      ``,
      `const userSchema = new mongoose.Schema({`,
      `  name: { type: String, required: true },`,
      `  email: { type: String, required: true, unique: true },`,
      `  password: { type: String, required: true },`,
      `  createdAt: { type: Date, default: Date.now },`,
      `});`,
      ``,
      `module.exports = mongoose.model('User', userSchema);`,
      ``,
    ]);
  }

  // ─── models/Item.model.js ───
  if (apiGen && db === 'MongoDB') {
    files['models/Item.model.js'] = lines([
      `const mongoose = require('mongoose');`,
      ``,
      `const itemSchema = new mongoose.Schema({`,
      `  name: { type: String, required: true },`,
      `  description: { type: String },`,
      `  createdAt: { type: Date, default: Date.now },`,
      `  updatedAt: { type: Date, default: Date.now },`,
      `});`,
      ``,
      `module.exports = mongoose.model('Item', itemSchema);`,
      ``,
    ]);
  }

  // ─── controllers/auth.controller.js ───
  if (auth) {
    const UserModel = db === 'MongoDB' ? `const User = require('../models/User.model');` : `const { pool } = require('../config/database');`;
    files['controllers/auth.controller.js'] = lines([
      `const bcrypt = require('bcryptjs');`,
      `const jwt = require('jsonwebtoken');`,
      UserModel,
      `const { jwtSecret, jwtExpiresIn } = require('../config/env');`,
      ``,
      `const register = async (req, res) => {`,
      `  try {`,
      `    const { name, email, password } = req.body;`,
      `    if (!name || !email || !password) {`,
      `      return res.status(400).json({ error: 'All fields are required' });`,
      `    }`,
      db === 'MongoDB' ? [
      `    const existingUser = await User.findOne({ email });`,
      `    if (existingUser) return res.status(409).json({ error: 'Email already in use' });`,
      `    const salt = await bcrypt.genSalt(10);`,
      `    const hashedPassword = await bcrypt.hash(password, salt);`,
      `    const user = await User.create({ name, email, password: hashedPassword });`,
      `    const payload = { id: user._id, email: user.email };`,
      `    const token = jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiresIn });`,
      `    res.status(201).json({ message: 'User registered successfully', token, user: { id: user._id, name: user.name, email: user.email } });`,
      ] : [
      `    const existing = await pool.query('SELECT * FROM users WHERE email = $1', [email]);`,
      `    if (existing.rows.length > 0) return res.status(409).json({ error: 'Email already in use' });`,
      `    const salt = await bcrypt.genSalt(10);`,
      `    const hashedPassword = await bcrypt.hash(password, salt);`,
      `    const result = await pool.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email', [name, email, hashedPassword]);`,
      `    const user = result.rows[0];`,
      `    const payload = { id: user.id, email: user.email };`,
      `    const token = jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiresIn });`,
      `    res.status(201).json({ message: 'User registered successfully', token, user });`,
      ],
      `  } catch (err) {`,
      `    console.error('Register error:', err);`,
      `    res.status(500).json({ error: 'Internal server error' });`,
      `  }`,
      `};`,
      ``,
      `const login = async (req, res) => {`,
      `  try {`,
      `    const { email, password } = req.body;`,
      `    if (!email || !password) {`,
      `      return res.status(400).json({ error: 'Email and password are required' });`,
      `    }`,
      db === 'MongoDB' ? [
      `    const user = await User.findOne({ email });`,
      `    if (!user) return res.status(401).json({ error: 'Invalid email or password' });`,
      `    const isMatch = await bcrypt.compare(password, user.password);`,
      `    if (!isMatch) return res.status(401).json({ error: 'Invalid email or password' });`,
      `    const payload = { id: user._id, email: user.email };`,
      ] : [
      `    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);`,
      `    if (result.rows.length === 0) return res.status(401).json({ error: 'Invalid email or password' });`,
      `    const user = result.rows[0];`,
      `    const isMatch = await bcrypt.compare(password, user.password);`,
      `    if (!isMatch) return res.status(401).json({ error: 'Invalid email or password' });`,
      `    const payload = { id: user.id, email: user.email };`,
      ],
      `    const token = jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiresIn });`,
      `    res.json({ message: 'Login successful', token });`,
      `  } catch (err) {`,
      `    console.error('Login error:', err);`,
      `    res.status(500).json({ error: 'Internal server error' });`,
      `  }`,
      `};`,
      ``,
      `const getMe = async (req, res) => {`,
      `  try {`,
      db === 'MongoDB' ? [
      `    const user = await User.findById(req.user.id).select('-password');`,
      `    if (!user) return res.status(404).json({ error: 'User not found' });`,
      ] : [
      `    const result = await pool.query('SELECT id, name, email, created_at FROM users WHERE id = $1', [req.user.id]);`,
      `    if (result.rows.length === 0) return res.status(404).json({ error: 'User not found' });`,
      `    const user = result.rows[0];`,
      ],
      `    res.json({ user });`,
      `  } catch (err) {`,
      `    console.error('Get user error:', err);`,
      `    res.status(500).json({ error: 'Internal server error' });`,
      `  }`,
      `};`,
      ``,
      `module.exports = { register, login, getMe };`,
      ``,
    ]);
  }

  // ─── controllers/item.controller.js ───
  if (apiGen) {
    const useRedis = redis ? ['const { redisClient } = require(\'../config/redis\');', 'const { getOrSetCache } = require(\'../config/redis\');'] : [];
    files['controllers/item.controller.js'] = lines([
      ...(db === 'MongoDB' ? [`const Item = require('../models/Item.model');`] : [`const { pool } = require('../config/database');`]),
      ...useRedis,
      ``,
      `const create = async (req, res) => {`,
      `  try {`,
      `    const { name, description } = req.body;`,
      db === 'MongoDB' ? [
      `    const item = await Item.create({ name, description });`,
      ] : [
      `    const result = await pool.query('INSERT INTO items (name, description) VALUES ($1, $2) RETURNING *', [name, description]);`,
      `    const item = result.rows[0];`,
      ],
      ...(redis ? [
      `    await redisClient.del('items:all');`,
      ] : []),
      `    res.status(201).json({ message: 'Item created', item });`,
      `  } catch (err) {`,
      `    console.error('Create item error:', err);`,
      `    res.status(500).json({ error: 'Internal server error' });`,
      `  }`,
      `};`,
      ``,
      `const getAll = async (req, res) => {`,
      `  try {`,
      redis ? [
      `    const data = await getOrSetCache('items:all', async () => {`,
      db === 'MongoDB' ? `      return await Item.find().sort({ createdAt: -1 });` : `      const r = await pool.query('SELECT * FROM items ORDER BY created_at DESC'); return r.rows;`,
      `    }, 30);`,
      ] : (db === 'MongoDB' ? [
      `    const data = await Item.find().sort({ createdAt: -1 });`,
      ] : [
      `    const result = await pool.query('SELECT * FROM items ORDER BY created_at DESC');`,
      `    const data = result.rows;`,
      ]),
      `    res.json({ data });`,
      `  } catch (err) {`,
      `    console.error('Get items error:', err);`,
      `    res.status(500).json({ error: 'Internal server error' });`,
      `  }`,
      `};`,
      ``,
      `const getById = async (req, res) => {`,
      `  try {`,
      `    const { id } = req.params;`,
      redis ? [
      `    const data = await getOrSetCache(\`items:\${id}\`, async () => {`,
      db === 'MongoDB' ? `      const item = await Item.findById(id); if (!item) throw new Error('Not found'); return item;` : `      const r = await pool.query('SELECT * FROM items WHERE id = $1', [id]); if (r.rows.length === 0) throw new Error('Not found'); return r.rows[0];`,
      `    }, 30);`,
      ] : (db === 'MongoDB' ? [
      `    const data = await Item.findById(id);`,
      ] : [
      `    const result = await pool.query('SELECT * FROM items WHERE id = $1', [id]);`,
      `    const data = result.rows[0];`,
      ]),
      `    if (!data) return res.status(404).json({ error: 'Item not found' });`,
      `    res.json({ data });`,
      `  } catch (err) {`,
      `    console.error('Get item error:', err);`,
      `    res.status(500).json({ error: 'Internal server error' });`,
      `  }`,
      `};`,
      ``,
      `const update = async (req, res) => {`,
      `  try {`,
      `    const { id } = req.params;`,
      `    const { name, description } = req.body;`,
      db === 'MongoDB' ? [
      `    const data = await Item.findByIdAndUpdate(id, { name, description, updatedAt: new Date() }, { new: true });`,
      ] : [
      `    const result = await pool.query('UPDATE items SET name = $1, description = $2, updated_at = NOW() WHERE id = $3 RETURNING *', [name, description, id]);`,
      `    const data = result.rows[0];`,
      ],
      `    if (!data) return res.status(404).json({ error: 'Item not found' });`,
      ...(redis ? [
      `    await redisClient.del('items:all');`,
      `    await redisClient.del(\`items:\${id}\`);`,
      ] : []),
      `    res.json({ message: 'Item updated', data });`,
      `  } catch (err) {`,
      `    console.error('Update item error:', err);`,
      `    res.status(500).json({ error: 'Internal server error' });`,
      `  }`,
      `};`,
      ``,
      `const remove = async (req, res) => {`,
      `  try {`,
      `    const { id } = req.params;`,
      db === 'MongoDB' ? [
      `    const data = await Item.findByIdAndDelete(id);`,
      ] : [
      `    const result = await pool.query('DELETE FROM items WHERE id = $1 RETURNING *', [id]);`,
      `    const data = result.rows[0];`,
      ],
      `    if (!data) return res.status(404).json({ error: 'Item not found' });`,
      ...(redis ? [
      `    await redisClient.del('items:all');`,
      `    await redisClient.del(\`items:\${id}\`);`,
      ] : []),
      `    res.json({ message: 'Item deleted successfully' });`,
      `  } catch (err) {`,
      `    console.error('Delete item error:', err);`,
      `    res.status(500).json({ error: 'Internal server error' });`,
      `  }`,
      `};`,
      ``,
      `module.exports = { create, getAll, getById, update, remove };`,
      ``,
    ]);
  }

  // ─── routes/index.js ───
  const routeLines = [
    `const express = require('express');`,
    `const router = express.Router();`,
    ``,
    ...(auth ? [
      `const authController = require('../controllers/auth.controller');`,
      `const { authenticateToken } = require('../middleware/auth.middleware');`,
      ``,
      `router.post('/auth/register', authController.register);`,
      `router.post('/auth/login', authController.login);`,
      `router.get('/auth/me', authenticateToken, authController.getMe);`,
      ``,
    ] : []),
    ...(apiGen ? [
      `const itemController = require('../controllers/item.controller');`,
      ``,
      `router.post('/items'${auth ? ', authenticateToken' : ''}, itemController.create);`,
      `router.get('/items'${auth ? ', authenticateToken' : ''}, itemController.getAll);`,
      `router.get('/items/:id'${auth ? ', authenticateToken' : ''}, itemController.getById);`,
      `router.put('/items/:id'${auth ? ', authenticateToken' : ''}, itemController.update);`,
      `router.delete('/items/:id'${auth ? ', authenticateToken' : ''}, itemController.remove);`,
      ``,
    ] : []),
    `router.get('/health', (req, res) => {`,
    `  res.json({ status: 'ok', timestamp: new Date().toISOString()${redis ? ", redis: redisClient.isOpen ? 'connected' : 'disconnected'" : ''} });`,
    `});`,
    ``,
    `module.exports = router;`,
    ``,
  ];
  files['routes/index.js'] = lines(routeLines);

  // ─── app.js ───
  const appLines = [
    `const express = require('express');`,
    `const cors = require('cors');`,
    ...(middleware.includes('Helmet') ? [`const helmet = require('helmet');`] : []),
    ...(middleware.includes('Compression') ? [`const compression = require('compression');`] : []),
    ...(middleware.includes('Morgan') ? [`const morgan = require('morgan');`] : []),
    ...(middleware.includes('Rate Limiting') ? [`const rateLimit = require('express-rate-limit');`] : []),
    ...(redis ? [`const { redisClient } = require('./config/redis');`] : []),
    `const connectDB${db === 'MongoDB' ? '' : ', { initTables }'} = require('./config/database');`,
    `const routes = require('./routes');`,
    `const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');`,
    `const { port } = require('./config/env');`,
    ``,
    `const app = express();`,
    ``,
    `// Middleware`,
    `app.use(cors());`,
    `app.use(express.json());`,
    `app.use(express.urlencoded({ extended: true }));`,
    ...(middleware.includes('Helmet') ? [`app.use(helmet());`] : []),
    ...(middleware.includes('Compression') ? [`app.use(compression());`] : []),
    ...(middleware.includes('Morgan') ? [`app.use(morgan('dev'));`] : []),
    ...(middleware.includes('Rate Limiting') ? [
      ``,
      `const limiter = rateLimit({`,
      `  windowMs: 15 * 60 * 1000,`,
      `  max: 100,`,
      `  message: 'Too many requests, please try again later.',`,
      `});`,
      `app.use(limiter);`,
    ] : []),
    ``,
    ...(redis ? [
      `// Connect Redis`,
      `(async () => { await redisClient.connect(); })();`,
      ``,
    ] : []),
    `// Routes`,
    `app.use('/api', routes);`,
    ``,
    `// Error Handling`,
    `app.use(notFoundHandler);`,
    `app.use(errorHandler);`,
    ``,
    `// Start Server`,
    `const start = async () => {`,
    `  await connectDB();`,
    ...(db !== 'MongoDB' ? [`  await initTables();`] : []),
    `  app.listen(port, () => console.log(\`Server running on port \${port}\`));`,
    `};`,
    ``,
    `start();`,
    ``,
  ];
  files['app.js'] = lines(appLines);

  return files;
}

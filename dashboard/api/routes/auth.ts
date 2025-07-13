import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import fs from 'fs/promises';
import path from 'path';
import { z } from 'zod';

const router = Router();
const CONFIG_DIR = path.join(__dirname, '../../config');
const USERS_PATH = path.join(CONFIG_DIR, 'users.json');
const SECRET = process.env.DASHBOARD_JWT_SECRET || 'secret';

router.post('/login', async (req, res) => {
  const schema = z.object({ username: z.string(), password: z.string() });
  const body = schema.parse(req.body);
  const data: Array<{ username: string; password: string }> = JSON.parse(await fs.readFile(USERS_PATH, 'utf8'));
  const user = data.find((u) => u.username === body.username);
  if (!user) return res.status(401).send('Invalid');
  const valid = await bcrypt.compare(body.password, user.password);
  if (!valid) return res.status(401).send('Invalid');
  const token = jwt.sign({ username: user.username }, SECRET, { expiresIn: '2h' });
  res.cookie('token', token, { httpOnly: true });
  res.json({ ok: true });
});

router.post('/logout', (_req, res) => {
  res.clearCookie('token');
  res.json({ ok: true });
});

export default router;

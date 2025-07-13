import { Router } from 'express';
import fs from 'fs/promises';
import path from 'path';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { requireAuth } from './middleware';

const router = Router();
const USERS_PATH = path.join(__dirname, '../../config/users.json');

router.get('/users', requireAuth, async (_req, res) => {
  const users: Array<{ username: string; password: string }> = JSON.parse(await fs.readFile(USERS_PATH, 'utf8'));
  res.json(users.map((u) => ({ username: u.username })));
});

router.put('/users', requireAuth, async (req, res) => {
  const schema = z.object({ username: z.string(), password: z.string() });
  const { username, password } = schema.parse(req.body);
  const users: Array<{ username: string; password: string }> = JSON.parse(await fs.readFile(USERS_PATH, 'utf8'));
  const idx = users.findIndex((u) => u.username === username);
  const hashed = await bcrypt.hash(password, 10);
  if (idx >= 0) users[idx].password = hashed;
  else users.push({ username, password: hashed });
  await fs.writeFile(USERS_PATH, JSON.stringify(users, null, 2));
  res.json({ ok: true });
});

export default router;

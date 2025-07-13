import { Router } from 'express';
import fs from 'fs/promises';
import path from 'path';
import { z } from 'zod';
import { requireAuth } from './middleware';

const router = Router();
const ENV_PATH = path.join(__dirname, '../../.env');

const allowedKeys = ['SUPPORTED_PAIRS', 'TRADE_VOLUME', 'BROKER_API_BASE_URL', 'BROKER_API_KEY'];

router.get('/env', requireAuth, async (_req, res) => {
  const env = await fs.readFile(ENV_PATH, 'utf8');
  const data: Record<string, string> = {};
  env.split('\n').forEach((line) => {
    const [key, ...rest] = line.split('=');
    if (allowedKeys.includes(key)) data[key] = rest.join('=');
  });
  res.json(data);
});

router.put('/env', requireAuth, async (req, res) => {
  const schema = z.record(z.string(), z.string());
  const body = schema.parse(req.body);
  const env = await fs.readFile(ENV_PATH, 'utf8');
  const lines = env.split('\n').map((line) => {
    const [key] = line.split('=');
    if (allowedKeys.includes(key) && body[key] !== undefined) {
      return `${key}=${body[key]}`;
    }
    return line;
  });
  await fs.writeFile(ENV_PATH, lines.join('\n'));
  res.json({ ok: true });
});

export default router;

import { Router } from 'express';
import fs from 'fs/promises';
import path from 'path';
import { requireAuth } from './middleware';

const router = Router();
const CONFIG_DIR = path.join(__dirname, '../../config');
const BOT_STATUS_PATH = path.join(CONFIG_DIR, 'bot_status.json');

router.get('/bot/status', requireAuth, async (_req, res) => {
  const data = JSON.parse(await fs.readFile(BOT_STATUS_PATH, 'utf8'));
  res.json(data);
});

router.put('/bot/pause', requireAuth, async (_req, res) => {
  const data = JSON.parse(await fs.readFile(BOT_STATUS_PATH, 'utf8'));
  data.isPaused = !data.isPaused;
  await fs.writeFile(BOT_STATUS_PATH, JSON.stringify(data, null, 2));
  res.json(data);
});

router.post('/bot/command', requireAuth, (_req, res) => {
  // TODO integrate with command handler
  res.json({ ok: true });
});

export default router;

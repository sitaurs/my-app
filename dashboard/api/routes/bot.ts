import { Router } from 'express';
import fs from 'fs/promises';
import path from 'path';
import { requireAuth } from './middleware';

const router = Router();
const CONFIG_DIR = path.join(__dirname, '../../config');
const BOT_STATUS_PATH = path.join(CONFIG_DIR, 'bot_status.json');
const DXY_CACHE_PATH = path.join(__dirname, '../../analysis_cache/last_result_DXY.json');
const LIVE_DIR = path.join(__dirname, '../../live_positions');
const PENDING_DIR = path.join(__dirname, '../../pending_orders');
const CIRCUIT_PATH = path.join(CONFIG_DIR, 'circuit_breaker_stats.json');

router.get('/bot/status', requireAuth, async (_req, res) => {
  const status = JSON.parse(await fs.readFile(BOT_STATUS_PATH, 'utf8'));
  const dxy = JSON.parse(await fs.readFile(DXY_CACHE_PATH, 'utf8'));
  const active = await fs.readdir(LIVE_DIR);
  const pending = await fs.readdir(PENDING_DIR);
  let losses = 0;
  try {
    const cb = JSON.parse(await fs.readFile(CIRCUIT_PATH, 'utf8'));
    losses = cb.consecutiveLosses || 0;
  } catch {
    // ignore missing stats file
  }
  res.json({
    isPaused: status.isPaused,
    dxySentiment: /Bullish|Bearish|Neutral/i.exec(dxy.analysis_text)?.[0] || '',
    lastAnalysis: dxy.last_updated,
    activeCount: active.length,
    pendingCount: pending.length,
    consecutiveLosses: losses,
  });
});

router.put('/bot/pause', requireAuth, async (_req, res) => {
  const data = JSON.parse(await fs.readFile(BOT_STATUS_PATH, 'utf8'));
  data.isPaused = !data.isPaused;
  await fs.writeFile(BOT_STATUS_PATH, JSON.stringify(data, null, 2));
  res.json(data);
});

router.post('/bot/command', requireAuth, (req, res) => {
  const { cmd } = req.body as { cmd?: string };
  if (!cmd) return res.status(400).send('Invalid');
  const broadcaster = (global as unknown as { broadcastMessage?: (msg: string) => void }).broadcastMessage;
  if (typeof broadcaster === 'function') {
    broadcaster(cmd);
  }
  res.json({ ok: true });
});

export default router;

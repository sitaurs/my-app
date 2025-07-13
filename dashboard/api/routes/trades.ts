import { Router } from 'express';
import fs from 'fs/promises';
import path from 'path';
import { requireAuth } from './middleware';

const router = Router();
const PENDING_DIR = path.join(__dirname, '../../pending_orders');
const LIVE_DIR = path.join(__dirname, '../../live_positions');

router.get('/trades/active', requireAuth, async (_req, res) => {
  const files = await fs.readdir(LIVE_DIR);
  const trades = await Promise.all(
    files.map((f) => fs.readFile(path.join(LIVE_DIR, f), 'utf8').then(JSON.parse)),
  );
  res.json(trades);
});

router.get('/trades/pending', requireAuth, async (_req, res) => {
  const files = await fs.readdir(PENDING_DIR);
  const trades = await Promise.all(
    files.map((f) => fs.readFile(path.join(PENDING_DIR, f), 'utf8').then(JSON.parse)),
  );
  res.json(trades);
});

router.post('/trades/:pair/close', requireAuth, async (req, res) => {
  const pair = req.params.pair.toUpperCase();
  const livePath = path.join(LIVE_DIR, `trade_${pair}.json`);
  const pendingPath = path.join(PENDING_DIR, `trade_${pair}.json`);
  try {
    await fs.unlink(livePath);
    res.json({ ok: true });
  } catch {
    try {
      await fs.unlink(pendingPath);
      res.json({ ok: true });
    } catch {
      res.status(404).send('Not found');
    }
  }
});

export default router;

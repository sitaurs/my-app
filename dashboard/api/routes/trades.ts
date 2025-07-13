import { Router } from 'express';
import fs from 'fs/promises';
import path from 'path';
import { requireAuth } from './middleware';

const router = Router();
const PENDING_DIR = path.join(__dirname, '../../pending_orders');
const LIVE_DIR = path.join(__dirname, '../../live_positions');

router.get('/trades/active', requireAuth, async (_req, res) => {
  const files = await fs.readdir(LIVE_DIR);
  res.json(files);
});

router.get('/trades/pending', requireAuth, async (_req, res) => {
  const files = await fs.readdir(PENDING_DIR);
  res.json(files);
});

router.post('/trades/:pair/close', requireAuth, async (_req, res) => {
  // TODO integrate broker and journaling handler
  res.json({ ok: true });
});

export default router;

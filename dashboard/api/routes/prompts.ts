import { Router } from 'express';
import fs from 'fs/promises';
import path from 'path';
import { requireAuth } from './middleware';

const router = Router();
const PROMPTS_DIR = path.join(__dirname, '../../prompts');

router.get('/prompts', requireAuth, async (_req, res) => {
  const files = await fs.readdir(PROMPTS_DIR);
  res.json(files);
});

router.get('/prompts/:name', requireAuth, async (req, res) => {
  const content = await fs.readFile(path.join(PROMPTS_DIR, req.params.name), 'utf8');
  res.type('text/plain').send(content);
});

router.put('/prompts/:name', requireAuth, async (req, res) => {
  await fs.writeFile(path.join(PROMPTS_DIR, req.params.name), req.body.content);
  res.json({ ok: true });
});

export default router;

import express from 'express';
import fs from 'fs/promises';
import path from 'path';

interface Cell {
  id: string;
  content: string;
  type: 'text' | 'code' | 'sketch';
}

export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router();
  router.use(express.json());
  const fullPath = path.join(dir, filename);
  console.log(fullPath);

  router.get('/cells', async (req, res) => {
    try {
      // Read the file
      const result = await fs.readFile(fullPath, { encoding: 'utf-8' });
      if (result) {
        const cells = JSON.parse(result);
        res.status(200).json(cells);
      }
    } catch (error) {
      if (error.code === 'ENOENT') {
        await fs.writeFile(fullPath, '[]', 'utf-8');
        res.status(200).json({ cells: [] });
      } else {
        throw error;
      }
    }
  });

  router.post('/cells', async (req, res) => {
    // Take list of cells
    // Serialize
    const { cells }: { cells: Cell[] } = req.body;

    // Write cells into the file
    await fs.writeFile(fullPath, JSON.stringify(cells), 'utf-8');

    res.status(200).json({ success: true });
  });

  return router;
};

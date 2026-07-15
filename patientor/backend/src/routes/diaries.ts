import express, { type Response, type Request } from 'express';
import diaryService from '../services/diaryService.ts';
import { newDiaryParser } from '../middleware.ts';
import type { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from '../types.ts';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitiveDiaryEntry[]>) => {
    res.send(diaryService.getNonSensitiveEntries());
});

router.post('/', newDiaryParser, (req: Request<unknown, unknown, NewDiaryEntry>, res: Response<DiaryEntry>) => {
    const addedEntry = diaryService.addDiary(req.body);
    res.json(addedEntry);
});

export default router;
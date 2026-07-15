import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { NewEntrySchema,NewPatientSchema,DiagnosisSchema } from './types.ts';

// Bảo vệ cửa vào (Quét Zod)
export const newDiaryParser = (req: Request, _res: Response, next: NextFunction) => { 
  try {
    NewEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

export const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

export const newDiagnosisParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    DiagnosisSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

// Trạm thu gom rác (Xử lý lỗi)
export const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};
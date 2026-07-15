import diagnoseData from '../../data/diagnoses.ts';
import type { Diagnosis } from '../types.ts';

const getEntries = (): Diagnosis[] => {
  return diagnoseData;
};

export default {
  getEntries
};
import diagnoseData from '../../data/diagnoses.ts';
import type { DiagnosisEntry } from '../types.ts';

const getEntries = (): DiagnosisEntry[] => {
  return diagnoseData;
};

export default {
  getEntries
};
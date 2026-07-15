import express, { type Response , type Request} from 'express';
import patientService from '../services/patientService.ts';
import type { NewPatient, NonSensitivePatient, Patient } from '../types.ts';
import { newPatientParser } from '../middleware.ts';
const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.post('/', newPatientParser, (req: Request<unknown,unknown, NewPatient>, res: Response<Patient | string>) => {

  const addedPatient = patientService.addPatient(req.body);
  res.json(addedPatient);

})
export default router;
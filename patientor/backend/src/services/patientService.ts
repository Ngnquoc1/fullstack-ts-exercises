import patientData from '../../data/patients.ts';
import { v1 as uuid } from 'uuid'; // Import thư viện tạo ID
import type { PatientEntry, NonSensitivePatient, NewPatient } from '../types.ts';

const patients:PatientEntry[]=patientData; 

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (entry: NewPatient):PatientEntry => {
    const newPatient = {
    id: uuid(), // Tự động sinh ID chuỗi độc nhất
    ...entry
  };

  patients.push(newPatient);
  return newPatient;
}

export default {
  getNonSensitiveEntries,
  addPatient
};
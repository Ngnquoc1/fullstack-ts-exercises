import { z } from 'zod'

export const Weather = {
  Sunny: 'sunny',
  Rainy: 'rainy',
  Cloudy: 'cloudy',
  Stormy: 'stormy',
  Windy: 'windy',
} as const;

export type Weather = typeof Weather[keyof typeof Weather];

export const Visibility = {
  Great: 'great',
  Good: 'good',
  Ok: 'ok',
  Poor: 'poor',
} as const;

export type Visibility = typeof Visibility[keyof typeof Visibility];

export const NewEntrySchema = z.object({
  weather: z.enum(Weather),
  visibility: z.enum(Visibility),
  date: z.iso.date(),
  comment: z.string().optional()
});

// Kiểu dữ liệu dành riêng cho việc tạo mới (không cần id)
export type NewDiaryEntry = z.infer<typeof NewEntrySchema>;

export interface DiaryEntry extends NewDiaryEntry { id: number };

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;



export const Gender = {
  Male: 'male',
  Female: 'female',
  Other: 'other'
} as const;

export type Gender = typeof Gender[keyof typeof Gender];

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.string(),
  gender: z.enum(Gender),
  occupation: z.string(),
});

export type NewPatient = z.infer<typeof NewPatientSchema>

export interface Patient extends NewPatient {id: string};

export type NonSensitivePatient = Omit<Patient, 'ssn'>;

export const DiagnosisSchema = z.object({
  code: z.string(),
  name: z.string(),
  latin: z.string().optional(),
})
export type Diagnosis = z.infer<typeof DiagnosisSchema>;
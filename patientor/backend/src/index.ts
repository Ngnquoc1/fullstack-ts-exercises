import express from 'express';
import cors from 'cors';
import diaryRouter from './routes/diaries.ts';
import patientRouter from './routes/patients.ts';
import diagnosisRouter from './routes/diagnoses.ts';
import { errorMiddleware } from './middleware.ts'; 

const app = express();
app.use(express.json());
app.use(cors());


app.use('/api/diaries', diaryRouter );
app.use('/api/patients', patientRouter );
app.use('/api/diagnoses', diagnosisRouter );

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use (errorMiddleware);

const PORT = 3001;
app.listen(PORT,() => {
  console.log(`Server running on port ${PORT}`);
});

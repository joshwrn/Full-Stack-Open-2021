import express from 'express';
import cors from 'cors';

import diagnosesRouter from './routes/diagnosisRoutes';
import patientsRouter from './routes/patientsRoutes';

const app = express();

app.use(cors());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(express.json());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

import express from 'express';
import patientsServices from '../services/patientsServices';

import { parseGender } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsServices.getEntries());
});

router.post('/', (req, res) => {
  /* eslint-disable @typescript-eslint/no-unsafe-assignment */
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  const newPatient = patientsServices.addPatient(
    name,
    dateOfBirth,
    ssn,
    parseGender(gender),
    occupation
  );
  res.json(newPatient);
});

export default router;

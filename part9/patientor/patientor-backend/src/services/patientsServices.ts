import { patientsData } from '../../data/patients';
import { PatientsSafe, PatientsEntry } from '../patientsTypes';
import { v4 as uuidv4 } from 'uuid';

const patients: Array<PatientsEntry> = patientsData;

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const id = uuidv4();

const getEntries = (): PatientsSafe[] => {
  return patientsData.map(({ name, id, dateOfBirth, gender, occupation }) => ({
    name,
    id,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: string,
  occupation: string
): PatientsEntry => {
  const newPatient = {
    /* eslint-disable @typescript-eslint/no-unsafe-assignment */
    id: id,
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getEntries,
  addPatient,
};

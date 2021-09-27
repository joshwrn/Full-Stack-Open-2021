import { Gender } from './patientsTypes';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

export const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

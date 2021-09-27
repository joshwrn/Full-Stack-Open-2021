export interface PatientsEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

export type PatientsSafe = Omit<PatientsEntry, 'ssn'>;

export type NewPatient = Omit<PatientsEntry, 'id'>;

export enum Gender {
  Male = 'male',
  Female = 'female',
}

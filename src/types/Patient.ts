export interface Patient {
  age: number | null;
  height: number | null;
  weight: number | null;
  gender: string | null;
}

export interface ResultPatient {
  imc?: number | string;
  healthyWeight?: string;
  glucoseLevel?: string | number;
  bloodPressure?: string;
  cholesterolLevel?: string | number;
}
export interface AntropometricData {
  imc?: number | string;
  imcStatus?: string;
  imcBadgeClass?: string;
  waistCircumference?: number | string;
  waistStatus?: string;
  waistBadgeClass?: string;
  hipCircumference?: number | string;
  hipStatus?: string;
  hipBadgeClass?: string;
}
export interface SignalVital {
  heartRate?: string | number;
  respiratoryRate?: string | number;
  bloodPressure?: string;
  temperature?: string | null;
  oxygenSaturation?: string | number;
  glucose?: string | number;
}

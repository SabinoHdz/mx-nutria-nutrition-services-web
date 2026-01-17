export interface Patient {
  age?: number | null;
  height?: number | null;
  weight?: number | null;
  gender?: string | null;
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
  skinFold?: number | string;
  waistCircumference?: number | string;
}
export interface SignalVital {
  heartRate?: string | number;
  bloodPressure?: string;
  oxygenSaturation?: string | number;
}

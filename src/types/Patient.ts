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
  heartRateStatus?: string;
  heartRateBadgeClass?: string;
  respiratoryRate?: string | number;
  respiratoryRateStatus?: string;
  respiratoryRateBadgeClass?: string;
  bloodPressure?: string;
  temperature?: string | number;
  temperatureStatus?: string;
  temperatureBadgeClass?: string;
  temperatureAlert?: string;
  temperatureAlertColor?: 'success' | 'info' | 'warning' | 'error';
  oxygenSaturation?: string | number;
  oxygenSaturationStatus?: string;
  oxygenSaturationBadgeClass?: string;
  oxygenSaturationAlert?: string;
  oxygenSaturationAlertColor?: 'success' | 'info' | 'warning' | 'error';
  glucose?: string | number;
}

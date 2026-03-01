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
  imcColor?: 'primary' | 'success' | 'warning' | 'error' | 'info';
  waistCircumference?: number | string;
  waistStatus?: string;
  waistBadgeClass?: string;
  waistColor?: 'primary' | 'success' | 'warning' | 'error' | 'info';
  hipCircumference?: number | string;
  hipStatus?: string;
  hipBadgeClass?: string;
  hipColor?: 'primary' | 'success' | 'warning' | 'error' | 'info';
  // Índice Cintura/Estatura
  waistInCm?: number | string;
  heightInCm?: number | string;
  waistHeightRatio?: number | string;
  waistHeightStatus?: string;
  waistHeightBadgeClass?: string;
  waistHeightColor?: 'primary' | 'success' | 'warning' | 'error' | 'info';
}
export interface SignalVital {
  heartRate?: string | number;
  heartRateStatus?: string;
  heartRateBadgeClass?: string;
  heartRateColor?: 'primary' | 'success' | 'warning' | 'error' | 'info';
  respiratoryRate?: string | number;
  respiratoryRateStatus?: string;
  respiratoryRateBadgeClass?: string;
  respiratoryRateColor?: 'primary' | 'success' | 'warning' | 'error' | 'info';
  systolic?: string | number;
  diastolic?: string | number;
  bloodPressureStatus?: string;
  bloodPressureBadgeClass?: string;
  bloodPressureColor?: 'primary' | 'success' | 'warning' | 'error' | 'info';
  bloodPressureComment?: string;
  bloodPressureCommentColor?: 'success' | 'info' | 'warning' | 'error';
  temperature?: string | number;
  temperatureStatus?: string;
  temperatureBadgeClass?: string;
  temperatureColor?: 'primary' | 'success' | 'warning' | 'error' | 'info';
  temperatureAlert?: string;
  temperatureAlertColor?: 'success' | 'info' | 'warning' | 'error';
  oxygenSaturation?: string | number;
  oxygenSaturationStatus?: string;
  oxygenSaturationBadgeClass?: string;
  oxygenSaturationColor?: 'primary' | 'success' | 'warning' | 'error' | 'info';
  oxygenSaturationAlert?: string;
  oxygenSaturationAlertColor?: 'success' | 'info' | 'warning' | 'error';
  glucose?: string | number;
  glucoseStatus?: string;
  glucoseBadgeClass?: string;
  glucoseColor?: 'primary' | 'success' | 'warning' | 'error' | 'info';
  glucoseAlert?: string;
  glucoseAlertColor?: 'success' | 'info' | 'warning' | 'error';
}

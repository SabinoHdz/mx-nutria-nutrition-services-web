import type { ValueLabel } from '@/types/Common';

export const GENDER_OPTIONS: ValueLabel[] = [
  { value: 'MALE', label: 'Masculino' },
  { value: 'FEMALE', label: 'Femenino' },
];

export const PHYSICAL_ACTIVITY_OPTIONS: ValueLabel[] = [
  { label: 'Sedentario', value: 10 },
  { label: 'Actividad ligera', value: 20 },
  { label: 'Actividad moderada', value: 30 },
  { label: 'Actividad Intensa', value: 40 },
];

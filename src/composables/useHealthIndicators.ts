export interface HealthRange {
  min: number;
  max: number;
  status: string;
  color: 'success' | 'info' | 'warning' | 'error';
  description?: string;
}

// Rangos de IMC según la imagen proporcionada
export const IMC_RANGES: HealthRange[] = [
  {
    min: 0,
    max: 18.5,
    status: 'Desnutrición',
    color: 'info',
    description: '< 18.5 kg/m²',
  },
  {
    min: 18.5,
    max: 24.9,
    status: 'Normal',
    color: 'success',
    description: '18.5 a 24.9 kg/m²',
  },
  {
    min: 25,
    max: 29.9,
    status: 'Sobrepeso',
    color: 'warning',
    description: '25 a 29.9 kg/m²',
  },
  {
    min: 30,
    max: 34.9,
    status: 'Obesidad I',
    color: 'error',
    description: '30 a 34.9 kg/m²',
  },
  {
    min: 35,
    max: 39.9,
    status: 'Obesidad II',
    color: 'error',
    description: '35 a 39.9 kg/m²',
  },
  {
    min: 40,
    max: Infinity,
    status: 'Obesidad Mórbida',
    color: 'error',
    description: '≥ 40 kg/m²',
  },
];

// Rangos de circunferencia de cintura por género (OMS)
export const WAIST_RANGES_MALE: HealthRange[] = [
  {
    min: 0,
    max: 94,
    status: 'Normal',
    color: 'success',
    description: '≤ 94 cm',
  },
  {
    min: 95,
    max: 101,
    status: 'Posible ECV',
    color: 'warning',
    description: '95 - 101 cm',
  },
  {
    min: 102,
    max: Infinity,
    status: 'Riesgo ECV',
    color: 'error',
    description: '≥ 102 cm',
  },
];

export const WAIST_RANGES_FEMALE: HealthRange[] = [
  {
    min: 0,
    max: 83,
    status: 'Normal',
    color: 'success',
    description: '< 80 o 83 cm',
  },
  {
    min: 84,
    max: 87,
    status: 'Posible ECV',
    color: 'warning',
    description: '84 - 87 cm',
  },
  {
    min: 88,
    max: Infinity,
    status: 'Riesgo ECV',
    color: 'error',
    description: '≥ 88 cm',
  },
];

// Rangos de circunferencia de cadera por género
export const HIP_RANGES_MALE: HealthRange[] = [
  {
    min: 0,
    max: 96,
    status: 'Normal',
    color: 'success',
    description: '≤ 95 cm',
  },
  {
    min: 96,
    max: 106,
    status: 'Posible ECV',
    color: 'warning',
    description: '96 - 105 cm',
  },
  {
    min: 106,
    max: Infinity,
    status: 'Riesgo ECV',
    color: 'error',
    description: '≥ 106 cm',
  },
];

export const HIP_RANGES_FEMALE: HealthRange[] = [
  {
    min: 0,
    max: 91,
    status: 'Normal',
    color: 'success',
    description: '≤ 90 cm',
  },
  {
    min: 91,
    max: 99,
    status: 'Posible ECV',
    color: 'warning',
    description: '95 - 98 cm',
  },
  {
    min: 99,
    max: Infinity,
    status: 'Riesgo ECV',
    color: 'error',
    description: '≥ 99 cm',
  },
];

// Índice cintura-cadera (ICC)
export const ICC_RANGES_MALE: HealthRange[] = [
  {
    min: 0,
    max: 0.95,
    status: 'Normal',
    color: 'success',
    description: '< 0.95',
  },
  {
    min: 0.95,
    max: 1.0,
    status: 'Riesgo moderado',
    color: 'warning',
    description: '0.95 - 1.0',
  },
  {
    min: 1.0,
    max: Infinity,
    status: 'Riesgo alto',
    color: 'error',
    description: '> 1.0',
  },
];

export const ICC_RANGES_FEMALE: HealthRange[] = [
  {
    min: 0,
    max: 0.8,
    status: 'Normal',
    color: 'success',
    description: '< 0.80',
  },
  {
    min: 0.8,
    max: 0.85,
    status: 'Riesgo moderado',
    color: 'warning',
    description: '0.80 - 0.85',
  },
  {
    min: 0.85,
    max: Infinity,
    status: 'Riesgo alto',
    color: 'error',
    description: '> 0.85',
  },
];

/**
 * Composable para manejar indicadores de salud
 */
export function useHealthIndicators() {
  /**
   * Convierte el color del rango a clase de badge de Tailwind
   */
  const getBadgeClass = (color?: 'success' | 'info' | 'warning' | 'error'): string => {
    if (!color) return 'badge-ghost';
    return `badge-${color}`;
  };

  /**
   * Encuentra el rango correspondiente a un valor
   */
  const findRange = (value: number, ranges: HealthRange[]): HealthRange | null => {
    return ranges.find((range) => value >= range.min && value < range.max) ?? null;
  };

  /**
   * Calcula el estado del IMC
   */
  const getImcStatus = (imc: number) => {
    return findRange(imc, IMC_RANGES);
  };

  /**
   * Calcula el estado de la circunferencia de cintura según género
   */
  const getWaistStatus = (waist: number, gender: 'MALE' | 'FEMALE') => {
    const ranges = gender === 'MALE' ? WAIST_RANGES_MALE : WAIST_RANGES_FEMALE;
    return findRange(waist, ranges);
  };

  /**
   * Calcula el estado de la circunferencia de cadera según género
   */
  const getHipStatus = (hip: number, gender: 'MALE' | 'FEMALE') => {
    const ranges = gender === 'MALE' ? HIP_RANGES_MALE : HIP_RANGES_FEMALE;
    return findRange(hip, ranges);
  };

  /**
   * Calcula el índice cintura-cadera y su estado
   */
  const getWaistHipRatio = (waist: number, hip: number, gender: 'MALE' | 'FEMALE') => {
    if (hip === 0) return null;

    const ratio = waist / hip;
    const ranges = gender === 'MALE' ? ICC_RANGES_MALE : ICC_RANGES_FEMALE;

    return {
      ratio: ratio.toFixed(2),
      status: findRange(ratio, ranges),
    };
  };

  /**
   * Calcula el IMC
   */
  const calculateImc = (weight: number, height: number) => {
    if (weight <= 0 || height <= 0) return null;

    const imc = weight / Math.pow(height, 2);
    const imcValue = Number.parseFloat(imc.toFixed(2));

    return {
      value: imcValue,
      formatted: imc.toFixed(2),
      status: getImcStatus(imcValue),
    };
  };

  return {
    // Rangos exportados
    IMC_RANGES,
    WAIST_RANGES_MALE,
    WAIST_RANGES_FEMALE,
    HIP_RANGES_MALE,
    HIP_RANGES_FEMALE,
    ICC_RANGES_MALE,
    ICC_RANGES_FEMALE,

    // Funciones de cálculo
    calculateImc,
    getImcStatus,
    getWaistStatus,
    getHipStatus,
    getWaistHipRatio,
    findRange,
    getBadgeClass,
  };
}

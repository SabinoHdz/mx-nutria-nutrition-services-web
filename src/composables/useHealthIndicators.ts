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
    description: '< 94 cm',
  },
  {
    min: 94,
    max: 102,
    status: 'Riesgo aumentado',
    color: 'warning',
    description: '94 - 102 cm',
  },
  {
    min: 102,
    max: Infinity,
    status: 'Riesgo alto',
    color: 'error',
    description: '≥ 102 cm',
  },
];

export const WAIST_RANGES_FEMALE: HealthRange[] = [
  {
    min: 0,
    max: 80,
    status: 'Normal',
    color: 'success',
    description: '< 80 cm',
  },
  {
    min: 80,
    max: 88,
    status: 'Riesgo aumentado',
    color: 'warning',
    description: '80 - 88 cm',
  },
  {
    min: 88,
    max: Infinity,
    status: 'Riesgo alto',
    color: 'error',
    description: '≥ 88 cm',
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
    ICC_RANGES_MALE,
    ICC_RANGES_FEMALE,

    // Funciones de cálculo
    calculateImc,
    getImcStatus,
    getWaistStatus,
    getWaistHipRatio,
    findRange,
    getBadgeClass,
  };
}

export interface HealthRange {
  min: number;
  max: number;
  status: string;
  color: 'success' | 'info' | 'warning' | 'error';
  description?: string;
  alert?: string;
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
    max: 95,
    status: 'Normal',
    color: 'success',
    description: '≤ 94 cm',
  },
  {
    min: 95,
    max: 102,
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
    max: 84,
    status: 'Normal',
    color: 'success',
    description: '< 80 o 83 cm',
  },
  {
    min: 84,
    max: 88,
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

// Rangos de glucosa capilar (mg/dl)
export const GLUCOSE_RANGES: HealthRange[] = [
  {
    min: 1,
    max: 70,
    status: 'Hipoglucemia',
    color: 'warning',
    description: '< 70 mg/dl',
    alert: 'Requiere atencion medica',
  },
  {
    min: 71,
    max: 99,
    status: 'Normal',
    color: 'success',
    description: '71 - 99 mg/dl',
  },
  {
    min: 100,
    max: 125,
    status: 'Condicional',
    color: 'warning',
    description: '100 - 125 mg/dl',
  },
  {
    min: 126,
    max: Infinity,
    status: 'Pre diabetico',
    color: 'error',
    description: '> 126 mg/dl',
    alert: 'Realizar un prueba de HbA1c o glucosa plasmatica no mayor a 15 dias',
  },
];

// Rangos de índice cintura/estatura (ICE)
export const WAIST_HEIGHT_RATIO_RANGES: HealthRange[] = [
  {
    min: 0,
    max: 0.4,
    status: 'Normal',
    color: 'success',
    description: '≤ 0.4',
  },
  {
    min: 0.4,
    max: Infinity,
    status: 'Riesgo de ECV Y Síndrome Metabólico',
    color: 'error',
    description: '> 0.4',
  },
];

// Rangos de frecuencia cardíaca (lpm - latidos por minuto)
export const HEART_RATE_RANGES: HealthRange[] = [
  {
    min: 1,
    max: 60,
    status: 'Bradicardia',
    color: 'warning',
    description: '≤ 59 lpm',
  },
  {
    min: 60,
    max: 101,
    status: 'Normal',
    color: 'success',
    description: '60 - 100 lpm',
  },
  {
    min: 101,
    max: Infinity,
    status: 'Taquicardia',
    color: 'error',
    description: '≥ 101 lpm',
  },
];

// Rangos de frecuencia respiratoria (rpm - respiraciones por minuto)
export const RESPIRATORY_RATE_RANGES: HealthRange[] = [
  {
    min: 0,
    max: 12,
    status: 'Baja',
    color: 'warning',
    description: '≤ 11 rpm',
  },
  {
    min: 12,
    max: 21,
    status: 'Normal',
    color: 'success',
    description: '12 - 20 rpm',
  },
  {
    min: 21,
    max: Infinity,
    status: 'Alto',
    color: 'error',
    description: '≥ 21 rpm',
  },
];

// Rangos de saturación de oxígeno (%)
export const OXYGEN_SATURATION_RANGES: HealthRange[] = [
  {
    min: 0,
    max: 91,
    status: 'Emergencia médica',
    color: 'error',
    description: '<90%',
    alert: 'Requiere atención Médica Urgente',
  },
  {
    min: 91,
    max: 95,
    status: 'Bajos',
    color: 'warning',
    description: '91 - 94%',
  },
  {
    min: 95,
    max: 101,
    status: 'Normales',
    color: 'success',
    description: '95 - 100%',
  },
];

// Rangos de temperatura (°C - grados Celsius)
export const TEMPERATURE_RANGES: HealthRange[] = [
  {
    min: 1,
    max: 37.4,
    status: 'Normal',
    color: 'success',
    description: '35.7 - 37.3 °C',
  },
  {
    min: 37.4,
    max: 38.1,
    status: 'Fiebre Leve',
    color: 'warning',
    description: '37.4 - 38 °C',
  },
  {
    min: 38.1,
    max: 38.6,
    status: 'Fiebre Moderada',
    color: 'warning',
    description: '38.1 - 38.5 °C',
    alert: 'Requiere atención Médica',
  },
  {
    min: 38.6,
    max: 40.0,
    status: 'Fiebre Alta',
    color: 'warning',
    description: '38.6 - 39.9 °C',
    alert: 'Requiere atención Médica',
  },
  {
    min: 40.0,
    max: Infinity,
    status: 'Fiebre Muy Alta',
    color: 'error',
    description: '>40.0 °C',
    alert: 'Requiere atención Médica Urgente',
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
   * Calcula el estado de la frecuencia cardíaca
   */
  const getHeartRateStatus = (heartRate: number) => {
    return findRange(heartRate, HEART_RATE_RANGES);
  };

  /**
   * Calcula el estado de la frecuencia respiratoria
   */
  const getRespiratoryRateStatus = (respiratoryRate: number) => {
    return findRange(respiratoryRate, RESPIRATORY_RATE_RANGES);
  };

  /**
   * Calcula el estado de la saturación de oxígeno
   */
  const getOxygenSaturationStatus = (oxygenSaturation: number) => {
    return findRange(oxygenSaturation, OXYGEN_SATURATION_RANGES);
  };

  /**
   * Calcula el estado de la temperatura
   */
  const getTemperatureStatus = (temperature: number) => {
    return findRange(temperature, TEMPERATURE_RANGES);
  };

  /**
   * Calcula el estado de la glucosa capilar
   */
  const getGlucoseStatus = (glucose: number, ateRecently: boolean | null) => {
    if (glucose < 70) {
      return {
        status: 'Hipoglucemia',
        color: 'warning',
        alert: 'Requiere atencion medica',
      } as const;
    }

    if (glucose >= 71 && glucose <= 99) {
      return {
        status: 'Normal',
        color: 'success',
      } as const;
    }

    if (glucose >= 100 && glucose <= 125) {
      if (ateRecently === null) {
        return {
          status: 'Pendiente',
          color: 'info',
        } as const;
      }

      if (ateRecently) {
        return {
          status: 'Normal',
          color: 'success',
        } as const;
      }

      return {
        status: 'Alterada',
        color: 'warning',
        alert: 'Realizar un prueba de HbA1c o glucosa plasmatica no mayor a 15 dias',
      } as const;
    }

    return {
      status: 'Pre diabetico',
      color: 'error',
      alert: 'Realizar un prueba de HbA1c o glucosa plasmatica no mayor a 15 dias',
    } as const;
  };

  /**
   * Categoría de presión arterial (orden de gravedad: mayor = más grave)
   */
  const BP_SEVERITY = {
    HYPOTENSION: 0,
    NORMAL: 1,
    SUB_OPTIMA: 2,
    LIMITROFE: 3,
    H1: 4,
    H2: 5,
    H3: 6,
  } as const;

  const getSystolicCategory = (s: number): { severity: number; status: string; color: 'success' | 'info' | 'warning' | 'error'; alert?: string } => {
    if (s < 90) return { severity: BP_SEVERITY.HYPOTENSION, status: 'Hipotensión', color: 'warning' };
    if (s >= 180) return { severity: BP_SEVERITY.H3, status: 'Hipertensión 3', color: 'error' };
    if (s >= 160) return { severity: BP_SEVERITY.H2, status: 'Hipertensión 2', color: 'error', alert: 'Tratamiento urgente' };
    if (s >= 140) return { severity: BP_SEVERITY.H1, status: 'Hipertensión 1', color: 'error', alert: 'Prevención' };
    if (s >= 130) return { severity: BP_SEVERITY.LIMITROFE, status: 'Limítrofe', color: 'warning', alert: 'Primer nivel de atención Médica' };
    if (s >= 120) return { severity: BP_SEVERITY.SUB_OPTIMA, status: 'Sub Óptima', color: 'warning' };
    return { severity: BP_SEVERITY.NORMAL, status: 'Normal', color: 'success' };
  };

  const getDiastolicCategory = (d: number): { severity: number; status: string; color: 'success' | 'info' | 'warning' | 'error'; alert?: string } => {
    if (d < 60) return { severity: BP_SEVERITY.HYPOTENSION, status: 'Hipotensión', color: 'warning' };
    if (d >= 110) return { severity: BP_SEVERITY.H3, status: 'Hipertensión 3', color: 'error' };
    if (d >= 91) return { severity: BP_SEVERITY.H2, status: 'Hipertensión 2', color: 'error', alert: 'Tratamiento urgente' };
    if (d >= 86) return { severity: BP_SEVERITY.H1, status: 'Hipertensión 1', color: 'error', alert: 'Prevención' };
    if (d >= 85) return { severity: BP_SEVERITY.LIMITROFE, status: 'Limítrofe', color: 'warning', alert: 'Primer nivel de atención Médica' };
    if (d >= 84) return { severity: BP_SEVERITY.SUB_OPTIMA, status: 'Sub Óptima', color: 'warning' };
    if (d >= 80) return { severity: BP_SEVERITY.NORMAL, status: 'Normal', color: 'success' };
    return { severity: BP_SEVERITY.NORMAL, status: 'Normal', color: 'success' };
  };

  /**
   * Calcula el estado de la presión arterial (sistólica y diastólica).
   * Devuelve la categoría más grave entre ambas y su comentario si aplica.
   */
  const getBloodPressureStatus = (systolic: number, diastolic: number) => {
    const sCat = getSystolicCategory(systolic);
    const dCat = getDiastolicCategory(diastolic);
    const worse = sCat.severity >= dCat.severity ? sCat : dCat;
    return {
      status: worse.status,
      color: worse.color,
      alert: worse.alert,
    } as const;
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
   * Calcula el índice cintura-estatura y su estado
   */
  const getWaistHeightRatio = (waistInCm: number, heightInCm: number) => {
    if (heightInCm === 0) return null;

    const ratio = waistInCm / heightInCm;

    return {
      ratio: ratio.toFixed(2),
      status: findRange(ratio, WAIST_HEIGHT_RATIO_RANGES),
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
    GLUCOSE_RANGES,
    WAIST_HEIGHT_RATIO_RANGES,
    HEART_RATE_RANGES,
    RESPIRATORY_RATE_RANGES,
    OXYGEN_SATURATION_RANGES,
    TEMPERATURE_RANGES,

    // Funciones de cálculo
    calculateImc,
    getImcStatus,
    getWaistStatus,
    getHipStatus,
    getWaistHipRatio,
    getWaistHeightRatio,
    getHeartRateStatus,
    getRespiratoryRateStatus,
    getOxygenSaturationStatus,
    getTemperatureStatus,
    getGlucoseStatus,
    getBloodPressureStatus,
    findRange,
    getBadgeClass,
  };
}

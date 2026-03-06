/**
 * Definición del documento PDF de resultados de diagnóstico.
 * Incluye datos del paciente y tabla de resultados (4 columnas: Indicador, Valor, Diagnóstico, Comentarios)
 * con colores por estado. No modifica la UI; los datos se leen de la vista al momento de descargar.
 */
import type { DocumentDefinition, ContentObject } from './types';
import type { Patient } from '@/types';
import type { AntropometricData, SignalVital } from '@/types';

type BadgeColor = 'primary' | 'success' | 'warning' | 'error' | 'info';

const COLOR_MAP: Record<BadgeColor, string> = {
  success: '#22c55e',
  warning: '#eab308',
  error: '#ef4444',
  info: '#3b82f6',
  primary: '#6b7280',
};

function fmt(val: string | number | null | undefined, suffix = ''): string {
  if (val === null || val === undefined || val === '') return '-';
  return `${val}${suffix}`;
}

function sexLabel(gender: string | null): string {
  if (!gender) return '-';
  return gender === 'MALE' ? 'Masculino' : gender === 'FEMALE' ? 'Femenino' : String(gender);
}

function diagnosisCell(text: string, color?: BadgeColor): ContentObject {
  const hex = color ? (COLOR_MAP[color] ?? COLOR_MAP.primary) : COLOR_MAP.primary;
  return { text: text || 'Pendiente', fillColor: hex };
}

export type BasalMethod = 'Harris Benedict' | 'Mifflin-St. Jeor';

export interface BasalEnergyExpenditurePayload {
  method: BasalMethod;
  value: number | null;
}

export interface HydrationRequirementPayload {
  min: number | null;
  max: number | null;
}

export interface TotalEnergyExpenditurePayload {
  method: string;
  eta: number | null;
  activityLabel: string | null;
  activityPercent: number | null;
  get: number | null;
}

export interface DiagnosticoResultadosPayload {
  patient: Patient;
  antropometric: AntropometricData;
  signalVital: SignalVital;
  healthyWeight: { min: string | null; max: string | null };
  basalEnergyExpenditure: BasalEnergyExpenditurePayload;
  hydrationRequirement: HydrationRequirementPayload;
  totalEnergyExpenditure?: TotalEnergyExpenditurePayload;
}

/** Data URLs (base64) de las imágenes para header y footer del PDF */
export interface DiagnosticoResultadosImages {
  title: string;
  qr: string;
  insta: string;
}

/**
 * Construye la definición del documento para el PDF de resultados de diagnóstico.
 * Si se pasa `images`, se añaden header (título alineado a la derecha) y footer (QR e Instagram).
 */
export function buildDiagnosticoResultadosDocDefinition(
  payload: DiagnosticoResultadosPayload,
  images?: DiagnosticoResultadosImages,
): DocumentDefinition {
  const {
    patient,
    antropometric,
    signalVital,
    healthyWeight,
    basalEnergyExpenditure,
    hydrationRequirement,
    totalEnergyExpenditure,
  } = payload;

  const tableBody: (string | ContentObject)[][] = [
    [
      { text: 'Indicador', style: 'tableHeader', fillColor: '#e5e7eb' },
      { text: 'Valor', style: 'tableHeader', fillColor: '#e5e7eb' },
      { text: 'Diagnóstico', style: 'tableHeader', fillColor: '#e5e7eb' },
      { text: 'Comentarios', style: 'tableHeader', fillColor: '#e5e7eb' },
    ],
    [
      'IMC',
      fmt(antropometric.imc, ' kg/m²'),
      diagnosisCell(antropometric.imcStatus ?? 'Pendiente', antropometric.imcColor),
      '-',
    ],
    [
      'Cintura',
      fmt(antropometric.waistCircumference, ' cm'),
      diagnosisCell(antropometric.waistStatus ?? 'Pendiente', antropometric.waistColor),
      '-',
    ],
    [
      'Cadera',
      fmt(antropometric.hipCircumference, ' cm'),
      diagnosisCell(antropometric.hipStatus ?? 'Pendiente', antropometric.hipColor),
      '-',
    ],
    [
      'Frec. Cardíaca',
      fmt(signalVital.heartRate, ' lpm'),
      diagnosisCell(signalVital.heartRateStatus ?? 'Pendiente', signalVital.heartRateColor),
      '-',
    ],
    [
      'Frec. Respiratoria',
      fmt(signalVital.respiratoryRate, ' x Min'),
      diagnosisCell(
        signalVital.respiratoryRateStatus ?? 'Pendiente',
        signalVital.respiratoryRateColor,
      ),
      '-',
    ],
    [
      'Temperatura',
      fmt(signalVital.temperature, ' °C'),
      diagnosisCell(signalVital.temperatureStatus ?? 'Pendiente', signalVital.temperatureColor),
      signalVital.temperatureAlert ?? '-',
    ],
    [
      'Sat. Oxígeno',
      fmt(signalVital.oxygenSaturation, ' %'),
      diagnosisCell(
        signalVital.oxygenSaturationStatus ?? 'Pendiente',
        signalVital.oxygenSaturationColor,
      ),
      signalVital.oxygenSaturationAlert ?? '-',
    ],
    [
      'Presión arterial',
      fmt(
        signalVital.systolic != null && signalVital.diastolic != null
          ? `${signalVital.systolic}/${signalVital.diastolic}`
          : null,
        ' mmHg',
      ),
      diagnosisCell(signalVital.bloodPressureStatus ?? 'Pendiente', signalVital.bloodPressureColor),
      signalVital.bloodPressureComment ?? '-',
    ],
    [
      'Glucosa',
      fmt(signalVital.glucose, ' mg/dl'),
      diagnosisCell(signalVital.glucoseStatus ?? 'Pendiente', signalVital.glucoseColor),
      signalVital.glucoseAlert ?? '-',
    ],
  ];

  const content: ContentObject[] = [
    {
      text: 'Resultados de diagnóstico',
      style: 'title',
      margin: [0, 0, 0, 12] as [number, number, number, number],
    },
    {
      text: 'Datos del paciente',
      style: 'heading',
      margin: [0, 8, 0, 6] as [number, number, number, number],
    },
    {
      table: {
        widths: [100, 80, 80, '*'],
        body: [
          ['Sexo', sexLabel(patient.gender), 'Edad', fmt(patient.age) + ' años'],
          ['Peso actual', fmt(patient.weight) + ' kg', 'Talla', fmt(patient.height) + ' m'],
        ],
      },
      layout: 'noBorders',
      margin: [0, 0, 0, 12] as [number, number, number, number],
    },
    {
      text: 'Peso saludable',
      style: 'heading',
      margin: [0, 4, 0, 4] as [number, number, number, number],
    },
    {
      text: `Mín: ${healthyWeight.min ?? '-'} kg — Máx: ${healthyWeight.max ?? '-'} kg`,
      margin: [0, 0, 0, 8] as [number, number, number, number],
    },
    {
      columns: [
        {
          width: '*',
          stack: [
            {
              text: 'Gasto Energético Basal',
              style: 'heading',
              margin: [0, 8, 0, 4] as [number, number, number, number],
            },
            {
              text: `${basalEnergyExpenditure.method}: ${
                basalEnergyExpenditure.value != null
                  ? `${basalEnergyExpenditure.value} Kcal/Día`
                  : '—'
              }`,
              margin: [0, 0, 0, 8] as [number, number, number, number],
            },
            {
              text: 'Requerimiento hídrico',
              style: 'heading',
              margin: [0, 0, 0, 4] as [number, number, number, number],
            },
            {
              text:
                hydrationRequirement.min != null && hydrationRequirement.max != null
                  ? `${hydrationRequirement.min} a ${hydrationRequirement.max} L`
                  : '—',
              margin: [0, 0, 0, 0] as [number, number, number, number],
            },
          ],
        },
        {
          width: '*',
          stack: [
            {
              text: 'Gasto energético total',
              style: 'heading',
              margin: [0, 8, 0, 4] as [number, number, number, number],
            },
            ...(totalEnergyExpenditure
              ? [
                  {
                    text: `Método: ${totalEnergyExpenditure.method}`,
                    margin: [0, 0, 0, 2] as [number, number, number, number],
                  },
                  {
                    text: `ETA (10%): ${totalEnergyExpenditure.eta != null ? totalEnergyExpenditure.eta + ' Kcal/Día' : '-'}`,
                    margin: [0, 0, 0, 2] as [number, number, number, number],
                  },
                  {
                    text: `Actividad Física: ${totalEnergyExpenditure.activityLabel ?? '-'}${totalEnergyExpenditure.activityPercent != null ? ' (' + totalEnergyExpenditure.activityPercent + '%)' : ''}`,
                    margin: [0, 0, 0, 2] as [number, number, number, number],
                  },
                  {
                    text: `GET: ${totalEnergyExpenditure.get != null ? totalEnergyExpenditure.get + ' Kcal/Día' : '-'}`,
                    margin: [0, 0, 0, 0] as [number, number, number, number],
                  },
                ]
              : [{ text: '-', margin: [0, 0, 0, 0] as [number, number, number, number] }]),
          ],
        },
      ],
      margin: [0, 0, 0, 12] as [number, number, number, number],
    },
    {
      text: 'Tabla de resultados',
      style: 'heading',
      margin: [0, 8, 0, 6] as [number, number, number, number],
    },
    {
      table: {
        headerRows: 1,
        widths: ['*', 'auto', 'auto', '*'], // Ajustar anchos según necesidades
        body: tableBody,
      },
    },
  ];

  const doc: DocumentDefinition = {
    defaultStyle: { fontSize: 10 },
    styles: {
      title: { fontSize: 18, bold: true },
      heading: { fontSize: 12, bold: true },
      tableHeader: { bold: true, fontSize: 10 },
    },
    content,
  };

  if (images) {
    // Margen inferior mayor para que el footer tenga espacio y el QR 240×240 no se corte
    doc.pageMargins = [40, 100, 40, 260];
    doc.header = {
      image: images.title,
      width: 170,
      alignment: 'right',
    };
    doc.footer = {
      columns: [
        { width: 250, stack: [{ image: images.qr, fit: [240, 240] }], alignment: 'left' },
      ],
    };
  }

  return doc;
}

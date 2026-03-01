/**
 * Definición del documento PDF del manual de indicadores.
 * Concentra todo el contenido y la estructura del PDF en un solo lugar
 * para facilitar mantenimiento y futura migración a backend.
 */
import type { DocumentDefinition } from './types';

const TITLE = 'Manual de indicadores y uso';
const SUBTITLE = 'Calculadora de diagnósticos – LPN';
const INTRO =
  'Este manual describe los indicadores antropométricos y signos vitales utilizados en la aplicación, sus rangos de referencia y la interpretación de resultados.';

const INDICADORES = [
  {
    nombre: 'Índice de Masa Corporal (IMC)',
    descripcion:
      'Relación entre peso y altura (kg/m²). Clasificación: <18.5 Desnutrición; 18.5-24.9 Normal; 25-29.9 Sobrepeso; 30-34.9 Obesidad I; 35-39.9 Obesidad II; ≥40 Obesidad mórbida.',
  },
  {
    nombre: 'Circunferencia de Cintura',
    descripcion:
      'Indicador de grasa abdominal y riesgo cardiovascular. Hombres: Normal <94 cm, Riesgo 94-102 cm, Alto >102 cm. Mujeres: Normal <80 cm, Riesgo 80-88 cm, Alto >88 cm.',
  },
  {
    nombre: 'Circunferencia de Cadera',
    descripcion:
      'Junto con la cintura, determina distribución de grasa y riesgo metabólico. Valores de referencia según sexo.',
  },
  {
    nombre: 'Frecuencia Cardíaca',
    descripcion:
      'Latidos por minuto en reposo. Normal 60-100; Bradicardia ≤59; Taquicardia ≥101.',
  },
  {
    nombre: 'Frecuencia Respiratoria',
    descripcion:
      'Respiraciones por minuto. Normal 12-20; Bradipnea ≤11; Taquipnea ≥21.',
  },
  {
    nombre: 'Temperatura Corporal',
    descripcion:
      'Normal 35.7-37.3 °C; Febrícula 37.4-37.9 °C; Fiebre moderada 38-38.9 °C; Fiebre alta 39-40 °C; >40 °C Hiperpirexia.',
  },
  {
    nombre: 'Saturación de Oxígeno (SpO₂)',
    descripcion:
      'Porcentaje de hemoglobina saturada. Normal 95-100%; Bajos 91-94%; <90% emergencia médica.',
  },
] as const;

/**
 * Construye la definición del documento para el manual de indicadores.
 * Patrón: factory que devuelve un objeto de definición reutilizable.
 */
export function buildManualIndicadoresDocDefinition(): DocumentDefinition {
  return {
    defaultStyle: {
      fontSize: 10,
    },
    styles: {
      title: { fontSize: 18, bold: true },
      subtitle: { fontSize: 12, bold: true },
      heading: { fontSize: 12, bold: true },
    },
    content: [
      { text: TITLE, style: 'title', margin: [0, 0, 0, 8] },
      { text: SUBTITLE, style: 'subtitle', margin: [0, 0, 0, 12] },
      { text: INTRO, margin: [0, 0, 0, 16] },
      { text: 'Indicadores incluidos', style: 'heading', margin: [0, 8, 0, 6] },
      ...INDICADORES.flatMap((ind, i) => [
        { text: `${i + 1}. ${ind.nombre}`, bold: true, margin: [0, 6, 0, 2] as [number, number, number, number] },
        { text: ind.descripcion, margin: [0, 0, 0, 8] as [number, number, number, number] },
      ]),
      { text: 'Documento generado por la aplicación. Versión de ejemplo.', margin: [0, 20, 0, 0] as [number, number, number, number], italics: true, fontSize: 8 },
    ],
  };
}

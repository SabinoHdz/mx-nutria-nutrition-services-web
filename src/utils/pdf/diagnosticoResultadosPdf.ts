/**
 * Servicio de descarga del PDF de resultados de diagnóstico.
 * Orquesta la definición del documento y el cliente pdfmake.
 */

import { buildDiagnosticoResultadosDocDefinition } from './diagnosticoResultadosDocDefinition';
import type { DiagnosticoResultadosPayload } from './diagnosticoResultadosDocDefinition';
import { createAndDownloadPdf } from './pdfMakeClient';

const FILENAME = 'resultados-diagnostico.pdf';

/**
 * Genera y descarga el PDF de resultados de diagnóstico con datos del paciente
 * y tabla de indicadores (4 columnas, incl. comentarios y colores).
 */
export async function downloadDiagnosticoResultadosPdf(
  payload: DiagnosticoResultadosPayload,
): Promise<void> {
  const docDefinition = buildDiagnosticoResultadosDocDefinition(payload);
  await createAndDownloadPdf(docDefinition, FILENAME);
}

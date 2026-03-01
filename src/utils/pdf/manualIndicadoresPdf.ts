/**
 * Servicio de descarga del manual de indicadores en PDF.
 * Orquesta la definición del documento y el cliente pdfmake.
 */

import { buildManualIndicadoresDocDefinition } from './manualIndicadoresDocDefinition';
import { createAndDownloadPdf } from './pdfMakeClient';

const FILENAME = 'manual-indicadores.pdf';

/**
 * Genera y descarga el PDF del manual de indicadores.
 * Puede usarse desde el botón de descarga en SupportView.
 * En el futuro esta lógica puede moverse al backend manteniendo la misma
 * definición de documento (buildManualIndicadoresDocDefinition).
 */
export async function downloadManualIndicadoresPdf(): Promise<void> {
  const docDefinition = buildManualIndicadoresDocDefinition();
  await createAndDownloadPdf(docDefinition, FILENAME);
}

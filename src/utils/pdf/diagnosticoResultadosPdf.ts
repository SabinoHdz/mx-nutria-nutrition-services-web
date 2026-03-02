/**
 * Servicio de descarga del PDF de resultados de diagnóstico.
 * Orquesta la definición del documento y el cliente pdfmake.
 */

import titleJpeg from '@/assets/images/title.jpeg';
import codigoQrJpeg from '@/assets/images/codigoQr.jpeg';
import instaJpeg from '@/assets/images/insta.jpeg';
import { buildDiagnosticoResultadosDocDefinition } from './diagnosticoResultadosDocDefinition';
import type { DiagnosticoResultadosPayload } from './diagnosticoResultadosDocDefinition';
import { createAndDownloadPdf } from './pdfMakeClient';

const FILENAME = 'resultados-diagnostico.pdf';

/**
 * Carga una imagen desde una URL y la devuelve como data URL (base64) para usar en pdfmake.
 */
function loadImageAsDataUrl(url: string): Promise<string> {
  return fetch(url)
    .then((res) => res.blob())
    .then(
      (blob) =>
        new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        }),
    );
}

/**
 * Genera y descarga el PDF de resultados de diagnóstico con datos del paciente
 * y tabla de indicadores (4 columnas, incl. comentarios y colores).
 * Incluye header (título) y footer (QR e Instagram) cuando las imágenes se cargan correctamente.
 */
export async function downloadDiagnosticoResultadosPdf(
  payload: DiagnosticoResultadosPayload,
): Promise<void> {
  const images = await Promise.all([
    loadImageAsDataUrl(titleJpeg),
    loadImageAsDataUrl(codigoQrJpeg),
    loadImageAsDataUrl(instaJpeg),
  ]).then(([title, qr, insta]) => ({ title, qr, insta })).catch(() => null);

  const docDefinition = buildDiagnosticoResultadosDocDefinition(payload, images ?? undefined);
  await createAndDownloadPdf(docDefinition, FILENAME);
}

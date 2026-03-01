/**
 * Cliente de pdfmake: carga la librería bajo demanda y expone la creación de PDF.
 * Uso de import dinámico para no incluir pdfmake en el bundle inicial.
 */

import type { DocumentDefinition } from './types';

type PdfMakeInstance = {
  createPdf: (docDefinition: DocumentDefinition) => {
    download: (filename?: string) => void;
    open: () => void;
    getBlob: (cb: (blob: Blob) => void) => void;
  };
  vfs?: Record<string, string>;
  addVirtualFileSystem?: (vfs: Record<string, string>) => void;
};

let pdfMakeInstance: PdfMakeInstance | null = null;

/**
 * Obtiene la instancia de pdfmake con fuentes cargadas (singleton lazy).
 * Carga la librería solo la primera vez que se necesita.
 */
export async function getPdfMake(): Promise<PdfMakeInstance> {
  if (pdfMakeInstance) {
    return pdfMakeInstance;
  }

  const pdfMakeModule = await import('pdfmake/build/pdfmake');
  const pdfMake = (pdfMakeModule as { default: PdfMakeInstance }).default;

  const vfsModule = await import('pdfmake/build/vfs_fonts');
  const vfs =
    (vfsModule as { default?: Record<string, string> }).default ??
    (vfsModule as Record<string, string>);

  if (pdfMake.addVirtualFileSystem && vfs) {
    pdfMake.addVirtualFileSystem(vfs);
  } else if (vfs && typeof vfs === 'object') {
    (pdfMake as PdfMakeInstance & { vfs: Record<string, string> }).vfs = vfs;
  }

  pdfMakeInstance = pdfMake;
  return pdfMake;
}

/**
 * Crea un PDF a partir de una definición de documento y lo descarga con el nombre indicado.
 * @param docDefinition - Definición del documento (content, styles, etc.)
 * @param filename - Nombre del archivo (ej. "manual-indicadores.pdf")
 */
export async function createAndDownloadPdf(
  docDefinition: DocumentDefinition,
  filename: string,
): Promise<void> {
  const pdfMake = await getPdfMake();
  const pdfDoc = pdfMake.createPdf(docDefinition);
  pdfDoc.download(filename);
}

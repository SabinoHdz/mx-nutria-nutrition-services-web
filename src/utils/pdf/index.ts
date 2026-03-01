/**
 * API pública del módulo de generación de PDF.
 * Expone solo lo necesario para la descarga desde la UI.
 */

export { downloadManualIndicadoresPdf } from './manualIndicadoresPdf';
export { downloadDiagnosticoResultadosPdf } from './diagnosticoResultadosPdf';
export type { DocumentDefinition, Content } from './types';
export type { DiagnosticoResultadosPayload } from './diagnosticoResultadosDocDefinition';

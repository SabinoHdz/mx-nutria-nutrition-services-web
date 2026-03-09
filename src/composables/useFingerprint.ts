/**
 * Composable para obtener el fingerprint del navegador (FingerprintJS).
 * Se usa para enviar x-visit-fingerprint al backend y distinguir visitantes por dispositivo/navegador.
 * En entorno sin window (SSR) o si falla la librería, devuelve null.
 */
import FingerprintJS from '@fingerprintjs/fingerprintjs';

let cachedFingerprint: string | null = null;

export async function useFingerprint(): Promise<string | null> {
  if (typeof window === 'undefined') return null;
  if (cachedFingerprint) return cachedFingerprint;

  try {
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    cachedFingerprint = result.visitorId;
    return cachedFingerprint;
  } catch {
    return null;
  }
}

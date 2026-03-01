---
name: PDF Resultados Diagnóstico
overview: Botón "Descargar" a la derecha del título "Resultados" y generación del PDF en `src/utils/pdf` con datos del paciente y tabla de resultados. La tabla en la vista (DiagnosticsView) no se modifica; la columna Comentarios (alertas o "-") y los colores del diagnóstico existen solo en el PDF. Descarga siempre habilitada.
todos: []
isProject: false
---

# Plan: Botón Descargar y PDF de resultados de diagnóstico

## Contexto

- **Vista:** [src/views/DiagnosticsView.vue](src/views/DiagnosticsView.vue): card "Resultados" con título en línea 83-85 y tabla. Se actualizará a 4 columnas: Indicador | Valor | Diagnóstico | Comentarios (los comentarios son los textos de alerta que hoy se muestran en filas aparte; si no hay alerta, "-"). Los colores del diagnóstico (success, warning, error, info, primary) se reflejarán en el PDF.
- **Datos:** `formData` (Patient: sexo, edad, peso, talla), `antropomentric`, `signalVital`, `healthyWeight` (computed). Tipos en [src/types/Patient.ts](src/types/Patient.ts).
- **Utils PDF:** [src/utils/pdf/](src/utils/pdf): ya existe `pdfMakeClient.ts` (createAndDownloadPdf), `manualIndicadoresDocDefinition.ts` + `manualIndicadoresPdf.ts` como patrón a seguir.

**Política acordada:** el botón de descarga estará siempre habilitado; si no hay datos, el PDF mostrará "-" en valores y "Pendiente" en diagnóstico.

---

## 1. Tabla de resultados: columna "Comentarios" (UI)

En [DiagnosticsView.vue](src/views/DiagnosticsView.vue), actualizar la tabla de la card "Resultados":

- Añadir cuarta columna en `<thead>`: `<th>Comentarios</th>`.
- En cada fila de datos (`<tr>`), añadir un cuarto `<td>` con el comentario correspondiente (texto del alert) o "-" si no hay:
  - IMC, Cintura, Cadera, Frec. Cardíaca, Frec. Respiratoria: comentario siempre "-".
  - Temperatura: `signalVital.temperatureAlert || '-'`.
  - Sat. Oxígeno: `signalVital.oxygenSaturationAlert || '-'`.
  - Presión arterial: `signalVital.bloodPressureComment || '-'`.
  - Glucosa: `signalVital.glucoseAlert || '-'`.
- Eliminar las filas extra que hoy muestran los alerts a ancho completo (`<tr v-if="signalVital.temperatureAlert">`, `oxygenSaturationAlert`, `bloodPressureComment`, `glucoseAlert`), ya que ese texto pasa a la columna Comentarios.

---

## 2. Botón "Descargar" en la card Resultados

En [DiagnosticsView.vue](src/views/DiagnosticsView.vue), modificar el encabezado de la card "Resultados" (aprox. líneas 82-85) para que sea una fila con el título a la izquierda y el botón a la derecha:

- Envolver título y botón en un `div` con `flex justify-between items-center`.
- Añadir `VButton` "Descargar" que llame a `handleDownloadResultadosPdf`.
- En el script: ref `isDownloadingResultadosPdf`, función `handleDownloadResultadosPdf` que ponga loading, llame al nuevo servicio de PDF pasando `formData.value`, `antropomentric.value`, `signalVital.value`, `healthyWeight.value`, y en `finally` quite el loading (mismo patrón que el botón del manual en [SupportView.vue](src/views/SupportView.vue)).

---

## 3. Definición del documento PDF (tabla de resultados + datos del paciente)

Crear `**src/utils/pdf/diagnosticoResultadosDocDefinition.ts`**:

- **Entrada:** parámetros tipados: paciente (`Patient`), antropometría (`AntropometricData`), signos vitales (`SignalVital`), peso saludable `{ min: string | null, max: string | null }`.
- **Contenido del PDF (orden sugerido):**
  1. **Título:** "Resultados de diagnóstico" (o similar).
  2. **Sección "Datos del paciente":** texto o tabla con Sexo (mapear MALE/FEMALE a Masculino/Femenino), Edad (años), Peso actual (kg), Talla (m). Usar "-" si el valor es null/undefined.
  3. **Sección "Tabla de resultados":** tabla con **4 columnas** (Indicador, Valor, Diagnóstico, Comentarios), una fila por indicador (sin filas extra de alerta):
    - Cada fila: Indicador | Valor (con unidad) | Diagnóstico (texto del estado) | Comentarios (texto del alert si existe, si no "-").
    - Comentarios por fila: IMC, Cintura, Cadera, Frec. Cardíaca, Frec. Respiratoria → "-"; Temperatura → temperatureAlert o "-"; Sat. Oxígeno → oxygenSaturationAlert o "-"; Presión arterial → bloodPressureComment o "-"; Glucosa → glucoseAlert o "-".
  4. **Colores del diagnóstico:** en pdfmake cada celda de la columna Diagnóstico debe reflejar el color del badge (imcColor, waistColor, heartRateColor, etc.). Crear un mapa de los valores del tipo `'primary' | 'success' | 'warning' | 'error' | 'info'` a color de relleno o texto en pdfmake (ej. success → verde, warning → amarillo/naranja, error → rojo, info → azul, primary → gris o azul). Aplicar en la celda con `fillColor` (fondo) o `color` (texto) según se prefiera legibilidad.
  5. **Opcional:** bloque "Peso saludable" (mín/máx en kg).
- Formatear valores con `valor ?? '-'` y estado con `status || 'Pendiente'`. La tabla tendrá `widths` con 4 columnas y cada fila del body 4 celdas; las celdas de Diagnóstico serán objetos con `text`, `fillColor` (y/o `color`) según el mapa de colores.
- Devolver `DocumentDefinition` con `content` array y `defaultStyle`/`styles` coherentes con el manual (fontSize 10, estilos title/heading).

---

## 4. Servicio de descarga del PDF de resultados

Crear `**src/utils/pdf/diagnosticoResultadosPdf.ts`**:

- Importar `buildDiagnosticoResultadosDocDefinition` (a crear en el paso 2) y `createAndDownloadPdf` desde `pdfMakeClient`.
- Exportar función `downloadDiagnosticoResultadosPdf(payload: { patient, antropometric, signalVital, healthyWeight })` que:
  - Llame a `buildDiagnosticoResultadosDocDefinition(payload)`.
  - Llame a `createAndDownloadPdf(docDefinition, 'resultados-diagnostico.pdf')`.

---

## 5. Export y uso en DiagnosticsView

- En [src/utils/pdf/index.ts](src/utils/pdf/index.ts): exportar `downloadDiagnosticoResultadosPdf` (y si se crean tipos públicos, también).
- En **DiagnosticsView.vue:** importar `downloadDiagnosticoResultadosPdf`, implementar `handleDownloadResultadosPdf` con estado de carga y llamada al servicio con los datos actuales (`formData.value`, `antropomentric.value`, `signalVital.value`, `healthyWeight.value`). El botón no se deshabilita por falta de datos (siempre descargable).

---

## Resumen de archivos


| Acción    | Archivo                                                                                                                      |
| --------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Crear     | `src/utils/pdf/diagnosticoResultadosDocDefinition.ts`                                                                        |
| Crear     | `src/utils/pdf/diagnosticoResultadosPdf.ts`                                                                                  |
| Modificar | `src/utils/pdf/index.ts` (export)                                                                                            |
| Modificar | `src/views/DiagnosticsView.vue` (columna Comentarios en tabla, eliminar filas de alert; botón Descargar + handler + loading) |


---

## Detalle tabla pdfmake

- Tabla con 4 columnas: `widths: ['*', 'auto', 'auto', '*']` (o proporciones similares) y `headerRows: 1`. Cada fila del `body` tiene 4 celdas: Indicador (texto), Valor (texto con unidad), Diagnóstico (objeto `{ text, fillColor }` o `{ text, color }` según mapa de colores), Comentarios (texto; alert o "-").
- Mapa de colores sugerido (para `fillColor` o `color` en la celda Diagnóstico): `success` → `#22c55e`, `warning` → `#eab308`, `error` → `#ef4444`, `info` → `#3b82f6`, `primary` → `#6b7280`. Referencia: [DocumentDefinition types](src/utils/pdf/types.ts) con `Table` y `body: (string | ContentObject)[][]`; pdfmake acepta en celdas propiedades como `fillColor`, `color`.


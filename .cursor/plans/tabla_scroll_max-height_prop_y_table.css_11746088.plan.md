---
name: Tabla scroll max-height prop y table.css
overview: Añadir la prop `scrollableMaxHeight` (default 25rem) a VTable, aplicar la altura solo cuando `scrollable` es true, y mover los estilos del scroll al archivo global table.css para centralizarlos sin afectar las tablas que no usan scroll.
todos: []
isProject: false
---

# Prop scrollableMaxHeight y estilos en table.css

## Alcance

- Solo las tablas con `scrollable` true usan la altura máxima y los estilos de scroll; el resto (SupportView, etc.) no se tocan.
- La altura máxima será configurable por prop con valor por defecto `25rem`.
- Los estilos de `.table-wrapper--scrollable` vivirán en [src/assets/css/components/table.css](src/assets/css/components/table.css); el componente solo inyecta la variable de max-height cuando aplica.

## Cambios

### 1. Tipos y prop en [src/components/ui/table/table.ts](src/components/ui/table/table.ts)

- Añadir a `TableProps`:
  - `scrollableMaxHeight?: string` — opcional, valor por defecto en el componente `'25rem'`. Documentar que solo tiene efecto cuando `scrollable` es true.
- Actualizar el JSDoc de `scrollable` para mencionar que la altura se controla con `scrollableMaxHeight`.

### 2. Componente [src/components/ui/table/VTable.vue](src/components/ui/table/VTable.vue)

- Añadir la prop `scrollableMaxHeight` con `default: '25rem'`.
- En el wrapper (`div.table-wrapper`), cuando `scrollable` sea true, bindear un estilo que defina la variable CSS usada en table.css, por ejemplo:
  - `:style="scrollable ? { '--v-table-scrollable-max-height': scrollableMaxHeight } : undefined"`
- Eliminar todo el bloque `<style scoped>` del componente (los estilos de scroll y scrollbar pasan a table.css). La clase `table-wrapper--scrollable` sigue aplicándose con `:class` cuando `scrollable` es true.

### 3. Estilos globales en [src/assets/css/components/table.css](src/assets/css/components/table.css)

- Añadir al final del archivo una sección para tablas scrollables:
  - `.table-wrapper--scrollable`: `max-height: var(--v-table-scrollable-max-height, 25rem);`, `min-height: 0;`, `overflow-x: auto;`, `overflow-y: auto;`, `display: block;`, `scrollbar-width: thin;`, `scrollbar-color: ...`.
  - Pseudoelementos `::-webkit-scrollbar`, `::-webkit-scrollbar-track`, `::-webkit-scrollbar-thumb`, `::-webkit-scrollbar-thumb:hover` para la barra fina (mismos valores que hoy en VTable.vue).
  - `.table-wrapper--scrollable thead th`: `position: sticky; top: 0; z-index: 10; background; box-shadow` (usar las mismas variables que en el componente: `--color-background`, `--color-border` o `--v-table-header-bg` si existe).

Así el valor por defecto 25rem queda en un solo lugar (variable CSS con fallback en table.css y default de la prop en el componente); si no se pasa la prop, se usa 25rem; si se pasa (ej. `scrollable-max-height="28rem"`), el componente inyecta la variable y table.css la usa.

### 4. Uso en vistas

- [DiagnosticsView.vue](src/views/DiagnosticsView.vue): sigue usando `<VTable size="sm" scrollable>`; no es obligatorio pasar `scrollable-max-height` (se usan 25rem por defecto). Si más adelante quieren otro valor, se puede añadir `scrollable-max-height="28rem"` (o el que sea).
- SupportView y cualquier otra vista que use `<VTable>` sin `scrollable` no reciben la clase `table-wrapper--scrollable`, por tanto ninguno de estos estilos se aplica; no hay cambios en comportamiento ni estilos.

## Resumen de impacto


| Ubicación    | Cambio                                                                 |
| ------------ | ---------------------------------------------------------------------- |
| table.ts     | Nueva prop `scrollableMaxHeight`, JSDoc de `scrollable` actualizado.   |
| VTable.vue   | Prop + binding de `--v-table-scrollable-max-height`; quitar `<style>`. |
| table.css    | Nuevos estilos para `.table-wrapper--scrollable` y scrollbar.          |
| Otras vistas | Sin cambios; solo la tabla con `scrollable` usa la nueva lógica.       |



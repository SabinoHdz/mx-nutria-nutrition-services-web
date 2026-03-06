/**
 * Tipos para la generación de PDF con pdfmake.
 * La definición del documento sigue la estructura estándar de pdfmake.
 * @see https://pdfmake.github.io/docs/document-definition-object/
 */

/** Contenido de un elemento (texto, tabla, lista, etc.) */
export type Content = string | ContentObject | Content[];

export interface ContentObject {
  text?: string | string[];
  ul?: Content[];
  ol?: Content[];
  table?: Table;
  style?: string | string[];
  margin?: number | [number, number] | [number, number, number, number];
  headlineLevel?: number;
  bold?: boolean;
  italics?: boolean;
  fontSize?: number;
  image?: string;
  alignment?: 'left' | 'center' | 'right';
  /** Ancho en puntos o '*' para columna flexible (pdfmake) */
  width?: number | string;
  columns?: ContentObject[];
  [key: string]: unknown;
}

export interface Table {
  headerRows?: number;
  widths?: (number | string | '*')[];
  body: (string | ContentObject)[][];
}

/** Contenido para header/footer (estático o función por página) */
export type HeaderFooterContent =
  | Content
  | ((currentPage: number, pageCount: number, pageSize?: unknown) => Content);

/** Definición del documento para pdfmake */
export interface DocumentDefinition {
  content: Content[];
  defaultStyle?: {
    fontSize?: number;
    font?: string;
  };
  styles?: Record<string, { fontSize?: number; bold?: boolean }>;
  header?: HeaderFooterContent;
  footer?: HeaderFooterContent;
  pageMargins?: [number, number, number, number];
}

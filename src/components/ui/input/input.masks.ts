/**
 * INPUT MASKS & FILTERING
 * Funciones para filtrar y formatear entrada según tipo
 */

import type { InputType } from './input';

/**
 * Filtra caracteres inválidos según el tipo de input
 * Se ejecuta en cada keystroke
 */
export const filterInputByType = (value: string, type: InputType): string => {
  switch (type) {
    case 'number':
      // Solo dígitos, sin negativos, sin punto
      return value.replace(/[^0-9]/g, '');

    case 'decimal':
      // Dígitos y un punto (máximo)
      const decimalParts = value.split('.');
      if (decimalParts.length > 2) {
        // Si hay más de un punto, mantener solo el primero
        return (decimalParts[0] + '.' + decimalParts.slice(1).join('')).replace(/[^0-9.]/g, '');
      }
      // Solo dígitos y punto
      return value.replace(/[^0-9.]/g, '');

    case 'phone':
      // Dígitos, +, espacios, guiones
      return value.replace(/[^0-9+\s\-()]/g, '');

    case 'alphabetic':
      // Solo letras y espacios (incluyendo acentos)
      return value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');

    case 'alphanumeric':
      // Letras, números y espacios (incluyendo acentos)
      return value.replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]/g, '');

    case 'alphanumeric-special':
      // Permitir todo
      return value;

    case 'email':
      // No filtrar en tiempo real, validar en blur
      return value;

    case 'password':
      // Permitir todo
      return value;

    case 'text':
      // Permitir todo
      return value;

    case 'search':
      // Permitir todo
      return value;

    case 'url':
      // No filtrar en tiempo real, validar en blur
      return value;

    default:
      return value;
  }
};

/**
 * Aplica máscara visual (formato) al valor
 * Para visualización sin cambiar el valor real
 */
export const applyInputMask = (value: string, type: InputType): string => {
  switch (type) {
    case 'phone': {
      // Formato: +34 123 45 67 89
      const cleaned = value.replace(/\D/g, '');
      if (cleaned.length === 0) return '';
      if (cleaned.length <= 2) return `+${cleaned}`;
      if (cleaned.length <= 5) return `+${cleaned.slice(0, 2)} ${cleaned.slice(2)}`;
      if (cleaned.length <= 7)
        return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5)}`;
      if (cleaned.length <= 9)
        return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5, 7)} ${cleaned.slice(7)}`;
      return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5, 7)} ${cleaned.slice(7, 9)} ${cleaned.slice(9)}`;
    }

    case 'decimal':
      // Sin separador de miles, solo mostrar tal cual
      return value;

    case 'number':
      // Solo número
      return value;

    default:
      return value;
  }
};

/**
 * Limita decimales según la configuración
 */
export const limitDecimalPlaces = (value: string, decimalPlaces: number = 2): string => {
  if (!value.includes('.')) return value;

  const [integer = '', decimal = ''] = value.split('.');
  const limitedDecimal = decimal.slice(0, decimalPlaces);
  return `${integer}.${limitedDecimal}`;
};

/**
 * Limita dígitos enteros según la configuración
 */
export const limitIntegerDigits = (value: string, integerDigits: number = 10): string => {
  const hasTrailingDot = value.endsWith('.');
  const [integer = '', decimal = ''] = value.split('.');
  const limitedInteger = integer.slice(0, integerDigits);

  if (hasTrailingDot && decimal === '') {
    return `${limitedInteger}.`;
  }

  return decimal ? `${limitedInteger}.${decimal}` : limitedInteger;
};

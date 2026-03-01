/**
 * INPUT VALIDATORS
 * Funciones de validación específicas por tipo
 */

import { VALIDATION_PATTERNS } from './input';
import type { InputType } from './input';

/**
 * Valida según el tipo de input
 */
export const validateByType = (
  value: string | number,
  type: InputType,
  options?: {
    min?: number;
    max?: number;
    minlength?: number;
    maxlength?: number;
    decimalPlaces?: number;
    integerDigits?: number;
  },
): boolean => {
  const strValue = String(value).trim();

  // Validaciones de longitud
  if (options?.minlength && strValue.length < options.minlength) return false;
  if (options?.maxlength && strValue.length > options.maxlength) return false;

  switch (type) {
    case 'number': {
      if (!strValue) return false;
      const num = Number(strValue);
      if (isNaN(num)) return false;
      if (options?.min !== undefined && num < options.min) return false;
      if (options?.max !== undefined && num > options.max) return false;
      return true;
    }

    case 'decimal': {
      if (!strValue) return false;
      const num = Number(strValue);
      if (isNaN(num) || !strValue.match(/^\d+\.?\d*$|^\d*\.?\d+$/)) return false;

      // Validar dígitos enteros
      const [integer = '', decimal = ''] = strValue.split('.');
      if (options?.integerDigits && integer.length > options.integerDigits) return false;

      // Validar dígitos decimales
      if (options?.decimalPlaces && decimal && decimal.length > options.decimalPlaces) return false;

      if (options?.min !== undefined && num < options.min) return false;
      if (options?.max !== undefined && num > options.max) return false;
      return true;
    }

    case 'email': {
      const pattern = VALIDATION_PATTERNS.email;
      return pattern ? pattern.test(strValue) : true;
    }

    case 'url': {
      const pattern = VALIDATION_PATTERNS.url;
      return pattern ? pattern.test(strValue) : true;
    }

    case 'phone': {
      const pattern = VALIDATION_PATTERNS.phone;
      return pattern ? pattern.test(strValue) : true;
    }

    case 'alphabetic':
      return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(strValue);

    case 'alphanumeric':
      return /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]*$/.test(strValue);

    case 'alphanumeric-special':
      return true; // Permitir todo

    case 'password':
      return true; // Permitir cualquier contraseña

    case 'text':
    case 'search':
    default:
      return true;
  }
};

/**
 * Mensaje de error específico por tipo
 */
export const getTypeErrorMessage = (type: InputType): string => {
  switch (type) {
    case 'email':
      return 'Email inválido';
    case 'url':
      return 'URL inválida';
    case 'number':
      return 'Solo se permiten números enteros';
    case 'decimal':
      return 'Formato decimal inválido';
    case 'phone':
      return 'Teléfono inválido';
    case 'alphabetic':
      return 'Solo se permiten letras';
    case 'alphanumeric':
      return 'Solo se permiten letras y números';
    case 'password':
      return 'Contraseña inválida';
    default:
      return 'Valor inválido';
  }
};

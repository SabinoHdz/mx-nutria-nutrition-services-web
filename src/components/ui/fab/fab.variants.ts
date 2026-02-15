/**
 * FAB COMPONENT - CVA Variants Configuration
 * Estilos simplificados, la mayoría se maneja en CSS
 */

import { cva } from 'class-variance-authority';

/**
 * FAB Container - Posicionamiento fijo en pantalla
 */
export const fabContainerCva = cva('v-fab-container', {
  variants: {
    position: {
      'top-left': '',
      'top-right': '',
      'bottom-left': '',
      'bottom-right': '',
    },
  },
  defaultVariants: {
    position: 'bottom-right',
  },
});

/**
 * FAB Button - Botón principal flotante
 */
export const fabButtonCva = cva('v-fab-button', {
  variants: {
    size: {
      sm: '',
      md: '',
      lg: '',
    },
    disabled: {
      true: 'opacity-50 cursor-not-allowed',
      false: 'cursor-pointer',
    },
  },
  defaultVariants: {
    size: 'md',
    disabled: false,
  },
});

/**
 * FAB Actions Container - Contenedor de acciones del Speed Dial
 */
export const fabActionsContainerCva = cva('v-fab-actions-container', {
  variants: {
    direction: {
      up: '',
      down: '',
      left: '',
      right: '',
    },
    open: {
      true: 'v-fab-actions-container--open',
      false: '',
    },
  },
  defaultVariants: {
    direction: 'up',
    open: false,
  },
});

/**
 * FAB Action Item - Cada botón del Speed Dial
 */
export const fabActionCva = cva('v-fab-action', {
  variants: {
    size: {
      sm: '',
      md: '',
      lg: '',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export type FabContainerCVAProps = ReturnType<typeof fabContainerCva>;
export type FabButtonCVAProps = ReturnType<typeof fabButtonCva>;
export type FabActionsContainerCVAProps = ReturnType<typeof fabActionsContainerCva>;
export type FabActionCVAProps = ReturnType<typeof fabActionCva>;

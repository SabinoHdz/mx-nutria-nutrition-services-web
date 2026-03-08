/**
 * VModal - Types
 * Configurable modal for messages (success, error, info, warning).
 */

export const MODAL_TYPES = ['info', 'success', 'warning', 'error'] as const;
export type ModalType = (typeof MODAL_TYPES)[number];

export interface ModalProps {
  /** v-model open state */
  modelValue?: boolean;
  /** Optional title */
  title?: string;
  /** Main message content */
  message?: string;
  /** Visual type: icon and color */
  type?: ModalType;
  /** Close button label */
  closeLabel?: string;
}

export const MODAL_TYPE_ICONS: Record<ModalType, string> = {
  info: 'info',
  success: 'check_circle',
  warning: 'warning',
  error: 'error',
};

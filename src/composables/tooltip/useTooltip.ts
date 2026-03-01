/**
 * STEP 10: COMPOSABLE useTooltip
 *
 * Aquí va toda la lógica de:
 * - Posicionamiento (calcular coordenadas)
 * - Eventos (hover, click, focus)
 * - Delays (show/hide)
 * - Visibilidad
 */

import { ref, computed, onMounted, onUnmounted, type Ref } from 'vue';
import type { TooltipPlacement, TooltipTrigger } from '@/components/ui/tooltip';

export interface UseTooltipOptions {
  placement: TooltipPlacement;
  trigger: TooltipTrigger;
  delay: number;
  hideDelay: number;
  disabled: boolean;
  offset: number;
  modelValue?: boolean;
}

export function useTooltip(
  targetRef: Ref<HTMLElement | null>,
  tooltipRef: Ref<HTMLElement | null>,
  options: UseTooltipOptions,
  emit: (event: string, ...args: unknown[]) => void,
) {
  // ===== ESTADO =====
  // Controla si el tooltip está visible o no
  const isVisible = ref(false);

  // Almacena las coordenadas top/left para posicionar el tooltip
  const position = ref({ top: 0, left: 0 });

  // Timers para implementar delays
  let showTimer: number | null = null;
  let hideTimer: number | null = null;

  // ===== COMPUTED =====
  // Determina si el tooltip debe estar visible
  // Maneja el trigger 'manual' (v-model)
  const tooltipVisible = computed(() => {
    if (options.trigger === 'manual') {
      // Si es manual, usar el v-model
      return options.modelValue ?? false;
    }
    // Para otros triggers, usar el estado interno
    return !options.disabled && isVisible.value;
  });

  // ===== FUNCIONES DE POSITIONING =====

  /**
   * Calcula la posición (top, left) del tooltip
   * según el placement y las dimensiones del elemento y tooltip
   */
  const calculatePosition = () => {
    if (!targetRef.value || !tooltipRef.value) return;

    // Obtener posición y tamaño del elemento que dispara el tooltip
    const targetRect = targetRef.value.getBoundingClientRect();

    // Obtener tamaño del tooltip
    const tooltipRect = tooltipRef.value.getBoundingClientRect();

    const offset = options.offset; // Distancia entre tooltip y elemento (8px default)

    let top = 0;
    let left = 0;

    // ===== LÓGICA DE POSICIONAMIENTO =====
    // Según el placement, calcular dónde debe estar el tooltip

    switch (options.placement) {
      // TOP: Arriba, centrado
      case 'top':
        top = targetRect.top - tooltipRect.height - offset;
        left = targetRect.left + targetRect.width / 2 - tooltipRect.width / 2;
        break;

      // TOP-START: Arriba, alineado a la izquierda
      case 'top-start':
        top = targetRect.top - tooltipRect.height - offset;
        left = targetRect.left;
        break;

      // TOP-END: Arriba, alineado a la derecha
      case 'top-end':
        top = targetRect.top - tooltipRect.height - offset;
        left = targetRect.right - tooltipRect.width;
        break;

      // BOTTOM: Abajo, centrado
      case 'bottom':
        top = targetRect.bottom + offset;
        left = targetRect.left + targetRect.width / 2 - tooltipRect.width / 2;
        break;

      // BOTTOM-START: Abajo, alineado a la izquierda
      case 'bottom-start':
        top = targetRect.bottom + offset;
        left = targetRect.left;
        break;

      // BOTTOM-END: Abajo, alineado a la derecha
      case 'bottom-end':
        top = targetRect.bottom + offset;
        left = targetRect.right - tooltipRect.width;
        break;

      // LEFT: A la izquierda, centrado
      case 'left':
        top = targetRect.top + targetRect.height / 2 - tooltipRect.height / 2;
        left = targetRect.left - tooltipRect.width - offset;
        break;

      // LEFT-START: A la izquierda, alineado arriba
      case 'left-start':
        top = targetRect.top;
        left = targetRect.left - tooltipRect.width - offset;
        break;

      // LEFT-END: A la izquierda, alineado abajo
      case 'left-end':
        top = targetRect.bottom - tooltipRect.height;
        left = targetRect.left - tooltipRect.width - offset;
        break;

      // RIGHT: A la derecha, centrado
      case 'right':
        top = targetRect.top + targetRect.height / 2 - tooltipRect.height / 2;
        left = targetRect.right + offset;
        break;

      // RIGHT-START: A la derecha, alineado arriba
      case 'right-start':
        top = targetRect.top;
        left = targetRect.right + offset;
        break;

      // RIGHT-END: A la derecha, alineado abajo
      case 'right-end':
        top = targetRect.bottom - tooltipRect.height;
        left = targetRect.right + offset;
        break;
    }

    // ===== BOUNDARY DETECTION =====
    // Si el tooltip sale de la pantalla, ajustarlo automáticamente

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const margin = 8; // Margen mínimo desde los bordes

    // Si sale hacia la izquierda
    if (left < 0) left = margin;

    // Si sale hacia la derecha
    if (left + tooltipRect.width > viewportWidth) {
      left = viewportWidth - tooltipRect.width - margin;
    }

    // Si sale hacia arriba
    if (top < 0) top = margin;

    // Si sale hacia abajo
    if (top + tooltipRect.height > viewportHeight) {
      top = viewportHeight - tooltipRect.height - margin;
    }

    // Guardar las coordenadas calculadas
    position.value = { top, left };
  };

  // ===== FUNCIONES DE SHOW/HIDE =====

  /**
   * Mostrar tooltip con delay
   */
  const show = () => {
    // No mostrar si está deshabilitado
    if (options.disabled) return;

    // Limpiar timer anterior de hide si existe
    if (hideTimer) {
      clearTimeout(hideTimer);
      hideTimer = null;
    }

    // Iniciar timer para mostrar después del delay
    showTimer = window.setTimeout(() => {
      isVisible.value = true;
      calculatePosition(); // Calcular posición justo antes de mostrar
      emit('show'); // Emitir evento
    }, options.delay);
  };

  /**
   * Ocultar tooltip con delay
   */
  const hide = () => {
    // Limpiar timer anterior de show si existe
    if (showTimer) {
      clearTimeout(showTimer);
      showTimer = null;
    }

    // Iniciar timer para ocultar después del hideDelay
    hideTimer = window.setTimeout(() => {
      isVisible.value = false;
      emit('hide'); // Emitir evento
    }, options.hideDelay);
  };

  // ===== EVENT HANDLERS =====

  const onMouseEnter = () => {
    if (options.trigger === 'hover') show();
  };

  const onMouseLeave = () => {
    if (options.trigger === 'hover') hide();
  };

  const onClick = () => {
    if (options.trigger === 'click') {
      if (isVisible.value) hide();
      else show();
    }
  };

  const onFocus = () => {
    if (options.trigger === 'focus') show();
  };

  const onBlur = () => {
    if (options.trigger === 'focus') hide();
  };

  // ===== LIFECYCLE =====

  onMounted(() => {
    if (!targetRef.value) return;

    // Registrar listeners según el trigger
    if (options.trigger === 'hover') {
      targetRef.value.addEventListener('mouseenter', onMouseEnter);
      targetRef.value.addEventListener('mouseleave', onMouseLeave);
    }
    if (options.trigger === 'click') {
      targetRef.value.addEventListener('click', onClick);
    }
    if (options.trigger === 'focus') {
      targetRef.value.addEventListener('focus', onFocus);
      targetRef.value.addEventListener('blur', onBlur);
    }

    // Recalcular posición cuando la ventana se redimensiona o scrollea
    window.addEventListener('scroll', calculatePosition, true);
    window.addEventListener('resize', calculatePosition);
  });

  onUnmounted(() => {
    // Limpiar timers
    if (showTimer) clearTimeout(showTimer);
    if (hideTimer) clearTimeout(hideTimer);

    if (!targetRef.value) return;

    // Remover listeners
    targetRef.value.removeEventListener('mouseenter', onMouseEnter);
    targetRef.value.removeEventListener('mouseleave', onMouseLeave);
    targetRef.value.removeEventListener('click', onClick);
    targetRef.value.removeEventListener('focus', onFocus);
    targetRef.value.removeEventListener('blur', onBlur);

    window.removeEventListener('scroll', calculatePosition, true);
    window.removeEventListener('resize', calculatePosition);
  });

  // Exportar métodos y estado
  return {
    isVisible: tooltipVisible,
    position,
    show,
    hide,
  };
}

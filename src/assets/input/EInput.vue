<template>
  <div>
    <div class="exos-flex exos-flex-grow exos-relative">
      <component
        :is="textarea ? 'textarea' : 'input'"
        placeholder=" "
        :type="inputType"
        :class="mainClass"
        :disabled="disabled"
        :id="'input-' + label"
        :maxlength="finalLength"
        :ref="'inputRef' + $.uid"
        :value="cleaningInput ? modelValue : modelValue"
        @blur="onInputBlur"
        @focus="onInputFocus"
        @keydown="preventSpace"
        @input="clearAndEmitValue"
      />
      <label :for="'input-' + label" :class="labelClass">
        <div :class="classBoxLabel">
          <p>{{ label }}</p>
          <span v-if="required">*</span>
        </div>
      </label>
      <div
        v-if="!!modelValue && !disabled"
        @click="clean"
        :class="[
          'e-input-icon exos-animate-slide-down',
          type == 'password'
            ? $slots.icon && iconRight
              ? 'exos-right-[4.25rem]'
              : 'exos-right-10'
            : [$slots.icon ? 'exos-right-11' : 'exos-right-3']
              ? iconRight
                ? 'exos-right-11'
                : 'exos-right-3'
              : 'exos-right-3',
        ]"
      >
        <!-- @slot En este slot podras sustituir el ícono de borrado que tiene por default el input. -->
        <slot v-if="$slots.iconClose" name="iconClose" />
        <svg
          v-else
          class="exos-w-4 exos-h-4 exos-text-secondary exos-opacity-60 hover:exos-opacity-100 dark:exos-text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 15 15"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </div>
      <div v-if="type == 'password'" @click="showPassword" class="e-input-icon exos-right-3">
        <!-- @slot En este slot podras sustotuir el icon de borrado que tiene por default el input cuando sea tipo password. -->
        <slot v-if="$slots.iconPassword" name="iconClose" />
        <div v-else>
          <svg
            v-if="showPass"
            :class="[
              'exos-w-6 exos-h-6',
              errorRules ? 'exos-text-danger' : 'exos-text-secondary dark:exos-text-white',
            ]"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1.933 10.909A4.357 4.357 0 0 1 1 9c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 19 9c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M2 17 18 1m-5 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
          <svg
            v-else
            :class="[
              'exos-w-6 exos-h-6',
              errorRules ? 'exos-text-danger' : 'exos-text-secondary dark:exos-text-white',
            ]"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 14"
          >
            <g
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            >
              <path d="M10 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
              <path d="M10 13c4.97 0 9-2.686 9-6s-4.03-6-9-6-9 2.686-9 6 4.03 6 9 6Z" />
            </g>
          </svg>
        </div>
      </div>
      <div
        class="e-input-icon"
        :class="[
          type == 'password'
            ? iconRight
              ? 'exos-right-9'
              : 'exos-left-2'
            : iconRight
              ? 'exos-right-3'
              : 'exos-left-2',
        ]"
      >
        <!-- @slot Aqui podras ingresar icons personalizados al componente EInput. -->
        <slot v-if="$slots.icon" name="icon" />
      </div>
    </div>
    <div v-if="!!messageRestrictions" class="e-input--error-message">
      {{ messageRestrictions }}
    </div>
    <div v-if="!!messageRule" class="e-input--error-message">
      {{ messageRule }}
    </div>
  </div>
</template>

<script>
import { DateTime } from 'luxon';
const patterns = {
  email:
    /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,250}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/, // Email
  decimal: {
    regex: /[^0-9.]/g, //Decimal
    msg: 'El valor ingresado debe ser en formato decimal',
  },
  integer: {
    regex: /[^0-9]/g, // Números enteros
    msg: 'El valor ingresado debe ser en formato entero',
  },
  alfa: {
    regex: /[^a-zA-ZáÁéÉíÍóÓúÚüÜ\u00f1\u00d1\s]/g, // Alfabético con espacio y acentos
    msg: 'El valor ingresado debe ser alfabético',
  },
  alfaNum: {
    regex: /[^a-zA-Z0-9áÁéÉíÍóÓúÚüÜ\u00f1\u00d1]/g, // Alfanumérico con letras acentuadas
    msg: 'El valor ingresado debe ser alfanumérico',
  },
  alfaNumChar: {
    regex: /[^a-zA-Z0-9áéíóúÁÉÍÓÚüÜ[\](){}*#@,.ñÑ&!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~ ]/g, // Alfanumérico con caracteres especiales especificados
    msg: 'El valor ingresado debe ser alfanumérico con caracteres especiales permitidos',
  },
  alfaNumSpace: {
    regex: /[^a-zA-Z0-9\s]/g, // Letras, números y espacios
    msg: 'El valor ingresado debe contener solo letras, números y espacios',
  },
  nomenclaturaDoc: {
    regex: /[^a-zA-Z0-9%_\-.,ñÑ\s]/g, // Alfanumérico para nomenclatura de documentos
    msg: 'La nomenclatura contiene caracteres inválidos',
  },
  pathDocs: {
    regex: /[^a-zA-Z0-9\\/,_\-.:]/g, //Ruta de archivos
    msg: 'La ruta contiene caracteres inválidos',
  },
  money: {
    regex: /[^0-9.,$]/g, // $15,450.00 Números, punto, coma y signo de peso
    msg: 'El valor ingresado debe ser en formato de cantidad monetaria',
  },
  time: {
    regex: /[^0-9:]/g, //Horas HH:MM:SS
    msg: 'El campo debe contener el formato HH:MM:SS',
  },
  timens: {
    regex: /[^0-9:]/g, //Horas HH:MM
    msg: 'El campo debe contener el formato HH:MM',
  },
};

export default {
  name: 'EInput',
  props: {
    /**
     * Valor del componente input.
     */
    modelValue: {
      type: String,
      default: null,
      description: 'Valor del componente EInput.',
    },
    /**
     * Modificador del valor del componente input. Ayuda para dar tratamiento a las máscaras.
     */
    modelModifiers: {
      default: null,
      description: 'Modificadores modelValue.',
    },
    /**
     * Máscara a aplicar al valor emitido.
     */
    mask: {
      type: String,
      default: null,
      description: 'Máscara a aplicar al valor emitido.',
    },
    /**
     * Tipo del componente EInput (Ej. text, number, etc.).
     */
    type: {
      type: String,
      default: 'text',
      description: 'Tipo del componente EInput (Ej. text, number, etc.).',
    },
    /**
     * Indica si el valor del componente es obligatorio o no.
     */
    required: {
      type: Boolean,
      default: false,
      description: 'El valor del componente es obligatorio.',
    },
    /**
     * Si es true, no permite espacios en el valor ingresado.
     */
    noWhiteSpace: {
      type: Boolean,
      default: false,
      description:
        'Si es true, no permite colocar esacios en el valor que se ingresa al componente.',
    },
    /**
     * Altura mínima para cuando el componente es de tipo textArea.
     */
    minHeightArea: {
      type: String,
      default: null,
      description: 'Altura mínima para cuando el componente es de tipo textArea.',
    },
    /**
     * Grado del redondeo de los bordes del componente.
     * @values none, xs, sm, md, lg, xl, xxl
     */
    roundedSize: {
      type: String,
      default: null,
      description: 'Grado del redondeo de los bordes del componente.',
    },
    /**
     * Indica si el componente está deshabilitado.
     */
    disabled: {
      type: Boolean,
      default: false,
      description: 'El componente estará deshabilitado en caso de ser true.',
    },
    /**
     * Caracteres permitidos en el valor del componente.
     */
    length: {
      type: [String, Number],
      default: null,
      description: 'Caracteres permitidos en el valor del componente.',
    },
    /**
     * Arreglo que contiene las reglas a considerar para el valor del componente.
     */
    rules: {
      type: Array,
      default: () => [],
      description: 'Arreglo que contendrá las reglas que el componente considerará para su valor.',
    },
    /**
     * Descripción del valor que debe ser ingresado en el componente.
     */
    label: {
      type: String,
      default: null,
      description: 'Descripción del valor que debe ser ingresado en el componente.',
    },
    /**
     * Caracter que divide los correos, funciona solo con la directiva multEmail
     */
    charSplitEmail: {
      type: String,
      default: ';',
      description: 'Caracter que divide los correos, funciona solo con la directiva multEmail',
    },
    /**
     * Saber si el componente sera textarea para comentarios.
     */
    textarea: {
      type: Boolean,
      default: false,
      description: 'Saber si el componente sera textarea para comentarios.',
    },
    /**
     * Tamaño del texto del botón. Ej. sm, md, lg, etc
     * @values xs, sm, md, lg, xl, xxl
     */
    textSize: {
      type: String,
      default: 'md',
      description: 'Tamaño del texto del componente. Ej. sm, md, lg...',
    },
    /**
     * Grado de la sombra del componente.
     * @values none, xs, sm, md, lg, xl, xxl
     */
    shadowSize: {
      type: String,
      default: null,
      description: 'Grado de la sombra del componente.',
    },
    /**
     * Si es true, el ícono estará en el lado derecho del componente; de lo contrario, en el lado izquierdo.
     */
    iconRight: {
      type: Boolean,
      default: false,
      description:
        'En caso de ser true el ícono deberá estár del lado derecho del componente, de lo contrario del lado izquierdo.',
    },
    /**
     * Setea el color del bg del input, y se puede agregar para los modos light y dark y estados como hover.<br>
     * Ej:<br>bgColor="bg-gray-500 dark:bg-whit hover:bg-green-300"
     */
    bgColor: {
      type: String,
      default: null,
      description: 'Color bg del componente.',
    },
    /**
     * Setea el color del texto ingresado, y se puede agregar para los modos light y dark y estados como hover.<br>
     * Ej:<br>color="text-gray-500 dark:text-whit hover:text-green-300"
     */
    color: {
      type: String,
      default: null,
      description: 'Color del texto que ingresa el usuario al componente en modo light.',
    },
    /**
     * Setea el color del texto del label, y se puede agregar para los modos light y dark y estados como hover.<br>
     * Ej:<br>labelColor="text-gray-500 dark:text-whit hover:text-green-300"
     */
    labelColor: {
      type: String,
      default: null,
      description: 'Color del texto label del componente en modo light.',
    },
    /**
     * Setea el color del texto del label cuando no hay valores, y se puede agregar para los modos light y dark y estados como hover.<br>
     * Ej:<br>labelColorNV="text-gray-500 dark:text-whit hover:text-green-300"
     */
    labelColorNV: {
      type: String,
      default: null,
      description: 'Color del texto label del componente cuando no tiene un valor en modo light.',
    },
    /**
     * Bandera para setear un borde al componente.
     */
    border: {
      type: Boolean,
      default: true,
      description: 'Bandera para setear un borde al componente.',
    },
    /**
     * Borde customizado del componente.
     */
    borderCustom: {
      type: String,
      default: null,
      description: 'Borde customizado del componente.',
    },
    /**
     * Setea el color del borde del input, y se puede agregar para los modos light y dark y estados como hover.<br>
     *Ej:<br> borderColor="border-gray-500 dark:border-whit hover:border-green-300"
     */
    borderColor: {
      type: String,
      default: null,
      description:
        "Color del borde del componente en caso de que la prop 'border' sea true en modo light.",
    },
    /**
     * Regex para solo admitir ciertos caracteres, se maneja un objeto con 2 atributos
     * {
     *  regex: /[^a-zA-Z0-9]/g //Ejemplo para solo manejar alfanumericos, si no define un regex se apliara como alfabetico
     *  msg: Mensaje a mostrar, en caso de no definir un msg se mostrara el texto "El caràcter NO cumple con las reglas establecidas"
     * }
     */
    regexValidChars: {
      default: null,
      description:
        'Regex para solo admitir ciertos caracteres, se maneja un objeto con 2 atributos.',
    },
    /**
     * Fecha del primer input de tiempo para rango.
     */
    startHour: {
      default: null,
      description: 'Fecha del primer input de tiempo para rango',
    },
    /**
     * Bandera para saber si la hora final puede ser igual a la hora inicial.
     */
    greaterThanTime: {
      type: Boolean,
      default: true,
      description: 'Bandera para saber si la hora final puede ser igual a la hora inicial',
    },
  },
  inject: {
    register: {
      from: 'register',
      default: false,
    },
    unregister: {
      from: 'unregister',
      default: false,
    },
  },
  data() {
    return {
      inputType: null,
      showPass: false,
      error: false,
      errorRules: false,
      messageRule: false,
      errorRestriction: false,
      messageRestrictions: false,
      cleaningInput: false,
      MAX_LEN: { time: 8, timens: 5 },
      isInputFocused: false,
    };
  },
  computed: {
    mainClass() {
      const baseClasses = [
        'e-input-base exos-peer',
        this.shadowClass,
        this.roundedClass,
        this.textSizeClass,
        this.bgColor + ' exos-bg-field dark:exos-bg-fieldDark',
        this.textarea ? [this.minHeightArea ?? ''] : [],
      ];

      const textColorClasses = [
        this.errorRules || this.messageRestrictions
          ? 'exos-text-danger'
          : this.color + ' exos-text-black dark:exos-text-white',
      ];

      const borderClasses = [
        this.border
          ? [
              this.modelValue
                ? [this.borderCustom ?? 'exos-border-2', this.borderColor + ' e-input-borderColor']
                : [
                    this.borderColor +
                      ' focus:exos-border-2 focus:exos-border-secondary dark:focus:exos-border-secondary',
                  ],
            ]
          : ['exos-border-none'],
      ];

      const iconClasses = this.$slots.icon
        ? this.iconRight
          ? this.$slots.iconPassword || this.type == 'password'
            ? 'exos-pl-3 exos-pr-24' // Ícono a la derecha y también ícono de mostrar/ocultar password
            : 'exos-pl-3 exos-pr-[4.25rem]' // Ícono a la derecha
          : this.type == 'password'
            ? 'exos-pl-10 exos-pr-[4.25rem]' // Ícono a la izquierda y es de tipo password
            : 'exos-px-10' // Ícono a la izquierda
        : this.$slots.iconPassword || this.type == 'password'
          ? 'exos-pl-3 exos-pr-[4.25rem]' // No hay ícono y es de tipo password
          : 'exos-pl-3 exos-pr-10'; // No hay ícono

      return this.errorRules || this.messageRestrictions
        ? ['e-input--error-border', ...baseClasses, iconClasses, textColorClasses]
        : baseClasses.concat(iconClasses, textColorClasses, borderClasses);
    },
    labelClass() {
      const baseLabelClasses = ['e-input-label', this.roundedClass, this.textSizeClass];

      const dynamicLabelClasses = [
        this.disabled ? 'exos-cursor-not-allowed' : 'exos-cursor-pointer',
        this.$slots.icon && !this.iconRight
          ? 'exos-px-10 peer-focus:exos-px-10'
          : 'exos-px-2 peer-focus:exos-px-2',
        this.modelValue
          ? [
              this.errorRules || this.messageRestrictions
                ? ['exos-text-danger', 'peer-focus:exos-text-danger']
                : [this.labelColor + ' exos-text-secondary dark:exos-text-secondary'],
            ]
          : [
              this.errorRules || this.messageRestrictions
                ? ['exos-text-danger', 'peer-focus:exos-text-danger']
                : [this.labelColorNV + ' exos-text-black dark:exos-text-white'],
            ],
      ];

      return baseLabelClasses.concat(dynamicLabelClasses);
    },
    classBoxLabel() {
      const baseBoxLabelClasses = ['e-input__classBoxLabel'];

      const dynamicBoxLabelClasses =
        this.modelValue || this.isInputFocused
          ? [this.bgColor + ' exos-bg-field dark:exos-bg-fieldDark']
          : [];

      return baseBoxLabelClasses.concat(dynamicBoxLabelClasses);
    },
    textSizeClass() {
      const textSizeClasses = {
        xs: 'exos-text-xs',
        sm: 'exos-text-sm',
        md: 'exos-text-base',
        lg: 'exos-text-lg',
        xl: 'exos-text-xl',
        xxl: 'exos-text-2xl',
      };

      return this.textSize ? textSizeClasses[this.textSize] : 'exos-text-base';
    },
    shadowClass() {
      const shadowClasses = {
        none: 'exos-shadow-none',
        xs: 'exos-shadow',
        sm: 'exos-shadow-sm',
        md: 'exos-shadow-md',
        lg: 'exos-shadow-lg ',
        xl: 'exos-shadow-xl',
        xxl: 'exos-shadow-2xl',
      };

      return this.shadowSize ? shadowClasses[this.shadowSize] : 'exos-shadow-bancosCmp';
    },
    roundedClass() {
      const roundedClasses = {
        none: 'exos-rounded-none',
        sm: 'exos-rounded',
        md: 'exos-rounded-md',
        lg: 'exos-rounded-lg',
        xl: 'exos-rounded-xl',
        xxl: 'exos-rounded-2xl',
      };

      return this.roundedSize ? roundedClasses[this.roundedSize] : 'exos-rounded-lg';
    },
    finalRules() {
      let rules = [...this.rules];
      if (this.required) {
        rules.unshift((val) => !!val?.toString() || `El campo ${this.label} es requerido`);
      }
      if (this.modelModifiers?.email) {
        rules.push(
          (val) =>
            patterns.email.test(val) || `El campo ${this.label} debe contener formato de correo`,
        );
      }
      return rules;
    },
    finalLength() {
      let auxLen = null;
      let types = Object.keys(this.MAX_LEN);
      if (this.modelModifiers && this.length == null) {
        let mod = Object.keys(this.modelModifiers).toString();
        types.map((info) => {
          if (info === mod) {
            auxLen = this.MAX_LEN[info];
          }
        });
      } else {
        auxLen = this.length;
      }
      return auxLen;
    },
  },
  created() {
    // Asigna el tipo de input al componente a según la prop type
    this.inputType = this.type;
    //Registra al componente al EForm al crearse
    if (this.register) {
      this.register(this);
    }
  },
  // Desregistra este componente en EForm antes de destruirse
  beforeUnmount() {
    if (this.unregister) {
      this.unregister(this);
    }
  },
  methods: {
    onInputFocus() {
      this.isInputFocused = true;
    },
    onInputBlur() {
      this.isInputFocused = false;
    },
    async clearAndEmitValue(event) {
      let valueInput = event.target.value;
      let emails = valueInput.replace(/ /g, '').split(this.charSplitEmail);
      let allEmailCorrect = true;
      let incorrectEmail = null;
      let enteredTime;
      let startTime;
      let validateTime;
      switch (true) {
        case this.modelModifiers?.charExclude || !!this.regexValidChars?.regex:
          // eslint-disable-next-line
          let regexToApply = this.regexValidChars?.regex ?? /[^a-zA-ZáÁéÉíÍóÓúÚüÜ\s]/g;
          // eslint-disable-next-line
          let msgToShow =
            this.regexValidChars?.msg ?? 'El carácter no cumple con las reglas establecidas';
          valueInput = valueInput.replace(regexToApply, '');
          // eslint-disable-next-line
          let errorKey = regexToApply.test(event.target.value);
          if (!errorKey) {
            this.resetRestrictions();
          } else {
            this.showRestrictions(msgToShow);
          }
          break;
        case this.modelModifiers?.multEmail:
          emails.reverse();
          emails.map((email) => {
            if (!!email && !patterns.email.test(email)) {
              allEmailCorrect = false;
              incorrectEmail = email;
            }
          });
          allEmailCorrect = allEmailCorrect && emails.filter((email) => !!email).length > 0;
          if (allEmailCorrect) {
            this.resetRestrictions();
          } else {
            this.showRestrictions(
              `${
                incorrectEmail ? incorrectEmail : 'Los datos ingresados'
              } no tiene un formato de correo correcto`,
            );
          }
          break;
        case this.modelModifiers?.decimal:
          valueInput = valueInput.replace(patterns.decimal.regex, '');
          if (event.target.value.includes('.')) {
            let aux = event.target.value.split('.');
            if (aux[1].length > 2) {
              // Reemplazar los dígitos después del punto que están en la posición 3 en adelante
              aux[1] = aux[1].substring(0, 2); // Solo mantén los primeros 2 dígitos después del punto
              valueInput = aux.join('.'); // Vuelve a unir los componentes en una cadena
            }
            if (aux.length > 2) {
              this.showRestrictions(patterns.decimal.msg);
            } else {
              this.resetRestrictions();
            }
          } else {
            valueInput += '.00';
          }
          break;
        case this.modelModifiers?.money:
          valueInput = valueInput.replace(patterns.money.regex, '');
          if (valueInput.includes('$')) {
            valueInput = valueInput.split('.')[0];
            valueInput = valueInput.replace(/[$.,]/g, '');
          }
          valueInput = this.$filters['formatAmount'](valueInput);

          break;
        case this.modelModifiers?.time:
          valueInput = valueInput.replace(patterns.time.regex, '');
          if (valueInput.length == 1) valueInput += '0:00:00';

          validateTime = DateTime.fromFormat(valueInput, 'HH:mm:ss');

          if (validateTime.isValid && valueInput.split(':')[0] != '24') {
            // El rango de horas es correcto
            this.resetRestrictions();

            enteredTime = valueInput;
            startTime = this.startHour ? this.startHour : null;

            if (startTime && enteredTime) {
              this.validateTimeRange(startTime, enteredTime);
            }
          } else {
            this.showRestrictions('El rango de horas es incorrecto');
          }

          break;
        case this.modelModifiers?.timens:
          valueInput = valueInput.replace(patterns.timens.regex, '');
          if (valueInput.length == 1) valueInput += '0:00';

          validateTime = DateTime.fromFormat(valueInput, 'HH:mm');
          if (validateTime.isValid && valueInput.split(':')[0] != '24') {
            this.resetRestrictions();

            enteredTime = valueInput;
            startTime = this.startHour ? this.startHour : null;

            if (startTime && enteredTime) {
              this.validateTimeRange(startTime, enteredTime);
            }
          } else {
            this.showRestrictions('El rango de horas es incorrecto');
          }

          break;
        default:
          if (this.modelModifiers) {
            Object.keys(this.modelModifiers).find((key) => {
              if (key == 'email') {
                return false;
              }
              valueInput = valueInput.replace(patterns[key].regex, '');
            });
            break;
          }
      }

      const el = event.target;
      const sel = event.target.selectionStart;

      /**
       * Se emite al actualizar el valor del componente.
       *
       * @event update:modelValue
       * @type {Event}
       */
      await this.$emit('update:modelValue', valueInput);
      if (sel) {
        this.$nextTick(() => {
          el.setSelectionRange(sel, sel);
        });
      }

      this.cleaningInput = true;
      this.cleaningInput = false;

      this.validate();
    },
    validateTimeRange(startTime, enteredTime) {
      const isInvalid =
        (this.greaterThanTime && enteredTime < startTime) ||
        (!this.greaterThanTime && enteredTime <= startTime);

      if (isInvalid) {
        const message = this.greaterThanTime
          ? 'La hora final tiene que ser mayor o igual que la hora de inicio'
          : 'La hora final tiene que ser mayor a la hora de inicio';

        this.showRestrictions(message);
      } else {
        this.resetRestrictions();
      }

      return !isInvalid;
    },
    startHourIsChanged(newVal) {
      const modifier = Object.keys(this.modelModifiers)[0];

      if (this.modelValue && ['time', 'timens'].includes(modifier)) {
        const format = modifier === 'time' ? 'HH:mm:ss' : 'HH:mm';
        const validateTime = DateTime.fromFormat(this.modelValue, format);

        if (validateTime.isValid && this.modelValue.split(':')[0] !== '24') {
          this.resetRestrictions();

          const enteredTime = this.modelValue;
          const startTime = newVal;

          if (startTime && enteredTime) {
            this.validateTimeRange(startTime, enteredTime);
          }
        } else {
          this.showRestrictions('El rango de horas es incorrecto');
        }
      }
    },

    // Limpiar el contenido del componente EInput, emitir evento clean y resetear variables de error de regla
    async clean() {
      this.reset();
      /**
       * Se emite al limpiar el contenido del componente.
       *
       * @event clean
       * @type {Event}
       */
      this.$emit('clean');
    },

    // Resetear mensaje de error y estilos de la regla, llamar a resetear mensaje y estilos de restricción
    reset() {
      this.messageRule = false;
      this.errorRules = false;
      this.resetRestrictions();
    },

    // Resetear el mensaje y estilos de restricción
    resetRestrictions() {
      this.messageRestrictions = false;
      this.errorRestriction = false;
    },

    // Mostrar el mensaje de restricción y habilitar estilos de error
    showRestrictions(message) {
      this.messageRestrictions = message;
      this.errorRestriction = true;
    },

    // Mostrar el valor del componente que ingresa el usuario cuando el tipo es "password"
    showPassword() {
      this.showPass = !this.showPass;
      this.inputType == 'password' ? (this.inputType = 'text') : (this.inputType = 'password');
    },

    // Validar las reglas del componente
    validate() {
      if (this.required || this.modelValue) {
        let rules = this.finalRules;
        let i = 0;
        let result = true;

        while (i < rules.length && result === true) {
          result = rules[i](this.modelValue);
          i++;
        }
        if (result !== true || this.errorRestriction == true) {
          // No es valido
          if (typeof result != 'boolean') {
            this.messageRule = result;
          }
          this.errorRules = true;

          return false;
        } else {
          // Es valido
          this.messageRule = false;
          this.errorRules = false;

          return true;
        }
      } else {
        // No es requerido, entonces resetea restricción
        this.reset();
        return true;
      }
    },
    //Evitar espacios en blanco en la vista del login
    preventSpace(event) {
      if (this.noWhiteSpace && event.key === ' ') {
        event.preventDefault();
      }
    },
  },
  watch: {
    startHour(newVal) {
      this.startHourIsChanged(newVal);
    },
  },
};
</script>

<docs lang="md">
## Examples

EInput con label personalizado

```jsx
<EInput v-model="acount" label="Hola soy un input" />
```

### Modificadores

El componente EInput ofrece modificadores que afectan el valor ingresado por el usuario. A continuación, se muestran los modificadores disponibles:

- email: El valor ingresado debe ser en formato de correo.
- decimal: El valor ingresado debe ser en formato decimal.
- integer: El valor ingresado debe ser en formato entero.
- alfa: El valor ingresado debe ser alfabético.
- alfaNum: El valor ingresado debe ser alfanumérico.
- alfaNumChar: El valor ingresado debe ser alfanumérico con caracteres.
- alfaNumSpace: El valor ingresado debe contener solo letras, números y espacios.
- nomenclaturaDoc: La nomenclatura contiene caracteres inválidos.
- pathDocs: La ruta contiene caracteres inválidos.
- money: El valor ingresado debe ser en formato de cantidad monetaria.
- time: El campo debe contener el formato HH:MM:SS
- timens: El campo debe contener el formato HH:MM

Para usarlos, los asignamos al v-model que conectamos con nuestro componente desde la vista. Por ejemplo:

- Al usar el modificador "decimal", el componente EInput solo aceptará valores que sean números considerados decimales, es decir, números y el punto decimal.

```jsx
<EInput v-model.decimal="decimal" label="Soy input con modelModifier 'decimal'" />
```
</docs>

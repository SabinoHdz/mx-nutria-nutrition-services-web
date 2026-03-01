transforming (149) node_modules/pdfmake/build/pdfmake.jssrc/utils/pdf/pdfMakeClient.ts:35:6 - error TS2352: Conversion of type 'typeof import("pdfmake/build/vfs_fonts")' to type 'Record<string, string>' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
  Property 'vfs' is incompatible with index signature.
    Type 'Record<string, string>' is not comparable to type 'string'.

35     (vfsModule as Record<string, string>);
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

src/views/DiagnosticsView.vue:16:19 - error TS2322: Type 'string | null' is not assignable to type 'string | number | (string | number)[] | undefined'.
  Type 'null' is not assignable to type 'string | number | (string | number)[] | undefined'.

16                   v-model="formData.gender"
                     ~~~~~~~

  src/components/ui/select/select.ts:48:3
    48   modelValue?: string | number | Array<string | number>;
         ~~~~~~~~~~
    The expected type comes from property 'modelValue' which is declared here on type '{ readonly modelValue?: string | number | (string | number)[] | undefined; readonly options: SelectOption[]; readonly label: string; readonly placeholder?: string | undefined; ... 31 more ...; readonly "onUpdate:modelValue"?: ((value: string | ... 1 more ... | (string | number)[]) => any) | undefined; } & VNodeProps...'

src/views/DiagnosticsView.vue:18:20 - error TS2322: Type 'ValueLabel[]' is not assignable to type 'SelectOption[]'.
  Type 'ValueLabel' is not assignable to type 'SelectOption'.
    Index signature for type 'string' is missing in type 'ValueLabel'.

18                   :options="genderOptions"
                      ~~~~~~~

  src/components/ui/select/select.ts:49:3
    49   options: SelectOption[];
         ~~~~~~~
    The expected type comes from property 'options' which is declared here on type '{ readonly modelValue?: string | number | (string | number)[] | undefined; readonly options: SelectOption[]; readonly label: string; readonly placeholder?: string | undefined; ... 31 more ...; readonly "onUpdate:modelValue"?: ((value: string | ... 1 more ... | (string | number)[]) => any) | undefined; } & VNodeProps...'

src/views/DiagnosticsView.vue:26:19 - error TS2322: Type 'number | null' is not assignable to type 'string | number | undefined'.
  Type 'null' is not assignable to type 'string | number | undefined'.

26                   v-model="formData.age"
                     ~~~~~~~

  src/components/ui/input/input.ts:54:3
    54   modelValue?: string | number;
         ~~~~~~~~~~
    The expected type comes from property 'modelValue' which is declared here on type '{ readonly modelValue?: string | number | undefined; readonly type?: "number" | "search" | "phone" | "text" | "url" | "email" | "decimal" | "password" | "alphabetic" | "alphanumeric" | "alphanumeric-special" | undefined; ... 38 more ...; readonly "onUpdate:modelValue"?: ((value: string | number) => any) | undefined;...'

src/views/DiagnosticsView.vue:39:19 - error TS2322: Type 'number | null' is not assignable to type 'string | number | undefined'.
  Type 'null' is not assignable to type 'string | number | undefined'.

39                   v-model="formData.weight"
                     ~~~~~~~

  src/components/ui/input/input.ts:54:3
    54   modelValue?: string | number;
         ~~~~~~~~~~
    The expected type comes from property 'modelValue' which is declared here on type '{ readonly modelValue?: string | number | undefined; readonly type?: "number" | "search" | "phone" | "text" | "url" | "email" | "decimal" | "password" | "alphabetic" | "alphanumeric" | "alphanumeric-special" | undefined; ... 38 more ...; readonly "onUpdate:modelValue"?: ((value: string | number) => any) | undefined;...'

src/views/DiagnosticsView.vue:53:19 - error TS2322: Type 'number | null' is not assignable to type 'string | number | undefined'.
  Type 'null' is not assignable to type 'string | number | undefined'.

53                   v-model="formData.height"
                     ~~~~~~~

  src/components/ui/input/input.ts:54:3
    54   modelValue?: string | number;
         ~~~~~~~~~~
    The expected type comes from property 'modelValue' which is declared here on type '{ readonly modelValue?: string | number | undefined; readonly type?: "number" | "search" | "phone" | "text" | "url" | "email" | "decimal" | "password" | "alphabetic" | "alphanumeric" | "alphanumeric-special" | undefined; ... 38 more ...; readonly "onUpdate:modelValue"?: ((value: string | number) => any) | undefined;...'

src/views/DiagnosticsView.vue:423:20 - error TS2345: Argument of type '{ modelValue: string | number | undefined; placeholder: string; suffix: string; disabled: true; class: string; type: "text"; size: "sm"; }' is not assignable to parameter of type '{ readonly modelValue?: string | number | undefined; readonly type?: "number" | "search" | "phone" | "text" | "url" | "email" | "decimal" | "password" | "alphabetic" | "alphanumeric" | "alphanumeric-special" | undefined; ... 38 more ...; readonly "onUpdate:modelValue"?: ((value: string | number) => any) | undefined;...'.
  Property 'label' is missing in type '{ modelValue: string | number | undefined; placeholder: string; suffix: string; disabled: true; class: string; type: "text"; size: "sm"; }' but required in type '{ readonly modelValue?: string | number | undefined; readonly type?: "number" | "search" | "phone" | "text" | "url" | "email" | "decimal" | "password" | "alphabetic" | "alphanumeric" | "alphanumeric-special" | undefined; ... 38 more ...; readonly "onUpdate:modelValue"?: ((value: string | number) => any) | undefined; }'.

423                   <VInput
                       ~~~~~~

  src/components/ui/input/input.ts:56:3
    56   label: string;
         ~~~~~
    'label' is declared here.

src/views/DiagnosticsView.vue:449:20 - error TS2345: Argument of type '{ modelValue: string | number | undefined; max: number; min: number; integerDigits: number; decimalPlaces: number; placeholder: string; disabled: boolean; suffix: string; class: string; type: "decimal"; size: "sm"; }' is not assignable to parameter of type '{ readonly modelValue?: string | number | undefined; readonly type?: "number" | "search" | "phone" | "text" | "url" | "email" | "decimal" | "password" | "alphabetic" | "alphanumeric" | "alphanumeric-special" | undefined; ... 38 more ...; readonly "onUpdate:modelValue"?: ((value: string | number) => any) | undefined;...'.
  Property 'label' is missing in type '{ modelValue: string | number | undefined; max: number; min: number; integerDigits: number; decimalPlaces: number; placeholder: string; disabled: boolean; suffix: string; class: string; type: "decimal"; size: "sm"; }' but required in type '{ readonly modelValue?: string | number | undefined; readonly type?: "number" | "search" | "phone" | "text" | "url" | "email" | "decimal" | "password" | "alphabetic" | "alphanumeric" | "alphanumeric-special" | undefined; ... 38 more ...; readonly "onUpdate:modelValue"?: ((value: string | number) => any) | undefined; }'.

449                   <VInput
                       ~~~~~~

  src/components/ui/input/input.ts:56:3
    56   label: string;
         ~~~~~
    'label' is declared here.

src/views/DiagnosticsView.vue:479:20 - error TS2345: Argument of type '{ modelValue: string | number | undefined; max: number; min: number; integerDigits: number; decimalPlaces: number; placeholder: string; disabled: boolean; suffix: string; class: string; type: "decimal"; size: "sm"; }' is not assignable to parameter of type '{ readonly modelValue?: string | number | undefined; readonly type?: "number" | "search" | "phone" | "text" | "url" | "email" | "decimal" | "password" | "alphabetic" | "alphanumeric" | "alphanumeric-special" | undefined; ... 38 more ...; readonly "onUpdate:modelValue"?: ((value: string | number) => any) | undefined;...'.
  Property 'label' is missing in type '{ modelValue: string | number | undefined; max: number; min: number; integerDigits: number; decimalPlaces: number; placeholder: string; disabled: boolean; suffix: string; class: string; type: "decimal"; size: "sm"; }' but required in type '{ readonly modelValue?: string | number | undefined; readonly type?: "number" | "search" | "phone" | "text" | "url" | "email" | "decimal" | "password" | "alphabetic" | "alphanumeric" | "alphanumeric-special" | undefined; ... 38 more ...; readonly "onUpdate:modelValue"?: ((value: string | number) => any) | undefined; }'.

479                   <VInput
                       ~~~~~~

  src/components/ui/input/input.ts:56:3
    56   label: string;
         ~~~~~
    'label' is declared here.

src/views/DiagnosticsView.vue:694:20 - error TS2345: Argument of type '{ modelValue: string | number | undefined; max: number; min: number; maxlength: number; placeholder: string; suffix: string; class: string; type: "number"; size: "sm"; onInput: any; }' is not assignable to parameter of type '{ readonly modelValue?: string | number | undefined; readonly type?: "number" | "search" | "phone" | "text" | "url" | "email" | "decimal" | "password" | "alphabetic" | "alphanumeric" | "alphanumeric-special" | undefined; ... 38 more ...; readonly "onUpdate:modelValue"?: ((value: string | number) => any) | undefined;...'.
  Property 'label' is missing in type '{ modelValue: string | number | undefined; max: number; min: number; maxlength: number; placeholder: string; suffix: string; class: string; type: "number"; size: "sm"; onInput: any; }' but required in type '{ readonly modelValue?: string | number | undefined; readonly type?: "number" | "search" | "phone" | "text" | "url" | "email" | "decimal" | "password" | "alphabetic" | "alphanumeric" | "alphanumeric-special" | undefined; ... 38 more ...; readonly "onUpdate:modelValue"?: ((value: string | number) => any) | undefined; }'.

694                   <VInput
                       ~~~~~~

  src/components/ui/input/input.ts:56:3
    56   label: string;
         ~~~~~
    'label' is declared here.

src/views/DiagnosticsView.vue:725:20 - error TS2345: Argument of type '{ modelValue: string | number | undefined; max: number; min: number; maxlength: number; placeholder: string; suffix: string; class: string; type: "number"; size: "sm"; onInput: any; }' is not assignable to parameter of type '{ readonly modelValue?: string | number | undefined; readonly type?: "number" | "search" | "phone" | "text" | "url" | "email" | "decimal" | "password" | "alphabetic" | "alphanumeric" | "alphanumeric-special" | undefined; ... 38 more ...; readonly "onUpdate:modelValue"?: ((value: string | number) => any) | undefined;...'.
  Property 'label' is missing in type '{ modelValue: string | number | undefined; max: number; min: number; maxlength: number; placeholder: string; suffix: string; class: string; type: "number"; size: "sm"; onInput: any; }' but required in type '{ readonly modelValue?: string | number | undefined; readonly type?: "number" | "search" | "phone" | "text" | "url" | "email" | "decimal" | "password" | "alphabetic" | "alphanumeric" | "alphanumeric-special" | undefined; ... 38 more ...; readonly "onUpdate:modelValue"?: ((value: string | number) => any) | undefined; }'.

725                   <VInput
                       ~~~~~~

  src/components/ui/input/input.ts:56:3
    56   label: string;
         ~~~~~
    'label' is declared here.

src/views/DiagnosticsView.vue:758:22 - error TS2345: Argument of type '{ modelValue: string | number | undefined; max: number; min: number; integerDigits: number; decimalPlaces: number; placeholder: string; suffix: string; class: string; type: "decimal"; size: "sm"; onInput: any; }' is not assignable to parameter of type '{ readonly modelValue?: string | number | undefined; readonly type?: "number" | "search" | "phone" | "text" | "url" | "email" | "decimal" | "password" | "alphabetic" | "alphanumeric" | "alphanumeric-special" | undefined; ... 38 more ...; readonly "onUpdate:modelValue"?: ((value: string | number) => any) | undefined;...'.
  Property 'label' is missing in type '{ modelValue: string | number | undefined; max: number; min: number; integerDigits: number; decimalPlaces: number; placeholder: string; suffix: string; class: string; type: "decimal"; size: "sm"; onInput: any; }' but required in type '{ readonly modelValue?: string | number | undefined; readonly type?: "number" | "search" | "phone" | "text" | "url" | "email" | "decimal" | "password" | "alphabetic" | "alphanumeric" | "alphanumeric-special" | undefined; ... 38 more ...; readonly "onUpdate:modelValue"?: ((value: string | number) => any) | undefined; }'.

758                     <VInput
                         ~~~~~~

  src/components/ui/input/input.ts:56:3
    56   label: string;
         ~~~~~
    'label' is declared here.

src/views/DiagnosticsView.vue:802:22 - error TS2345: Argument of type '{ modelValue: string | number | undefined; max: number; min: number; maxlength: number; placeholder: string; suffix: string; class: string; type: "number"; size: "sm"; onInput: any; }' is not assignable to parameter of type '{ readonly modelValue?: string | number | undefined; readonly type?: "number" | "search" | "phone" | "text" | "url" | "email" | "decimal" | "password" | "alphabetic" | "alphanumeric" | "alphanumeric-special" | undefined; ... 38 more ...; readonly "onUpdate:modelValue"?: ((value: string | number) => any) | undefined;...'.
  Property 'label' is missing in type '{ modelValue: string | number | undefined; max: number; min: number; maxlength: number; placeholder: string; suffix: string; class: string; type: "number"; size: "sm"; onInput: any; }' but required in type '{ readonly modelValue?: string | number | undefined; readonly type?: "number" | "search" | "phone" | "text" | "url" | "email" | "decimal" | "password" | "alphabetic" | "alphanumeric" | "alphanumeric-special" | undefined; ... 38 more ...; readonly "onUpdate:modelValue"?: ((value: string | number) => any) | undefined; }'.

802                     <VInput
                         ~~~~~~

  src/components/ui/input/input.ts:56:3
    56   label: string;
         ~~~~~
    'label' is declared here.

src/views/DiagnosticsView.vue:845:22 - error TS2345: Argument of type '{ modelValue: string | number | undefined; max: number; min: number; maxlength: number; placeholder: string; suffix: string; class: string; type: "number"; size: "sm"; }' is not assignable to parameter of type '{ readonly modelValue?: string | number | undefined; readonly type?: "number" | "search" | "phone" | "text" | "url" | "email" | "decimal" | "password" | "alphabetic" | "alphanumeric" | "alphanumeric-special" | undefined; ... 38 more ...; readonly "onUpdate:modelValue"?: ((value: string | number) => any) | undefined;...'.
  Property 'label' is missing in type '{ modelValue: string | number | undefined; max: number; min: number; maxlength: number; placeholder: string; suffix: string; class: string; type: "number"; size: "sm"; }' but required in type '{ readonly modelValue?: string | number | undefined; readonly type?: "number" | "search" | "phone" | "text" | "url" | "email" | "decimal" | "password" | "alphabetic" | "alphanumeric" | "alphanumeric-special" | undefined; ... 38 more ...; readonly "onUpdate:modelValue"?: ((value: string | number) => any) | undefined; }'.

845                     <VInput
                         ~~~~~~

  src/components/ui/input/input.ts:56:3
    56   label: string;
         ~~~~~
    'label' is declared here.


Found 14 errors.

ERROR: "type-check" exited with 2.
sabinohdz@Mac-mini-de-Sabino mx-nutria-nutrition-services-web % 
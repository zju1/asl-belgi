/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  InputAdornment,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import { forwardRef } from "react";
import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import { IMaskInput } from "react-imask";

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

export type FormFieldProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<TextFieldProps, "value" | "defaultValue">;

const TextMaskCustom = forwardRef<HTMLElement, CustomProps>(
  function TextMaskCustom(props, ref: any) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="(00) 000-00-00"
        definitions={{
          "#": /[1-9]/,
        }}
        inputRef={ref}
        onAccept={(value: any) =>
          onChange({ target: { name: props.name, value } })
        }
        overwrite
      />
    );
  }
);
function PhoneField<T extends FieldValues>({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  onChange,
  ...props
}: FormFieldProps<T>) {
  const {
    field: { value, onChange: onFieldChange, ...fieldProps },
    fieldState,
  } = useController({
    name,
    control,
    defaultValue,
    rules,
    shouldUnregister,
  });

  const { t } = useTranslation();

  return (
    <TextField
      {...props}
      InputProps={{
        ...props.InputProps,
        disableUnderline: true,
        inputComponent: TextMaskCustom as any,
        startAdornment: (
          <InputAdornment position="start">
            <Typography fontSize="16px">+998</Typography>
          </InputAdornment>
        ),
      }}
      className="phoneField"
      {...fieldProps}
      onBlur={() => {
        fieldProps.onBlur();
      }}
      type="tel"
      value={value}
      defaultValue={defaultValue}
      error={!!fieldState.error}
      helperText={
        fieldState.error
          ? t(fieldState.error.message as string)
          : props.helperText
      }
      InputLabelProps={{
        shrink: true,
      }}
      onChange={(event) => {
        onFieldChange(event);
        onChange?.(event);
      }}
    />
  );
}

export { PhoneField };

import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";
import { TextField, TextFieldProps } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export type FormFieldProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<TextFieldProps, "value" | "defaultValue"> & {
    centered?: boolean;
    asButton?: boolean;
  };

export function FormField<T extends FieldValues>({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  onChange,
  centered,
  asButton,
  ...props
}: FormFieldProps<T>) {
  const [focused, setFocused] = useState(false);
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
      {...fieldProps}
      {...props}
      onFocus={(event) => {
        setFocused(true);
        props.onFocus?.(event);
      }}
      onBlur={() => {
        setFocused(false);
        fieldProps.onBlur();
      }}
      value={value}
      error={!!fieldState.error}
      defaultValue={defaultValue}
      helperText={
        fieldState.error
          ? t(fieldState.error.message as string)
          : props.helperText
      }
      InputLabelProps={{
        shrink:
          focused ||
          props.InputLabelProps?.shrink ||
          typeof value === "number" ||
          !!value,
      }}
      inputProps={{
        style: {
          textAlign: centered ? "center" : "left",
          cursor: asButton ? "pointer" : "text",
        },
      }}
      InputProps={{
        ...props.InputProps,
        disableUnderline: true,
      }}
      onChange={(event) => {
        onFieldChange(event);
        onChange?.(event);
      }}
    />
  );
}

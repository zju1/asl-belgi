/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { MuiChipsInput, MuiChipsInputProps } from "mui-chips-input";

export type FormFieldProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<MuiChipsInputProps, "value" | "defaultValue"> & {
    centered?: boolean;
    asButton?: boolean;
  };

export function FormChips<T extends FieldValues>({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  onChange,
  centered,
  asButton,
  clearInputOnBlur,
  addOnBlur,
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
    <MuiChipsInput
      {...fieldProps}
      {...props}
      onFocus={(event: any) => {
        setFocused(true);
        props.onFocus?.(event);
      }}
      onBlur={() => {
        setFocused(false);
        fieldProps.onBlur();
      }}
      value={value}
      error={!!fieldState.error}
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
      sx={{
        ".MuiInputBase-root": {
          paddingTop: "22px",
        },
      }}
      onChange={(event: any) => {
        onFieldChange(event);
        onChange?.(event);
      }}
    />
  );
}

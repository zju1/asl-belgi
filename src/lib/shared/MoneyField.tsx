/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextField, TextFieldProps } from "@mui/material";
import { forwardRef, useState } from "react";
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

export const MoneyMask = forwardRef<HTMLElement, CustomProps>(
  function MoneyMask(props, ref: any) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="num"
        unmask="typed"
        blocks={{
          num: {
            mask: Number,
            thousandsSeparator: ",",
            normalizeZeros: false,
            radix: ".",
            mapToRadix: ["."],
          },
        }}
        inputRef={ref}
        onAccept={(value: any) =>
          onChange({ target: { name: props.name, value } })
        }
        onFocus={(event) => event.target.select()}
        overwrite
      />
    );
  }
);
export function MoneyField<T extends FieldValues>({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  onChange,
  ...props
}: FormFieldProps<T>) {
  const { t } = useTranslation();
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
  const [focused, setFocused] = useState(false);
  return (
    <TextField
      {...props}
      InputProps={{
        ...props.InputProps,
        inputComponent: MoneyMask as any,
        disableUnderline: true,
      }}
      {...fieldProps}
      onFocusCapture={() => {
        setFocused(true);
      }}
      onBlur={() => {
        fieldProps.onBlur();
        setFocused(false);
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
        shrink: focused || !!value,
      }}
      onChange={(event) => {
        onFieldChange(event);
        onChange?.(event);
      }}
    />
  );
}

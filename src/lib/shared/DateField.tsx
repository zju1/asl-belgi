/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";
import { TextField, TextFieldProps } from "@mui/material";
import { useState } from "react";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import { useTranslation } from "react-i18next";

export type FormFieldProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<TextFieldProps, "value" | "defaultValue">;

export function DateField<T extends FieldValues>({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  onChange,
  ...props
}: FormFieldProps<T>) {
  const { t } = useTranslation();
  const [focused, setFocused] = useState(false);
  const [open, setOpen] = useState(false);
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

  return (
    <>
      <TextField
        {...fieldProps}
        {...props}
        onClick={() => setOpen(true)}
        onFocus={(event) => {
          setFocused(true);
          props.onFocus?.(event);
        }}
        onBlur={() => {
          setFocused(false);
          fieldProps.onBlur();
        }}
        value={value && moment(value).format("D MMM, YYYY")}
        error={!!fieldState.error}
        defaultValue={defaultValue}
        helperText={
          fieldState.error
            ? t(fieldState.error.message as string)
            : props.helperText
        }
        InputProps={{
          disableUnderline: true,
          readOnly: true,
        }}
        InputLabelProps={{
          shrink:
            focused ||
            props.InputLabelProps?.shrink ||
            typeof value === "number" ||
            !!value,
        }}
        onChange={(event) => {
          onFieldChange(event);
          onChange?.(event);
        }}
      />
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <MobileDatePicker
          open={open}
          value={moment(value)}
          slots={{ field: () => <></> }}
          onClose={() => setOpen(false)}
          onAccept={(newValue) => {
            newValue &&
              onFieldChange?.({
                target: { name, value: moment(newValue).toISOString(true) },
                value: moment(newValue).toISOString(true),
              } as any);
          }}
        />
      </LocalizationProvider>
    </>
  );
}

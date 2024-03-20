import {
  Button,
  InputAdornment,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { useState } from "react";
import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";
import { useTranslation } from "react-i18next";

export type PasswordFieldProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<TextFieldProps, "value" | "defaultValue">;

export function PasswordField<T extends FieldValues>({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  onChange,
  ...props
}: PasswordFieldProps<T>) {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
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

  return (
    <TextField
      variant="standard"
      value={value}
      error={!!fieldState.error}
      helperText={
        fieldState.error
          ? t(fieldState.error.message as string)
          : (props.helperText as string)
      }
      onChange={(event) => {
        onFieldChange(event);
        onChange?.(event);
      }}
      {...props}
      {...fieldProps}
      {...props}
      onFocus={() => setFocused(true)}
      onBlur={() => {
        setFocused(false);
        fieldProps.onBlur();
      }}
      InputLabelProps={{
        shrink: focused || props.InputLabelProps?.shrink || !!value,
      }}
      type={visible ? props.type : "password"}
      InputProps={{
        ...props.InputProps,
        disableUnderline: true,
        endAdornment: (
          <InputAdornment position="end">
            <Button
              size="small"
              variant="text"
              onClick={() => setVisible(!visible)}
            >
              {visible ? t("hide") : t("show")}
            </Button>
          </InputAdornment>
        ),
      }}
    />
  );
}

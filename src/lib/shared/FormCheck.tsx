import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";
import {
  Checkbox,
  CheckboxProps,
  FormControlLabel,
  FormHelperText,
  Stack,
} from "@mui/material";
import { useTranslation } from "react-i18next";

export type FormCheckProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<CheckboxProps, "value" | "defaultValue"> & {
    label: string;
  };

export function FormCheck<T extends FieldValues>({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  onChange,
  ...props
}: FormCheckProps<T>) {
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
    <Stack>
      <FormControlLabel
        className="form-checkbox-label"
        label={props.label}
        control={
          <Checkbox
            checked={!!value}
            onChange={(_event, checked) => {
              onChange?.(_event, checked);
              onFieldChange({ target: { name, value: checked } });
            }}
            {...fieldProps}
          />
        }
      />
      {!!fieldState.error && (
        <FormHelperText sx={{ ml: 0 }}>
          {t(fieldState.error.message as string)}
        </FormHelperText>
      )}
    </Stack>
  );
}

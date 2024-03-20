/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";
import { TextField, TextFieldProps } from "@mui/material";
import { useMemo, useState } from "react";
import {
  LocalizationProvider,
  MobileDateRangePicker,
} from "@mui/x-date-pickers-pro";
import { AdapterMoment } from "@mui/x-date-pickers-pro/AdapterMoment";
import moment from "moment";
import { useTranslation } from "react-i18next";

export type FormFieldProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<TextFieldProps, "value" | "defaultValue"> & {
    disableFuture?: boolean;
  };

export function DateRangeField<T extends FieldValues>({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  onChange,
  disableFuture,
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

  const shortCutItems: any[] = useMemo(
    () => [
      {
        label: t("today"),
        getValue: () => {
          const value = [moment(), moment()];
          return value;
        },
      },
      {
        label: t("yesterday"),
        getValue: () => {
          const value = [
            moment().subtract(1, "day"),
            moment().subtract(1, "day"),
          ];
          return value;
        },
      },
      {
        label: t("thisWeek"),
        getValue: () => {
          const value = [moment().startOf("week"), moment()];
          return value;
        },
      },
      {
        label: t("lastWeek"),
        getValue: () => {
          return [
            moment().subtract(7, "days").startOf("week"),
            moment().subtract(7, "days").endOf("week"),
          ];
        },
      },
      {
        label: t("lastSevenDays"),
        getValue: () => {
          return [moment().subtract(7, "day"), moment()];
        },
      },
      {
        label: t("thisMonth"),
        getValue: () => {
          return [moment().startOf("month"), moment()];
        },
      },
    ],
    [t]
  );

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
        value={
          value &&
          value.length > 0 &&
          t("fromToDate", {
            from: moment(value[0]).format("D-MMM, YYYY"),
            to: moment(value[1]).format("D-MMM, YYYY"),
          })
        }
        error={!!fieldState.error}
        defaultValue={defaultValue}
        helperText={
          fieldState.error
            ? t(fieldState.error.message as string)
            : props.helperText
        }
        InputProps={{
          disableUnderline: true,
          slotProps: {
            input: {
              readOnly: true,
            },
          },
          ...props.InputProps,
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
        <MobileDateRangePicker
          open={open}
          value={
            value ? [moment(value[0]), moment(value[1])] : [moment(), moment()]
          }
          slotProps={{
            shortcuts: {
              items: shortCutItems,
            },
          }}
          disableFuture={disableFuture}
          slots={{ field: () => <></> }}
          onClose={() => setOpen(false)}
          onAccept={(newValue) => {
            newValue &&
              newValue.length > 0 &&
              onFieldChange?.({
                target: {
                  name,
                  value: [
                    moment(newValue[0]).toISOString(true),
                    newValue[1]
                      ? moment(newValue[1]).toISOString(true)
                      : moment(newValue[0]).endOf("day").toISOString(true),
                  ],
                },
                value: [
                  moment(newValue[0]).toISOString(true),
                  newValue[1]
                    ? moment(newValue[1]).toISOString(true)
                    : moment(newValue[0]).endOf("day").toISOString(true),
                ],
              } as any);
          }}
        />
      </LocalizationProvider>
    </>
  );
}

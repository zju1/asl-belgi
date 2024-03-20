/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";
import {
  Chip,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
  SxProps,
  Theme,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { SearchItem, SearchLoading } from "./shared.style";
import { Check, Search } from "@mui/icons-material";

export type FormSelectProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<SelectProps, "value" | "defaultValue"> & {
    options: { label: string; value: any; extra?: any }[];
  };

export function FormMultiSelect<T extends FieldValues>({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  onChange,
  options,
  maxHeight,
  onSearch,
  loading,
  controlSx,
  ...props
}: FormSelectProps<T> & {
  maxHeight?: string;
  onSearch?: (value: string) => void;
  loading?: boolean;
  controlSx?: SxProps<Theme>;
}) {
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
    <FormControl
      variant={props.variant}
      sx={controlSx}
      error={!!fieldState.error}
    >
      <InputLabel data-usage="select-label">{props.label as string}</InputLabel>
      <Select
        {...props}
        MenuProps={{
          slotProps: { paper: { sx: { maxHeight } } },
          MenuListProps: onSearch
            ? {
                sx: {
                  paddingTop: 0,
                },
              }
            : {},
          ...props.MenuProps,
        }}
        value={value}
        defaultValue={defaultValue}
        error={!!fieldState.error}
        onChange={(event, child) => {
          onFieldChange(event);
          onChange?.(event, child);
        }}
        disableUnderline
        {...fieldProps}
        renderValue={() =>
          value.map((item: any) => (
            <Chip
              key={item}
              label={options.find((opt) => opt.value === item)?.label}
              clickable
              onMouseDown={(event) => event.stopPropagation()}
              onDelete={() =>
                onFieldChange({
                  target: {
                    name,
                    value: value.filter((elem: any) => elem !== item),
                  },
                })
              }
            />
          ))
        }
        sx={{
          ".MuiSelect-multiple": {
            display: "flex",
            flexWrap: "wrap",
            gap: "5px",
          },
        }}
        multiple
      >
        {onSearch && (
          <SearchItem
            onClick={(event) => event.stopPropagation()}
            onKeyDown={(event) => event.stopPropagation()}
          >
            <div
              onClick={(event) => event.stopPropagation()}
              onKeyDown={(event) => event.stopPropagation()}
            >
              <input
                autoFocus
                placeholder={t("search")}
                type="text"
                onClick={(event) => event.stopPropagation()}
                onKeyDown={(event) => event.stopPropagation()}
                onChange={(event) => {
                  onSearch?.(event.target.value);
                }}
              />
              <Search />
            </div>
          </SearchItem>
        )}
        {loading ? (
          <SearchLoading>
            <CircularProgress />
          </SearchLoading>
        ) : (
          options.map((item) => (
            <MenuItem
              id={item.value}
              key={item.value}
              value={item.value}
              data-object={item.extra}
              sx={{ display: "grid", gridTemplateColumns: "1fr auto" }}
            >
              {item.label}
              {value?.find((elem: any) => elem === item.value) && (
                <Check color="primary" fontSize="small" />
              )}
            </MenuItem>
          ))
        )}
      </Select>
      {!!fieldState.error && (
        <FormHelperText sx={{ ml: 0 }}>
          {t(fieldState.error.message as string)}
        </FormHelperText>
      )}
    </FormControl>
  );
}

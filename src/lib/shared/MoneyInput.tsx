/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextField, TextFieldProps } from "@mui/material";
import { forwardRef } from "react";
import { IMaskInput } from "react-imask";

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

export const MoneyMaskInput = forwardRef<HTMLElement, CustomProps>(
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
            padFractionalZeros: true,
          },
        }}
        onFocus={(event) => event.target.select()}
        inputRef={ref}
        onAccept={(value: any) =>
          onChange({ target: { name: props.name, value } })
        }
        overwrite
      />
    );
  }
);
export function MoneyInput(props: TextFieldProps) {
  return (
    <TextField
      {...props}
      InputProps={{
        ...props.InputProps,
        inputComponent: MoneyMaskInput as any,
        disableUnderline: true,
      }}
      type="tel"
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
}

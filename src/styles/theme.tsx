/* eslint-disable @typescript-eslint/no-explicit-any */
import { alpha, createTheme } from "@mui/material";

export const appTheme = createTheme({
  palette: {
    primary: {
      main: "#4169E1",
      "50": "#e7eafb",
      "100": "#c2caf4",
      "200": "#98a7ed",
      "300": "#6a85e6",
      "400": "#4169e1",
      "500": "#004eda",
      "600": "#0046cf",
      "700": "#003bc3",
      "800": "#0031b8",
      "900": "#001da1",
      contrastText: "#fff",
      dark: "#001da1",
      light: "#dbe1fc",
    },
    background: {
      default: "#f1f1f1",
      paper: "#ffffff",
    },
  },
  typography: {
    allVariants: {
      fontFamily: "Inter, sans-serif",
    },
  },
  shape: {
    borderRadius: 5,
  },
  components: {
    MuiTab: {
      styleOverrides: {
        root: () => ({
          zIndex: 1,
          borderRadius: "5px",
          fontSize: "11px",
          fontWeight: "700",
          textTransform: "none",
          transition: ".2s",

          "&.Mui-selected": {
            pointerEvents: "none",
          },
        }),
      },
    },
    MuiFormControl: {
      variants: [
        // Override filled input
        {
          props: {
            variant: "filled",
          },
          style: ({ theme }) => ({
            font: "500 14px Inter, sans-serif",
            ".MuiInputBase-root": {
              borderRadius: "5px",
              background: alpha(theme.palette.grey[50], 0.8),
              border: `1px solid ${theme.palette.grey[300]}`,
              "&:hover": {
                background: theme.palette.grey[50],
                border: `1px solid ${theme.palette.grey[500]}`,
              },
              "&.Mui-focused": {
                border: `1px solid ${theme.palette.primary.main}`,
              },
              button: {
                font: "500 12px Inter, sans-serif",
                color: theme.palette.grey[700],
              },
              "&.Mui-error": {
                background: alpha(theme.palette.error.light, 0.05),
                border: `1px solid ${theme.palette.error.main}`,
                button: {
                  color: theme.palette.error.main,
                },
              },
            },
            ".MuiFormHelperText-root": {
              font: "400 12px Inter, sans-serif",
              marginLeft: 0,
            },
          }),
        },
        // Override standard input
        {
          props: {
            variant: "standard",
          },
          style: ({ theme }) => ({
            ".MuiInputBase-root": {
              borderRadius: "0 !important",
              border: "none",
              borderBottom: `1px solid ${theme.palette.grey[400]}`,
              "&:hover,&.Mui-focused": {
                borderBottom: `1px solid ${theme.palette.grey[600]}`,
              },
              button: {
                font: "500 12px Inter, sans-serif",
                color: theme.palette.grey[700],
              },
              "&.Mui-error": {
                borderBottom: `1px solid ${theme.palette.error.main}`,
                button: {
                  color: theme.palette.error.main,
                },
              },
            },
            ".MuiFormHelperText-root": {
              font: "400 12px Inter, sans-serif",
              marginLeft: 0,
            },
          }),
        },
        // Filled input sizes
        {
          props: {
            size: "medium",
            variant: "filled",
          },
          style: ({ theme }) => ({
            ".MuiSelect-select,input": {
              padding: "18px 12px 4px 12px",
              font: "500 14px Inter, sans-serif",
            },
            "&.phoneField input": {
              padding: "18px 32px 4px 0px",
            },
            ".MuiInputAdornment-root p": {
              font: "500 14px Inter, sans-serif",
              color: theme.palette.grey[900],
            },
            label: {
              transition: ".05s",
              transform: "translate(12px,14px)",
              font: "500 14px Inter, sans-serif",
              ["&[data-shrink=true]"]: {
                transform: "translate(12px, 4px) scale(0.75)",
                color: theme.palette.grey[800],
              },
            },
            [":has(input[type=color]) label"]: {
              transform: "translate(12px, 4px) scale(0.75)",
              color: theme.palette.grey[800],
            },
          }),
        },
        {
          props: {
            size: "small",
            variant: "filled",
          },
          style: ({ theme }) => ({
            ".MuiSelect-select, input": {
              padding: "16px 32px 2px 10px !important",
              font: "500 14px Inter, sans-serif",
            },
            "&.phoneField input": {
              padding: "16px 32px 2px 10px !important",
            },
            ".MuiInputAdornment-root p": {
              font: "500 14px Inter, sans-serif",
              color: theme.palette.grey[900],
            },
            label: {
              transition: ".05s",
              transform: "translate(14px,10px)",
              font: "500 14px Inter, sans-serif",
              ["&[data-shrink=true]"]: {
                transform: "translate(12px, 2px) scale(0.75)",
                color: theme.palette.grey[800],
              },
            },
          }),
        },
        {
          props: {
            size: "mini",
            variant: "filled",
          },
          style: ({ theme }) => ({
            ".MuiSelect-select, input": {
              padding: "2px 4px 2px 4px !important",
              font: "500 14px Inter, sans-serif",
            },
            "&.phoneField input": {
              padding: "2px 4px 2px 4px !important",
            },
            ".MuiInputAdornment-root p": {
              font: "500 10px Inter, sans-serif",
              color: theme.palette.grey[900],
            },
            ".MuiFormHelperText-root": {
              font: "600 8px Inter, sans-serif",
              whiteSpace: "initial",
            },
            label: {
              transition: ".05s",
              transform: "translate(14px,10px)",
              font: "500 12px Inter, sans-serif",
              ["&[data-shrink=true]"]: {
                transform: "translate(12px, 2px) scale(0.75)",
                color: theme.palette.grey[800],
              },
            },
          }),
        },

        // Standard input sizes
        {
          props: {
            size: "medium",
            variant: "standard",
          },
          style: ({ theme }) => ({
            ".MuiSelect-select,input": {
              font: "500 14px Inter, sans-serif",
            },
            ".MuiInputAdornment-root p": {
              font: "500 14px Inter, sans-serif",
              color: theme.palette.grey[900],
            },
            label: {
              transition: ".05s",
              transform: "translate(0,14px)",
              font: "500 14px Inter, sans-serif",
              ["&[data-shrink=true]"]: {
                transform: "translate(0, 4px) scale(0.75)",
                color: theme.palette.grey[800],
              },
            },
          }),
        },
        {
          props: {
            size: "small",
            variant: "standard",
          },
          style: ({ theme }) => ({
            ".MuiSelect-select, input": {
              font: "500 14px Inter, sans-serif",
            },
            ".MuiInputAdornment-root p": {
              font: "500 14px Inter, sans-serif",
              color: theme.palette.grey[900],
            },
            label: {
              transition: ".05s",
              transform: "translate(0,10px)",
              font: "500 14px Inter, sans-serif",
              ["&[data-shrink=true]"]: {
                transform: "translate(0, 2px) scale(0.75)",
                color: theme.palette.grey[800],
              },
            },
          }),
        },
      ],
    },

    MuiFormControlLabel: {
      variants: [
        {
          props: {
            className: "form-checkbox-label",
          },
          style: {
            display: "flex",
            alignItems: "center",
            gap: "8px",
            margin: 0,
            ".MuiTypography-root": {
              font: "500 12px Inter, sans-serif",
              userSelect: "none",
            },
            ".MuiButtonBase-root": {
              padding: 0,
            },
          },
        },
      ],
    },

    MuiSwitch: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          padding: 0,
          height: "fit-content",
          width: "fit-content",
        },
        track: {
          background: "#F1F1F1",
          height: "28px",
          width: "46px",
          borderRadius: "100px",
          border: "1px solid #E3E3E3",
          opacity: "1 !important",
        },
        thumb: {
          width: "24px",
          height: "24px",
          bottom: 0,
          background: "#ffffff",
        },
        switchBase: ({ theme }) => ({
          padding: 0,
          margin: 0,
          transform: "translate(2px,2px)",
          "&.Mui-checked": {
            transform: "translate(20px,2px) !important",
          },
          "&.Mui-checked+.MuiSwitch-track": {
            background: `${theme.palette.primary.main}`,
            border: `1px solid ${theme.palette.primary.dark}`,
          },
        }),
      },
    },

    MuiDialogContent: {
      styleOverrides: {
        root: () => ({
          "&.form": {
            paddingTop: "16px !important",
          },
        }),
      },
    },

    MuiDialog: {
      variants: [
        {
          props: {
            className: "confirmDialog",
          },
          style: {
            ".MuiPaper-root": {
              borderRadius: "5px",
              boxShadow: "none",
              maxWidth: "350px",
            },
          },
        },
      ],
    },

    MuiMenu: {
      styleOverrides: {
        paper: ({ theme }) => ({
          marginTop: "5px",
          boxShadow: theme.shadows[5],
          borderRadius: "5px",
        }),
      },
    },

    MuiMenuItem: {
      styleOverrides: {
        root: () => ({
          font: "500 14px Inter, sans-serif",
          minHeight: 0,
        }),
        selected: ({ theme }) => ({
          background: theme.palette.grey[100],
        }),
      },
      defaultProps: {
        disableRipple: true,
      },
    },

    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },

    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        text: {
          background: "transparent !important",
        },
        root: {
          textTransform: "none",
          fontWeight: "600",
          lineHeight: "18px",
          ":active": {
            transform: "scale(0.98)",
          },
        },
      },
      variants: [
        {
          props: {
            variant: "soft",
            color: "primary",
          },
          style: ({ theme }) => ({
            background: theme.palette.primary.light,
            color: theme.palette.primary.main,
            ":active": {
              background: theme.palette.primary.light,
              filter: "brightness(95%)",
            },
            ":hover": {
              background: theme.palette.primary.light,
            },
          }),
        },
        {
          props: {
            color: "primary",
          },
          style: ({ theme }) => ({
            background: theme.palette.primary.main,
            ":active": {
              background: theme.palette.primary.main,
              filter: "brightness(95%)",
            },
            ":hover": {
              background: theme.palette.primary.main,
            },
          }),
        },
        {
          props: {
            variant: "soft",
            color: "error",
          },
          style: ({ theme }) => ({
            background: alpha(theme.palette.error.light, 0.2),
            color: theme.palette.error.main,
            ":hover": {
              background: alpha(theme.palette.error.light, 0.2),
              color: theme.palette.error.main,
            },
            ":active": {
              background: alpha(theme.palette.error.light, 0.4),
              filter: "brightness(115%)",
            },
          }),
        },
        {
          props: {
            size: "small",
          },
          style: {
            height: "30px",
            fontSize: "12px",
            fontWeight: "700",
          },
        },
      ],
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          background: theme.palette.background.paper,
          font: "500 16px Inter, sans-serif",
          height: "50px",
          fieldset: {
            border: `1px solid ${theme.palette.grey[300]}`,
            outline: "none !important",
          },
          "&:hover": {
            fieldset: {
              border: `1px solid ${theme.palette.grey[400]} !important`,
            },
          },
          "&.Mui-focused": {
            fieldset: {
              border: `1px solid ${theme.palette.primary.main} !important`,
            },
          },
        }),
        sizeSmall: {
          font: "500 14px Inter, sans-serif",
          height: "35px",
        },
        notchedOutline: ({ theme }) => ({
          border: `1px solid ${theme.palette.grey[300]}`,
        }),
      },
    },

    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          padding: "12px 24px",
          font: "500 14px 'Roboto', sans-serif",
        },
      },
    },
  },
});

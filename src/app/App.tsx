import { Suspense } from "react";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store.config";
import { PersistGate } from "redux-persist/integration/react";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes/routes";
import { appTheme } from "../styles/theme";
import { ThemeProvider } from "@mui/material";
import { Toaster } from "sonner";
import { ConfirmProvider } from "material-ui-confirm";
import { useTranslation } from "react-i18next";

export function App() {
  const { t } = useTranslation();

  return (
    <Suspense>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Toaster theme="light" richColors />
          <ThemeProvider theme={appTheme}>
            <ConfirmProvider
              defaultOptions={{
                cancellationText: t("cancel"),
                dialogProps: {
                  className: "confirmDialog",
                },
              }}
            >
              <RouterProvider router={routes} />
            </ConfirmProvider>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </Suspense>
  );
}

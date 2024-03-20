import { useEffect } from "react";
import { AuthGuard } from "../app/guard/AuthGuard";
import { useAppSelector } from "../app/store/store.config";
import { useTranslation } from "react-i18next";
import { PageWrapper } from "./layout.style";
import { Outlet } from "react-router-dom";

export function Layout() {
  const lang = useAppSelector((store) => store.ui.lang);
  const {
    i18n: { changeLanguage },
  } = useTranslation();

  useEffect(() => {
    changeLanguage(lang);
  }, [changeLanguage, lang]);

  return (
    <AuthGuard>
      <PageWrapper>
        <Outlet />
      </PageWrapper>
    </AuthGuard>
  );
}

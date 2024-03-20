/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  SigninBottom,
  SigninContent,
  SigninForm,
  SigninTop,
  SigninWrapper,
} from "./signin.style";
import { useForm } from "react-hook-form";
import { Stack } from "@mui/system";
import { FormField } from "../../lib/shared/FormField";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../app/store/store.config";
import { useState } from "react";
import { UserSigninData } from "../../interfaces/auth.interface";
import { useSigninMutation } from "../../app/store/services/auth.service";
import { setUser } from "../../app/store/slices/auth.slice";
import { Link, Navigate } from "react-router-dom";
import { PasswordField } from "../../lib/shared/PasswordField";
import { Button } from "@mui/material";
import { toast } from "sonner";
import { LanguageOutlined } from "@mui/icons-material";
import { LanguageSheet } from "../../lib/widgets/LanguageSheet";

export function SigninPage() {
  const user = useAppSelector((store) => store.auth.user);
  const { control, handleSubmit } = useForm<UserSigninData>();
  const dispatch = useAppDispatch();
  const [signin, { isLoading }] = useSigninMutation();

  const {
    t,
    i18n: { language },
  } = useTranslation();
  const [open, setOpen] = useState(false);

  const handleSignin = async (data: UserSigninData) => {
    try {
      const response = await signin(data).unwrap();
      dispatch(setUser(response.data));
      toast.success(t("welcoming"), {
        position: "top-center",
        duration: 2000,
      });
    } catch (error) {
      toast.error(t("wrongCredentials"));
    }
  };

  const onSubmit = handleSubmit(handleSignin as any);

  return user ? (
    <Navigate to="/" />
  ) : (
    <>
      <SigninWrapper>
        <SigninContent>
          <SigninTop>
            <h1>Asl Belgi</h1>
            <Button
              onClick={() => setOpen(true)}
              startIcon={<LanguageOutlined />}
              variant="contained"
              size="small"
            >
              {t(language)}
            </Button>
          </SigninTop>
          <SigninBottom>
            <SigninForm>
              <div className="signinTop">
                <h3> {t("signin-title")}</h3>
                <p> {t("signin-subtitle")}</p>
              </div>
              <form onSubmit={onSubmit}>
                <Stack gap="12px">
                  <FormField
                    label={t("username")}
                    name="login"
                    variant="standard"
                    control={control}
                    rules={{
                      required: { value: true, message: t("required") },
                    }}
                  />
                  <PasswordField
                    label={t("password")}
                    name="password"
                    variant="standard"
                    control={control}
                    rules={{
                      required: { value: true, message: t("required") },
                    }}
                  />
                </Stack>
                <Stack gap="12px">
                  <Button
                    disabled={isLoading}
                    type="submit"
                    variant="contained"
                    size="large"
                    sx={{ height: "45px" }}
                  >
                    {t(isLoading ? "wait" : "signin")}
                  </Button>
                  <Link
                    to="/signup"
                    style={{
                      font: "500 14px Inter, sans-serif",
                      textDecoration: "none",
                      textAlign: "right",
                      color: "#000000",
                    }}
                  >
                    {" "}
                    {t("signup-title")}{" "}
                  </Link>
                </Stack>
              </form>
            </SigninForm>
          </SigninBottom>
        </SigninContent>
      </SigninWrapper>
      <LanguageSheet open={open} setOpen={setOpen} />
    </>
  );
}

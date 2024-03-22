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
import { UserSignupData } from "../../interfaces/auth.interface";
import {
  useGetOrgsQuery,
  useSignupMutation,
} from "../../app/store/services/auth.service";
import { setUser } from "../../app/store/slices/auth.slice";
import { Link, Navigate } from "react-router-dom";
import { PasswordField } from "../../lib/shared/PasswordField";
import { Button } from "@mui/material";
import { toast } from "sonner";
import { LanguageOutlined } from "@mui/icons-material";
import { LanguageSheet } from "../../lib/widgets/LanguageSheet";
import { PhoneField } from "../../lib/shared/PhoneField";
import { FormSelect } from "../../lib/shared/FormSelect";

export function SignupPage() {
  const user = useAppSelector((store) => store.auth.user);
  const { control, handleSubmit } = useForm<UserSignupData>();
  const dispatch = useAppDispatch();
  const [signin, { isLoading }] = useSignupMutation();

  const {
    t,
    i18n: { language },
  } = useTranslation();
  const [open, setOpen] = useState(false);
  const { data } = useGetOrgsQuery({});

  const handleSignin = async (data: UserSignupData) => {
    console.log(data);
    try {
      const response = await signin({
        ...data,
        phone: data.phone.replace(/[( )-]/gi, ""),
        organization: Number(data.organization),
      }).unwrap();
      dispatch(setUser(response.data));
      toast.success(t("welcoming"), {
        position: "top-center",
        duration: 2000,
      });
    } catch (error: any) {
      if (error?.data?.message) {
        toast.error(t(error.data.message));
      }
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
                <h3> {t("signup-title")}</h3>
              </div>
              <form onSubmit={onSubmit}>
                <Stack gap="12px">
                  <FormField
                    label={t("firstName")}
                    name="first_name"
                    variant="standard"
                    control={control}
                    rules={{
                      required: { value: true, message: t("required") },
                      minLength: { value: 3, message: t("minLength") },
                    }}
                  />
                  <FormField
                    label={t("lastName")}
                    name="last_name"
                    variant="standard"
                    control={control}
                    rules={{
                      required: { value: true, message: t("required") },
                      minLength: { value: 3, message: t("minLength") },
                    }}
                  />
                  <PhoneField
                    label={t("phone")}
                    name="phone"
                    variant="standard"
                    control={control}
                    rules={{
                      required: { value: true, message: t("required") },
                    }}
                  />
                  <FormSelect
                    label={t("organization")}
                    name="organization"
                    variant="standard"
                    control={control}
                    /* rules={{
                      required: { value: true, message: t("required") },
                    }} */
                    options={(data?.data || []).map((item) => ({
                      label: item.name,
                      value: item.id.toString(),
                    }))}
                  />
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
                    {t(isLoading ? "wait" : "signup-title")}
                  </Button>
                  <Link
                    to="/auth"
                    style={{
                      font: "500 14px Inter, sans-serif",
                      textDecoration: "none",
                      textAlign: "right",
                      color: "#000000",
                    }}
                  >
                    {" "}
                    {t("signin-title")}{" "}
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

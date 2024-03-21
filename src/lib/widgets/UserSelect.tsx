import { Stack } from "@mui/system";
import {
  useGetOrgsQuery,
  useGetUsersByIdQuery,
} from "../../app/store/services/auth.service";
import { useState } from "react";
import { useDebouncedValue } from "../../hooks/useDebouncedValue";
import { FormSelect } from "../shared/FormSelect";
import { useForm } from "react-hook-form";
import { Button, Drawer } from "@mui/material";
import { useTranslation } from "react-i18next";
import { requiredRule } from "../../constants/rules";

export function UserSelect({
  onClose,
  onSelect,
}: {
  onClose: () => void;
  onSelect: (value: string) => void;
}) {
  const [org, setOrg] = useState("");
  const [user, setUser] = useState("");
  const orgKey = useDebouncedValue(org, 300);
  const userKey = useDebouncedValue(user, 300);
  const { t } = useTranslation();

  const { control, handleSubmit, watch } = useForm<{
    org: string;
    user: string;
  }>({ defaultValues: { org: undefined, user: undefined } });

  const { data, isFetching } = useGetOrgsQuery(
    { key: orgKey },
    { refetchOnMountOrArgChange: true }
  );
  const orgId = watch("org");

  const { data: users, isFetching: usersFetching } = useGetUsersByIdQuery(
    {
      org: orgId,
      key: userKey,
    },
    { refetchOnMountOrArgChange: true }
  );

  const onSubmit = handleSubmit((values) => {
    onSelect(values.user);
    onClose();
  });

  return (
    <Drawer
      open
      anchor="top"
      onClose={() => onClose()}
      PaperProps={{
        sx: {
          minHeight: "200px",
          padding: "24px",
          borderRadius: "0 0 12px 12px",
        },
      }}
    >
      <Stack gap="36px">
        <Stack gap="12px">
          <FormSelect
            control={control}
            name="org"
            options={(data?.data || []).map((item) => ({
              value: item.id.toString(),
              label: item.name,
            }))}
            loading={isFetching}
            onSearch={(value) => setOrg(value)}
            rules={{ ...requiredRule }}
            label={t("organization")}
            variant="filled"
          />
          <FormSelect
            control={control}
            name="user"
            onSearch={(value) => setUser(value)}
            options={(users?.data || []).map((item) => ({
              value: item.id.toString(),
              label: item.login,
            }))}
            label={t("user")}
            loading={usersFetching}
            rules={{ ...requiredRule }}
            variant="filled"
          />
        </Stack>
        <Button
          variant="contained"
          size="large"
          sx={{ height: "45px" }}
          onClick={onSubmit}
        >
          {t("save")}
        </Button>
      </Stack>
    </Drawer>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTranslation } from "react-i18next";
import { AppPage } from "../../layout/page-wrapper/PageWrapper";
import {
  Button,
  Fab,
  IconButton,
  InputAdornment,
  LinearProgress,
  OutlinedInput,
  Typography,
} from "@mui/material";
import {
  useAssignMarkMutation,
  useGetAssignedMarksQuery,
} from "../../app/store/services/auth.service";
import { useCallback, useRef, useState } from "react";
import { useDebouncedValue } from "../../hooks/useDebouncedValue";
import { Stack } from "@mui/system";
import { AssignedItem } from "../../lib/widgets/AssignedItem";
import { Close, QrCodeScanner } from "@mui/icons-material";
import { BottomSheet } from "react-spring-bottom-sheet";
import { useAppDispatch, useAppSelector } from "../../app/store/store.config";
import { useSymbologyScanner } from "@use-symbology-scanner/react";
import { DataScanner } from "./ScannerPage";
import { useConfirm } from "material-ui-confirm";
import { resetAuth } from "../../app/store/slices/auth.slice";
import { toast } from "sonner";
import { UserSelect } from "../../lib/widgets/UserSelect";

export function Homepage() {
  const [search, setSearch] = useState("");
  const key = useDebouncedValue(search, 300);
  const [open, setOpen] = useState(false);
  const user = useAppSelector((store) => store.auth.user);
  const { t } = useTranslation();
  const [mark, setMark] = useState<string | null>(null);
  const [canScan, setCanScan] = useState(false);
  const scannerRef = useRef<DataScanner>(null);
  const confirm = useConfirm();
  const dispatch = useAppDispatch();
  const { data } = useGetAssignedMarksQuery(
    { key },
    { refetchOnMountOrArgChange: true }
  );
  const [assign, { isLoading }] = useAssignMarkMutation();

  const handleAssign = useCallback(
    async (data: { user: number; mark: string }) => {
      assign(data)
        .unwrap()
        .then((response: any) => {
          if (response?.code === 0) {
            toast.success(t("successfullyAssigned"));
          }
        })
        .catch((error: any) => {
          if (error?.data?.code === 50031) {
            toast.error(t("markAlreadyAssigned"));
          }
          if (error?.data?.code === 50036) {
            toast.error(t("invalidMark"));
          }
          if (error?.data?.code === 50037) {
            toast.error(t("markDisabled"));
          }
        });
    },
    [assign, t]
  );

  useSymbologyScanner(console.log, {
    enabled: true,
  });

  const logout = () => {
    setOpen(false);
    confirm({
      title: t("warning"),
      description: t("logoutWarning"),
    }).then(() => {
      dispatch(resetAuth());
    });
  };

  return (
    <AppPage
      title={t("home")}
      right={
        <Button onClick={() => setOpen(true)} size="small">
          {t("info")}
        </Button>
      }
    >
      {isLoading && <LinearProgress />}
      <Stack p="12px" gap="12px">
        <OutlinedInput
          placeholder={t("search")}
          onChange={(event) => setSearch(event.target.value)}
          value={search}
          endAdornment={
            search.length > 0 && (
              <InputAdornment position="end">
                <IconButton onClick={() => setSearch("")} size="small">
                  <Close />
                </IconButton>
              </InputAdornment>
            )
          }
        />
        {data?.data.map((item) => (
          <AssignedItem {...item} key={item.id} />
        ))}
      </Stack>
      {!open && (
        <Fab
          sx={{
            position: "fixed",
            bottom: "12px",
            left: "50%",
            transform: "translateX(-50%)",
          }}
          size="large"
          color="primary"
          onClick={() => {
            setCanScan(true);
            setTimeout(() => {
              scannerRef.current?.startScanning();
            }, 300);
          }}
        >
          <QrCodeScanner />
        </Fab>
      )}
      <BottomSheet
        open={open}
        onDismiss={() => setOpen(false)}
        style={{ zIndex: "1060 !important" }}
      >
        <Stack p="12px" gap="12px">
          <Stack>
            <Typography sx={{ font: "600 14px Inter, sans-serif" }}>
              {t("firstName")}
            </Typography>
            <Typography
              sx={{ font: "400 14px Inter, sans-serif", marginTop: "2px" }}
            >
              {user?.first_name}
            </Typography>
          </Stack>
          <Stack>
            <Typography sx={{ font: "600 14px Inter, sans-serif" }}>
              {t("lastName")}
            </Typography>
            <Typography
              sx={{ font: "400 14px Inter, sans-serif", marginTop: "2px" }}
            >
              {user?.last_name}
            </Typography>
          </Stack>
          <Stack>
            <Typography sx={{ font: "600 14px Inter, sans-serif" }}>
              {t("phone")}
            </Typography>
            <Typography
              sx={{ font: "400 14px Inter, sans-serif", marginTop: "2px" }}
            >
              {user?.phone}
            </Typography>
          </Stack>
          <Stack>
            <Typography sx={{ font: "600 14px Inter, sans-serif" }}>
              {t("login")}
            </Typography>
            <Typography
              sx={{ font: "400 14px Inter, sans-serif", marginTop: "2px" }}
            >
              {user?.login}
            </Typography>
          </Stack>
          <Stack>
            <Typography sx={{ font: "600 14px Inter, sans-serif" }}>
              {t("organization")}
            </Typography>
            <Typography
              sx={{ font: "400 14px Inter, sans-serif", marginTop: "2px" }}
            >
              {user?.organization}
            </Typography>
          </Stack>
          <Stack>
            <Typography sx={{ font: "600 14px Inter, sans-serif" }}>
              {t("user_id")}
            </Typography>
            <Typography
              sx={{ font: "400 14px Inter, sans-serif", marginTop: "2px" }}
            >
              {user?.user_id}
            </Typography>
          </Stack>
          <Button
            sx={{ height: "45px" }}
            variant="contained"
            color="error"
            size="large"
            onClick={logout}
          >
            {t("logout")}
          </Button>
        </Stack>
      </BottomSheet>
      {canScan && (
        <DataScanner
          ref={scannerRef}
          onDetect={(code) => {
            console.log(code);
            setCanScan(false);
            if (user) {
              if (user.is_root) {
                setMark(code);
              } else {
                handleAssign({
                  user: user.id,
                  mark: code,
                });
              }
            }
          }}
          onClose={() => {
            setCanScan(false);
          }}
        />
      )}
      {mark && (
        <UserSelect
          onClose={() => {
            setMark(null);
          }}
          onSelect={(user) => {
            handleAssign({ user: Number(user), mark });
            setMark(null);
          }}
        />
      )}
    </AppPage>
  );
}

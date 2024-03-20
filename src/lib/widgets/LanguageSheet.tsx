/* eslint-disable @typescript-eslint/no-explicit-any */

import { Stack } from "@mui/system";
import { useTranslation } from "react-i18next";
import { BottomSheet } from "react-spring-bottom-sheet";
import { languageButtons } from "../../constants/langauges";
import { useAppDispatch } from "../../app/store/store.config";
import { setLanguage } from "../../app/store/slices/ui.slice";
import { ListItem } from "../shared/list-item/ListItem";
import { RadioButtonChecked, RadioButtonUnchecked } from "@mui/icons-material";

export function LanguageSheet({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
}) {
  const {
    i18n: { language, changeLanguage },
  } = useTranslation();
  const dispatch = useAppDispatch();

  return (
    <BottomSheet
      open={open}
      expandOnContentDrag
      skipInitialTransition
      onDismiss={() => setOpen(false)}
    >
      <Stack>
        {languageButtons.map((item) => (
          <ListItem
            key={item.value}
            label={item.label}
            onClick={() => {
              dispatch(setLanguage(item.value as any));
              changeLanguage(item.value);
              setOpen(false);
            }}
            icon={
              language === item.value ? (
                <RadioButtonChecked color="primary" />
              ) : (
                <RadioButtonUnchecked />
              )
            }
          />
        ))}
      </Stack>
    </BottomSheet>
  );
}

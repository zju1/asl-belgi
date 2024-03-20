/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, PropsWithChildren } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { IconButton, Stack } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { CWTitle, CWWRapper, PageContent } from "./page-wrapper.style";

export interface CommonWrapperProps {
  onBack?: (navigate: NavigateFunction) => void;
  title?: string;
  right?: ReactNode;
  bg?: "default" | "paper";
}

export function AppPage(props: PropsWithChildren<CommonWrapperProps>) {
  const navigate = useNavigate();

  return (
    <Stack>
      {props.title && (
        <CWWRapper>
          {props.onBack ? (
            <IconButton onClick={() => props.onBack?.(navigate)}>
              <ArrowBack />
            </IconButton>
          ) : (
            <span></span>
          )}
          <CWTitle> {props.title} </CWTitle>
          {props.right || <span></span>}
        </CWWRapper>
      )}
      <PageContent
        sx={(theme) => ({
          background: theme.palette.background[props.bg || "default"],
        })}
      >
        {props.children}
      </PageContent>
    </Stack>
  );
}

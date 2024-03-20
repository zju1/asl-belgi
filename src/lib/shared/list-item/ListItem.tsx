import { ReactNode } from "react";
import { LIContent, LIWrapper } from "./list-item.style";
import { useNavigate } from "react-router-dom";
import { Stack } from "@mui/material";

export interface ListItemProps {
  icon?: ReactNode;
  node?: ReactNode;
  label: string;
  subTitle?: string;
  right?: ReactNode;
  onClick?: () => void;
  href?: string;
  centered?: boolean;
  minimal?: boolean;
}

export function ListItem(props: ListItemProps) {
  const navigate = useNavigate();

  return (
    <LIWrapper
      onClick={() => (props.href ? navigate(props.href) : props.onClick?.())}
      sx={{ padding: props.minimal ? "12px 0" : "16px" }}
    >
      <LIContent
        className={props.node ? "withNode" : ""}
        style={{
          gridTemplateColumns:
            !props.icon && !props.node
              ? "1fr"
              : props.node
              ? "auto 1fr"
              : "30px 1fr",
        }}
      >
        {props.icon ? <span className="icon">{props.icon}</span> : props.node}
        <Stack display="grid">
          <span
            className="title"
            style={props.centered ? { textAlign: "center" } : {}}
          >
            {props.label}
          </span>
          {props.subTitle && (
            <span className="subTitle"> {props.subTitle} </span>
          )}
        </Stack>
      </LIContent>
      {props.right}
    </LIWrapper>
  );
}

import { PropsWithChildren } from "react";
import { createPortal } from "react-dom";

export function SeparateWindow(props: PropsWithChildren) {
  return createPortal(props.children, document.body);
}

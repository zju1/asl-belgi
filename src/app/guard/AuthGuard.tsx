import { PropsWithChildren } from "react";
import { useAppSelector } from "../store/store.config";
import { Navigate } from "react-router-dom";

export function AuthGuard(props: PropsWithChildren) {
  const user = useAppSelector((store) => store.auth.user);
  return user ? props.children : <Navigate to="/auth" />;
}

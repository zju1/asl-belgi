import { useTranslation } from "react-i18next";
import { CodeResponse } from "../../interfaces/auth.interface";
import { AIWrapper } from "./styles";
import moment from "moment";

export function AssignedItem(props: CodeResponse) {
  const { t } = useTranslation();
  return (
    <AIWrapper>
      <div className="lbPair">
        <h5> {t("assignedBy")} </h5>
        <p> {props.assigned_by} </p>
      </div>
      <div className="lbPair">
        <h5> {t("assignedAt")} </h5>
        <p> {moment(props.assigned_at).format("D-MMM, YYYY, HH:mm")} </p>
      </div>
      <div className="lbPair">
        <h5> {t("item")} </h5>
        <p> {props.item} </p>
      </div>
      <div className="lbPair">
        <h5> {t("packedAt")} </h5>
        <p> {moment(props.packed_at).format("D-MMM, YYYY, HH:mm")} </p>
      </div>
      <div className="lbPair">
        <h5> {t("mark")} </h5>
        <p> {props.mark} </p>
      </div>
    </AIWrapper>
  );
}

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import React from "react";
import SatisfactionForm from "./SatisfactionForm";

export default function SatisfactionModal(props) {
  const { survey, setSurvey, data } = props;
  return (
    <React.Fragment>
      <Dialog
        maxWidth={"md"}
        open={survey}
        onClose={() => setSurvey(false)}
        aria-labelledby="dialog-title"
      >
        <DialogTitle id="dialog-title">
          Formulario de Satisfacción - {data.nombres_usuario}{" "}
          {data.apellidos_usuario}
        </DialogTitle>
        <DialogContent>
          <SatisfactionForm data={data} />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

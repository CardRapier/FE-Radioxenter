import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import React from "react";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ReceiptConfirm(props) {
  const { modalState, setModalState, handleProcess } = props;
  const [motive, setMotive] = React.useState("");
  return (
    <React.Fragment>
      <Dialog
        open={modalState}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {`¿Está seguro que quiere crear una nota crédito?`}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Motivo"
            multiline
            fullWidth
            value={motive}
            onChange={(e) => setMotive(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleProcess(motive);
              setModalState(false);
            }}
            color="primary"
          >
            Si
          </Button>
          <Button onClick={() => setModalState(false)} color="primary">
            No
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

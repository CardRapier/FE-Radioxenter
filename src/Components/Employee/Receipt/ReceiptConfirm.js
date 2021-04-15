import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import React from "react";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ReceiptConfirm(props) {
  const { modalState, setModalState, handleProcess } = props;

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
        <DialogActions>
          <Button
            onClick={() => {
              handleProcess();
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

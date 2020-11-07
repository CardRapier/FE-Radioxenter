import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default function BackDropLoading(props) {
  const classes = useStyles();
  const { isSubmitting } = props;
  return (
    <Backdrop className={classes.backdrop} open={isSubmitting}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

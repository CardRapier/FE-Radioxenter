import React, { useEffect, useState } from "react";

import BackDropLoading from "../../BackDropLoading";
import Grid from "@material-ui/core/Grid";
import ReceiptTable from "./ReceiptTable";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { api_receipts } from "../../../api_app";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  titlebutton: {
    padding: theme.spacing(4, 0, 2),
  },
  tableMargin: {
    marginTop: theme.spacing(2),
  },
  margintop: {
    marginTop: theme.spacing(2),
  },
  marginBottom: {
    marginBottom: 2,
  },
}));

export default function Receipts() {
  const classes = useStyles();
  const [receipts, setReceipts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    api_receipts.get("/").then((res) => {
      setReceipts(res.data.respuesta);
      setLoaded(true);
    });
    return () => {};
  }, []);
  console.log(receipts);
  return (
    <React.Fragment>
      <Grid container direction={"column"}>
        <Grid container item className={classes.titlebutton}>
          <Grid item xs={3}></Grid>
          <Grid item xs={4}>
            <Typography
              component="h1"
              variant="h5"
              align="left"
              color="textPrimary"
              gutterBottom
            >
              Facturas
            </Typography>
          </Grid>
        </Grid>

        <Grid
          container
          item
          spacing={4}
          className={classes.marginBottom}
          justify="flex-start"
          alignItems="center"
        >
          <Grid item xs={3}></Grid>
          <Grid item xs={5}>
            <TextField
              id="documento"
              label="Documento"
              variant="outlined"
              size="small"
            />
          </Grid>
        </Grid>
        <Grid container item spacing={4} justify="center" alignItems="center">
          <Grid item className={classes.margintop}>
            <Grid item xs>
              <ReceiptTable receipts={receipts} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <BackDropLoading isSubmitting={!loaded} />
    </React.Fragment>
  );
}

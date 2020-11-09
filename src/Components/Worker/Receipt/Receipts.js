import Grid from "@material-ui/core/Grid";
import React from "react";
import ReceiptTable from "./ReceiptTable";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  title: {
    padding: theme.spacing(4, 0, 2),
  },
  tableMargin: {
    marginTop: theme.spacing(2),
  },
}));

export default function Receipts() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Grid container direction={"column"}>
        <Grid container item className={classes.title} spacing={4}>
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

        <Grid container item spacing={4}>
          <Grid item xs={2}></Grid>
          <Grid item xs={5}>
            <TextField id="documento" label="Documento" variant="outlined" />
          </Grid>
        </Grid>
        <Grid container item spacing={4} justify="center" alignItems="center">
          <Grid item className={classes.tableMargin}>
            <ReceiptTable />
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

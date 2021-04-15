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
  const [query, setQuery] = React.useState({ document: "", date: "" });
  const [receipts, setReceipts] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const fetch_receipts = async () => {
    api_receipts
      .get("/")
      .then((res) => {
        setReceipts(res.data.respuesta);
        setLoaded(true);
      })
      .catch((error) => {
        setLoaded(true);
      });
  };

  useEffect(() => {
    fetch_receipts();
    return () => {};
  }, []);

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
          <Grid item xs={2}></Grid>
          <Grid item xs={5}>
            <TextField
              id="documento"
              label="Documento"
              variant="outlined"
              size="small"
              type="search"
              value={query.document}
              onChange={(event) =>
                setQuery((query) => ({
                  ...query,
                  document: event.target.value,
                }))
              }
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              id="date"
              label="Fecha"
              variant="outlined"
              size="small"
              type="search"
              value={query.date}
              onChange={(event) =>
                setQuery((query) => ({
                  ...query,
                  date: event.target.value,
                }))
              }
            />
          </Grid>
        </Grid>
        <Grid container item spacing={4} justify="center" alignItems="center">
          <Grid item className={classes.margintop}>
            <Grid item xs>
              <ReceiptTable
                receipts={receipts}
                setLoaded={setLoaded}
                filter={query}
                fetch_receipts={fetch_receipts}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <BackDropLoading isSubmitting={!loaded} />
    </React.Fragment>
  );
}

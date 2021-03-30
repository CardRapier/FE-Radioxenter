import BackDropLoading from "../../BackDropLoading";
import Grid from "@material-ui/core/Grid";
import ProcessTable from "./ProcessTable";
import React from "react";
import { TextField } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { api_doctors_entities } from "../../../api_app";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  title: {
    padding: theme.spacing(4, 0, 2),
  },
  margintop: {
    marginTop: theme.spacing(2),
  },
  marginBottom: {
    marginBottom: 2,
  },
}));

export default function Process(props) {
  const {
    rows,
    handleCompleteProcess,
    handleChangeServiceStatus,
    handleChangeShipmentStatus,
  } = props;
  const [query, setQuery] = React.useState({ query: "" });
  const classes = useStyles();
  const [loaded, setLoaded] = React.useState(false);
  const [doctorEntities, setDoctorEntities] = React.useState([]);
  React.useEffect(() => {
    api_doctors_entities
      .get("/")
      .then((res) => {
        setDoctorEntities(res.data.respuesta);
        setLoaded(true);
      })
      .catch((error) => setLoaded(true));
  }, []);

  return (
    <React.Fragment>
      <Grid container direction={"column"}>
        <Grid container item className={classes.title}>
          <Grid item xs={3}></Grid>
          <Grid item xs={5}>
            <Typography
              component="h1"
              variant="h5"
              align="left"
              color="textPrimary"
              gutterBottom
            >
              Procesos
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
              type="search"
              value={query.query}
              onChange={(event, index, value) =>
                setQuery({ query: event.target.value })
              }
            />
          </Grid>
        </Grid>
        <Grid container item spacing={4} justify="center" alignItems="center">
          <Grid item className={classes.margintop}>
            <Grid item xs>
              <ProcessTable
                doctorEntities={doctorEntities}
                rows={rows}
                handleCompleteProcess={handleCompleteProcess}
                handleChangeServiceStatus={handleChangeServiceStatus}
                handleChangeShipmentStatus={handleChangeShipmentStatus}
                filter={{ query: query.query }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <BackDropLoading isSubmitting={!loaded} />
    </React.Fragment>
  );
}

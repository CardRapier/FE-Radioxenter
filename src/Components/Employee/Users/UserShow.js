import {
  api_cities,
  api_departments,
  api_sex,
  api_type_document,
  api_type_shipment,
  api_users,
} from "../../../api_app";

import BackDropLoading from "../../BackDropLoading";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import React from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import UserDatatable from "./UserDatatable";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  titlebutton: {
    padding: theme.spacing(4, 0, 2),
  },
  margintop: {
    marginTop: theme.spacing(2),
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  marginBottom: {
    marginBottom: 2,
  },
}));
//TODO: Filter users by document and name
export default function UserShow() {
  const classes = useStyles();
  const [query, setQuery] = React.useState({ query: "" });
  const [loaded, setLoaded] = React.useState(false);
  const [data, setData] = React.useState({});
  const [users, setUsers] = React.useState([]);
  React.useEffect(() => {
    api_users
      .get("/")
      .then((res) => {
        setUsers(res.data.respuesta);
      })
      .catch((error) => {
        setLoaded(true);
      });
    api_type_document.get("/").then((res) => {
      setData((prevState) => ({
        data: {
          ...prevState.data,
          type_document: res.data.respuesta,
        },
      }));
    });
    api_cities.get("/").then((res) => {
      setData((prevState) => ({
        data: {
          ...prevState.data,
          cities: res.data.respuesta,
        },
      }));
    });
    api_sex.get("/").then((res) => {
      setData((prevState) => ({
        data: {
          ...prevState.data,
          sex: res.data.respuesta,
        },
      }));
    });

    api_type_shipment.get("/").then((res) => {
      setData((prevState) => ({
        data: {
          ...prevState.data,
          type_shipment: res.data.respuesta,
        },
      }));
    });

    api_departments.get("/").then((res) => {
      setData((prevState) => ({
        data: {
          ...prevState.data,
          departments: res.data.respuesta,
        },
      }));
      setLoaded(true);
    });
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
              {`Usuarios`}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Button
              component={Link}
              to={{
                pathname: "/Empleado/CrearUsuario",
                fetched_data: data,
                receipt: true,
              }}
              variant="contained"
              color="primary"
              size="small"
            >
              Crear
            </Button>
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
              <UserDatatable
                users={users}
                data={data}
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

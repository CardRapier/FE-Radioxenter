import {
  Button,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";

import DataTableUser from './DataTableUser'
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  titlebutton: {
    padding: theme.spacing(4, 0, 2),
  },
  margintop4: {
    marginTop: theme.spacing(2),
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

export default function ShowUsers() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Grid container direction={"column"}>
        <Grid container item className={classes.titlebutton} spacing={4}>
          <Grid item>
            <Typography
              component="h1"
              variant="h4"
              align="left"
              color="textPrimary"
              gutterBottom
            >
              Usuarios
            </Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary">
              Crear
            </Button>
          </Grid>
        </Grid>

        <Grid container item spacing={4}>
          <Grid item xs={6}>
            <TextField id="documento" label="Documento" variant="outlined" />
          </Grid>
          <Grid item xs={6}>
            <TextField id="nombre" label="Nombre" variant="outlined" />
          </Grid>
        </Grid>
        <Grid container item spacing={4}> 
          <Grid item className={classes.margintop4}>
            <DataTableUser />
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

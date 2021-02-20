import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },

  buttonUnselected: {
    backgroundColor: "#f39921",
  },

  buttonSelected: {
    backgroundColor: "#2196f3",
  },
}));

export default function ProccessData(props) {
  const classes = useStyles();
  const { services, document, changeServices, changeShipments } = props;
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid xs={6}>
          <Typography>Servicios</Typography>
          <Divider />
          <List component="div" aria-label="secondary mailbox folders">
            {services.map((service, index) => (
              <ListItem
                button
                disabled={service.completado}
                classes={{
                  button: classes.buttonUnselected,
                  disabled: classes.buttonSelected,
                }}
                onClick={() =>
                  changeServices({
                    documento_usuario: document,
                    cod_servicio: service.cod_servicio,
                  })
                }
              >
                <ListItemText primary={service.nombre_servicio} />
              </ListItem>
            ))}
          </List>
        </Grid>

        <Grid xs={6}>
          <Typography>Entregas</Typography>
          <Divider />
          <List component="div" aria-label="secondary mailbox folders">
            {services.map((service, index) => (
              <ListItem
                button
                disabled={service.entregado}
                classes={{
                  button: classes.buttonUnselected,
                  disabled: classes.buttonSelected,
                }}
                onClick={() =>
                  changeShipments({
                    documento_usuario: document,
                    cod_servicio: service.cod_servicio,
                  })
                }
              >
                <ListItemText primary={service.nombre_servicio} />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </div>
  );
}

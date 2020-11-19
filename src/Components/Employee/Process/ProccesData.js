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
    backgroundColor: "#e91e63",
  },

  buttonSelected: {
    backgroundColor: "#2196f3",
  },
}));

export default function ProccessData(props) {
  const classes = useStyles();
  const { services } = props;
  const [servicesState, setServicesState] = React.useState(
    services.map(() => false)
  );

  const [deliveriesState, setDeliveriesState] = React.useState(
    services.map(() => false)
  );

  const changeStateService = (index) => {
    let servicess = [...servicesState];
    let service = { ...servicess[index] };
    service = true;
    servicess[index] = service;
    setServicesState(servicess);
  };

  const changeStateDeliveries = (index) => {
    let deliveriesAux = [...deliveriesState];
    let delivery = { ...deliveriesAux[index] };
    delivery = true;
    deliveriesAux[index] = delivery;
    setDeliveriesState(deliveriesAux);
  };

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
                disabled={servicesState[index]}
                classes={{
                  button: classes.buttonUnselected,
                  disabled: classes.buttonSelected,
                }}
                onClick={() => changeStateService(index)}
              >
                <ListItemText primary={service} />
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
                disabled={deliveriesState[index]}
                classes={{
                  button: classes.buttonUnselected,
                  disabled: classes.buttonSelected,
                }}
                onClick={() => changeStateDeliveries(index)}
              >
                <ListItemText primary={service} />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </div>
  );
}

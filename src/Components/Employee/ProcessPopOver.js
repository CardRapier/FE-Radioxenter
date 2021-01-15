import { Divider, List, ListItem, ListItemText } from "@material-ui/core";

import { Link } from "react-router-dom";
import Popover from "@material-ui/core/Popover";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

function ProcessPopOver(props) {
  const classes = useStyles();
  const { id, open, anchorEl, onClose } = props;
  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <List className={classes.root}>
        <ListItem alignItems="flex-start">
          <ListItemText
            primary="Santiago Guzman - 1019147849"
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  <Link to="/Empleado/Procesos">Radiografias en proceso</Link>
                </Typography>
                {" - Facturacion pendiente"}
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemText
            primary="Fabian Alfonso - Documento "
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  <Link to="/Empleado/Procesos">En espera para atencion</Link>
                </Typography>
                {" - Facturacion realizada"}
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemText
            primary="Leonardo Alegre - Documento"
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  <Link to="/Empleado/Consentimiento">
                    Firma contenitimiento
                  </Link>
                </Typography>
                {" — Facturacion pendiente"}
              </React.Fragment>
            }
          />
        </ListItem>
      </List>
    </Popover>
  );
}

export default ProcessPopOver;

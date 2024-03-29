import Divider from "@material-ui/core/Divider";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Popover from "@material-ui/core/Popover";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "48ch",
    backgroundColor: theme.palette.background.paper,
  },
  typography: {
    padding: theme.spacing(2),
  },
  inline: {
    display: "inline",
  },
}));

function ProcessPopOver(props) {
  const classes = useStyles();
  const { id, open, anchorEl, onClose, rows } = props;

  const renderLink = (actual, row) => {
    let text = `Proceso actual: ${actual}`;
    let tutor = row.data.tutor === true ? row.tutor : undefined;
    if (actual === "Transaccion") {
      return (
        <Link
          to={{
            pathname: "/Empleado/CrearFactura",
            data: row.data,
            tutor: tutor,
          }}
        >
          {text}
        </Link>
      );
    } else if (actual === "Tutor") {
      return (
        <Link
          to={{
            pathname: "/Empleado/Tutor",
            data: row.data,
          }}
        >
          {text}
        </Link>
      );
    } else if (actual === "Consentimiento") {
      return (
        <Link
          to={{
            pathname: "/Empleado/Consentimiento",
            data: row.data,
            tutor: tutor,
            transaction: row.transaccion,
          }}
        >
          {text}
        </Link>
      );
    } else {
      return <Link to="/Empleado/Procesos">{text}</Link>;
    }
  };

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
      <List
        style={{ maxHeight: "100%", overflow: "auto" }}
        className={classes.root}
      >
        {rows.length === 0 ? (
          <ListItem alignItems="flex-start">
            <ListItemText primary={`No hay procesos actualmente.`} />
          </ListItem>
        ) : (
          rows.map((row, index) => (
            <React.Fragment key={`${index}-list-fragment1`}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  key={`${index}-list-text`}
                  primary={`${row.data.nombres_usuario} ${row.data.apellidos_usuario} - ${row.data.documento_usuario}`}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        {renderLink(row.procesosGenerales.actual, row)}
                      </Typography>

                      {` ${
                        row.procesosGenerales.pendientes.length === 0 ? "" : "-"
                      } ${row.procesosGenerales.pendientes.map(
                        (process) => ` ${process}`
                      )} ${
                        row.procesosGenerales.pendientes.length === 0
                          ? ""
                          : "pendientes"
                      } `}
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))
        )}
      </List>
    </Popover>
  );
}

export default ProcessPopOver;

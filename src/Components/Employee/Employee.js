import { Redirect, Route } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import AssignmentIcon from "@material-ui/icons/Assignment";
import BackDropLoading from "../BackDropLoading";
import Button from "@material-ui/core/Button";
import ConsentForm from "./Consent/ConsentForm";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Process from "./Process/Process";
import ProcessPopOver from "./ProcessPopOver";
import React from "react";
import ReceiptCreate from "./Receipt/ReceiptCreate";
import ReceiptKinship from "./Receipt/ReceiptKinship";
import Receipts from "./Receipt/Receipts";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import UserDrawer from "./EmployeeDrawer";
import UserForm from "./Users/UserForm";
import UserShow from "./Users/UserShow";
import auth from "../Auth/auth";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import socketIOClient from "socket.io-client";

const drawerWidth = 150;

const useStyles = makeStyles((theme) => ({
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  title: {
    flexGrow: 1,
  },
}));

const ENDPOINT = process.env.REACT_APP_SOCKET_ROUTE;
const socket = socketIOClient(ENDPOINT);

export default function Employee() {
  const classes = useStyles();
  const [rows, setRows] = React.useState([]);
  const [loaded, setLoaded] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [redirect, setRedirect] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openPopover = Boolean(anchorEl);
  const id = openPopover ? "simple-popover" : undefined;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleChangeServiceStatus = (data) => {
    socket.emit("finalizar_proceso", {
      documento_usuario: data.documento_usuario,
      cod_servicio: data.cod_servicio,
    });
  };

  const handleChangeShipmentStatus = (data) => {
    socket.emit("entrega_resultado", {
      documento_usuario: data.documento_usuario,
      cod_servicio: data.cod_servicio,
    });
  };

  const handleCompleteProcess = (documento_usuario) => {
    socket.emit("completar_procesos", {
      documento_usuario: documento_usuario,
    });
  };

  const handleEliminateProcess = (documento_usuario) => {
    socket.emit("eliminar_usuarios", {
      documento_usuario: documento_usuario,
    });
  };

  React.useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("data", (msg) => {
      setRows(msg);
      setLoaded(true);
    });
    return () => socket.disconnect();
  }, []);

  return (
    <React.Fragment>
      <Grid container direction="column">
        <Grid item>
          <AppBar
            position="static"
            className={clsx(classes.appBar, {
              [classes.appBarShift]: open,
            })}
          >
            <Toolbar>
              <IconButton
                edge="start"
                onClick={handleDrawerOpen}
                className={clsx(classes.menuButton, open && classes.hide)}
                color="inherit"
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h1"
                noWrap
                className={classes.title}
              ></Typography>
              <Button
                color="inherit"
                aria-describedby={id}
                onClick={handleClick}
              >
                <AssignmentIcon />
              </Button>

              <Button
                color="inherit"
                onClick={() => {
                  auth.logout(() => {
                    setRedirect(true);
                  });
                }}
              >
                <ExitToAppIcon />
              </Button>
            </Toolbar>
          </AppBar>
          <UserDrawer state={open} setState={setOpen} classes={classes} />
        </Grid>

        <Grid
          container
          item
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <Grid item xs={1} sm={1} md={3}></Grid>
          <Grid item xs={11} sm={10} md={6}>
            <Route exact path="/Empleado" component={UserShow} />
            <Route exact path="/Empleado/CrearUsuario" component={UserForm} />
            <Route exact path="/Empleado/EditarUsuario" component={UserForm} />
            <Route exact path="/Empleado/Tutor" component={ReceiptKinship} />
            <Route
              exact
              path="/Empleado/Procesos"
              render={() => (
                <Process
                  rows={rows}
                  handleCompleteProcess={handleCompleteProcess}
                  handleChangeServiceStatus={handleChangeServiceStatus}
                  handleChangeShipmentStatus={handleChangeShipmentStatus}
                  handleEliminateProcess={handleEliminateProcess}
                />
              )}
            />
            <Route
              exact
              path="/Empleado/CrearFactura"
              component={ReceiptCreate}
            />
            <Route exact path="/Empleado/Facturas" component={Receipts} />
            <Route
              exact
              path="/Empleado/Consentimiento"
              component={ConsentForm}
            />
          </Grid>

          <Grid item xs={false} sm={1} md={3}></Grid>
        </Grid>
      </Grid>
      <img
        src={window.location.origin + "/header_logo.png"}
        alt="logo"
        className="ribbon"
      />
      <ProcessPopOver
        id={id}
        open={openPopover}
        anchorEl={anchorEl}
        onClose={handleClose}
        rows={rows}
        handleChangeServiceStatus={handleChangeServiceStatus}
        handleChangeShipmentStatus={handleChangeShipmentStatus}
      />

      {redirect === true && localStorage.getItem("authenticated") ? (
        <Redirect to={"/"} />
      ) : (
        ""
      )}
      <BackDropLoading isSubmitting={!loaded} />
    </React.Fragment>
  );
}

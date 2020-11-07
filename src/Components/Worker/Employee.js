import { Route, Switch } from "react-router-dom";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import ConsentForm from "./Consent/ConsentForm";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Proccess from "./Process/Proccess";
import React from "react";
import ReceiptCreate from "./Receipt/ReceiptCreate";
import ReceiptKinship from "./Receipt/ReceiptKinship";
import Receipts from "./Receipt/Receipts";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import UserCreate from "./Users/UserCreate";
import UserDrawer from "./EmployeeDrawer";
import UserShow from "./Users/UserShow";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

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

export default function Employee() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  return (
    <React.Fragment>
      <CssBaseline />
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
              <Button color="inherit">
                <AccountCircleIcon />
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
            <Route exact path="/Empleado/CrearUsuario" component={UserCreate} />
            <Route
              exact
              path="/Empleado/Parentesco"
              component={ReceiptKinship}
            />
            <Route exact path="/Empleado/Procesos" component={Proccess} />
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
    </React.Fragment>
  );
}

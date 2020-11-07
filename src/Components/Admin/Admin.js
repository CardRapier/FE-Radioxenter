import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AdminDrawer from "./AdminDrawer";
import AdminShow from "./AdminShow";
import AgreementForm from "./Forms/AgreementForm";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import EmployeeForm from "./Forms/EmployeeForm";
import EntityForm from "./Forms/EntityForm";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import PackageForm from "./Forms/PackageForm";
import React from "react";
import { Route } from "react-router-dom";
import ServiceForm from "./Forms/ServiceForm";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import data from "./admin-data";
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

export default function Admin() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const {
    services,
    packages,
    entities,
    agreements,
    employees,
    doctors,
  } = data.props;
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
                onClick={() => setOpen(true)}
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
          <AdminDrawer state={open} setState={setOpen} classes={classes} />
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
            <Route
              exact
              path="/Administrador"
              render={() => <AdminShow data={services} />}
            />

            <Route
              exact
              path="/Administrador/CrearServicio"
              component={ServiceForm}
            />

            <Route
              exact
              path="/Administrador/EditarServicio"
              component={ServiceForm}
            />

            <Route
              exact
              path="/Administrador/Paquetes"
              render={() => <AdminShow data={packages} />}
            />

            <Route
              exact
              path="/Administrador/CrearPaquete"
              component={PackageForm}
            />

            <Route
              exact
              path="/Administrador/Entidades"
              render={() => <AdminShow data={entities} />}
            />

            <Route
              exact
              path="/Administrador/CrearEntidad"
              component={EntityForm}
            />

            <Route
              exact
              path="/Administrador/Convenios"
              render={() => <AdminShow data={agreements} />}
            />

            <Route
              exact
              path="/Administrador/CrearConvenio"
              component={AgreementForm}
            />

            <Route
              exact
              path="/Administrador/Empleados"
              render={() => <AdminShow data={employees} />}
            />

            <Route
              exact
              path="/Administrador/CrearEmpleado"
              component={EmployeeForm}
            />

            <Route
              exact
              path="/Administrador/Doctores"
              render={() => <AdminShow data={doctors} />}
            />
          </Grid>
          <Grid item xs={false} sm={1} md={3}></Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

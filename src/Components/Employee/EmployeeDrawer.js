import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ClearAllIcon from "@material-ui/icons/ClearAll";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import HomeIcon from "@material-ui/icons/Home";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import React from "react";
import ReceiptIcon from "@material-ui/icons/Receipt";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import { useTheme } from "@material-ui/core/styles";
import AssessmentIcon from "@material-ui/icons/Assessment";

export default function EmployeeDrawer(props) {
  const classes = props.classes;
  const theme = useTheme();

  return (
    <div>
      <Drawer
        className={classes.drawer}
        anchor="left"
        open={props.state}
        onClose={() => props.setState(false)}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={() => props.setState(false)}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button component={Link} key={"ShowUser"} to="/Empleado/">
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={"Usuarios"} />
          </ListItem>

          <ListItem
            button
            component={Link}
            key={"Receipts"}
            to="/Empleado/Facturas"
          >
            <ListItemIcon>
              <ReceiptIcon />
            </ListItemIcon>
            <ListItemText primary={"Facturas"} />
          </ListItem>

          <ListItem
            button
            component={Link}
            key={"Proccess"}
            to="/Empleado/Procesos"
          >
            <ListItemIcon>
              <ClearAllIcon />
            </ListItemIcon>
            <ListItemText primary={"Procesos"} />
          </ListItem>

          <ListItem
            button
            component={Link}
            key={"Reporte"}
            to="/Empleado/Reporte"
          >
            <ListItemIcon>
              <AssessmentIcon />
            </ListItemIcon>
            <ListItemText primary={"Reporte"} />
          </ListItem>

          {localStorage.getItem("redirect") === "/Administrador" ? (
            <ListItem
              button
              component={Link}
              key={"Administrador"}
              to="/Administrador"
            >
              <ListItemIcon>
                <SupervisorAccountIcon />
              </ListItemIcon>
              <ListItemText primary={"Cambiar a módulo Administrador"} />
            </ListItem>
          ) : (
            ""
          )}
        </List>
        <Divider />
      </Drawer>
    </div>
  );
}

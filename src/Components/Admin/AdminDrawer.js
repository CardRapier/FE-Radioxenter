import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import BusinessIcon from "@material-ui/icons/Business";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import HomeIcon from "@material-ui/icons/Home";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PermContactCalendarIcon from "@material-ui/icons/PermContactCalendar";
import React from "react";
import SubjectIcon from "@material-ui/icons/Subject";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import ViewCompactIcon from "@material-ui/icons/ViewCompact";
import { useTheme } from "@material-ui/core/styles";

export default function AdminDrawer(props) {
  const { setState } = props;
  const classes = props.classes;
  const theme = useTheme();

  return (
    <div>
      <Drawer
        className={classes.drawer}
        anchor="left"
        open={props.state}
        onClose={() => setState(false)}
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
          <ListItem
            button
            component={Link}
            key={"ShowServices"}
            to="/Administrador/"
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={"Servicios"} />
          </ListItem>

          <ListItem
            button
            component={Link}
            key={"Packages"}
            to="/Administrador/Paquetes"
          >
            <ListItemIcon>
              <ViewCompactIcon />
            </ListItemIcon>
            <ListItemText primary={"Paquetes"} />
          </ListItem>

          <ListItem
            button
            component={Link}
            key={"Entities"}
            to="/Administrador/Entidades"
          >
            <ListItemIcon>
              <BusinessIcon />
            </ListItemIcon>
            <ListItemText primary={"Entidades"} />
          </ListItem>
          <ListItem
            button
            component={Link}
            key={"Agreement"}
            to="/Administrador/Convenios"
          >
            <ListItemIcon>
              <BusinessCenterIcon />
            </ListItemIcon>
            <ListItemText primary={"Convenios"} />
          </ListItem>
          <ListItem
            button
            component={Link}
            key={"Employees"}
            to="/Administrador/Empleados"
          >
            <ListItemIcon>
              <AssignmentIndIcon />
            </ListItemIcon>
            <ListItemText primary={"Empleados"} />
          </ListItem>

          <ListItem
            button
            component={Link}
            key={"Doctor"}
            to="/Administrador/Doctores"
          >
            <ListItemIcon>
              <PermContactCalendarIcon />
            </ListItemIcon>
            <ListItemText primary={"Doctores"} />
          </ListItem>

          <ListItem
            button
            component={Link}
            key={"Enumeration"}
            to="/Administrador/Enumeracion"
          >
            <ListItemIcon>
              <FormatListNumberedIcon />
            </ListItemIcon>
            <ListItemText primary={"Enumeración"} />
          </ListItem>

          <ListItem
            button
            component={Link}
            key={"Consents"}
            to="/Administrador/Consentimientos"
          >
            <ListItemIcon>
              <SubjectIcon />
            </ListItemIcon>
            <ListItemText primary={"Consentimientos"} />
          </ListItem>

          <ListItem button component={Link} key={"Empleado"} to="/Empleado">
            <ListItemIcon>
              <SupervisorAccountIcon />
            </ListItemIcon>
            <ListItemText primary={"Cambiar a Modulo Empleado"} />
          </ListItem>
        </List>
        <Divider />
      </Drawer>
    </div>
  );
}

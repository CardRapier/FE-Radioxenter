import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Divider from "@material-ui/core/Divider"
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import MailIcon from "@material-ui/icons/Mail";
import React from "react";
import { useTheme } from "@material-ui/core/styles";

export default function UserDrawer(props) {
  const classes = props.classes;
  const theme = useTheme();

  return (
    <div>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={props.state}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={() => props.setState(false)}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
}

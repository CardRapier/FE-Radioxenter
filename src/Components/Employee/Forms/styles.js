import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  title: {
    paddingTop: theme.spacing(4),
  },

  paddingTop3: {
    paddingTop: theme.spacing(3),
  },

  services: {
    paddingTop: theme.spacing(3),
  },
  expandedPanel: {
    backgroundColor: "#fcfcfc",
  },
}));

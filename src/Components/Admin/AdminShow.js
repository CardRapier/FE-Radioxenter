import AdminDataTable from "./AdminDataTable";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import React from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  titlebutton: {
    padding: theme.spacing(4, 0, 2),
  },
  margintop: {
    marginTop: theme.spacing(2),
  },
  marginBottom: {
    marginBottom: 2,
  },
}));

export default function AdminShow(props) {
  const classes = useStyles();
  const [query, setQuery] = React.useState({ query: "" });
  const data = props.data;
  return (
    <React.Fragment>
      <Grid container direction={"column"}>
        <Grid container item className={classes.titlebutton}>
          <Grid item xs={3}></Grid>
          <Grid item xs={5}>
            <Typography
              component="h1"
              variant="h5"
              align="left"
              color="textPrimary"
              gutterBottom
            >
              {data.title}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Button
              component={Link}
              to={data.link}
              variant="contained"
              color="primary"
              size="small"
            >
              Crear
            </Button>
          </Grid>
        </Grid>

        <Grid
          container
          item
          spacing={4}
          className={classes.marginBottom}
          justify="flex-start"
          alignItems="center"
        >
          <Grid item xs={3}></Grid>
          <Grid item xs={5}>
            <TextField
              id={data.filter.id}
              label={data.filter.label}
              variant="outlined"
              size="small"
              type="search"
              value={query.query}
              onChange={(event, index, value) =>
                setQuery({ query: event.target.value })
              }
            />
          </Grid>
        </Grid>

        <Grid container item spacing={4} justify="center" alignItems="center">
          <Grid item className={classes.margintop}>
            <Grid item>
              <AdminDataTable
                data={data}
                filter={{ query: query.query, id: data.filter.id }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

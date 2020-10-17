import Grid from '@material-ui/core/Grid';
import ProcessTable from './ProcessTable';
import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    title: {
      padding: theme.spacing(4),
    },
    paddingTable: {
      paddingTop: theme.spacing(10),
    },
  }));

export default function Proccess() {
    const classes = useStyles()
    return (
        <React.Fragment>
      <Grid container direction={"column"}>
        <Grid container item className={classes.title} spacing={4}>
          <Grid item>
          <Typography
              component="h1"
              variant="h5"
              align="left"
              color="textPrimary"
              gutterBottom
            >
              Procesos
            </Typography>
          </Grid>
        </Grid>

        <Grid container item spacing={4} className={classes.paddingTable}>
          <ProcessTable/>
        </Grid>
      </Grid>
    </React.Fragment>
    )
}
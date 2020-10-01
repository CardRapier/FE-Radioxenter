import Grid from '@material-ui/core/Grid';
import React from 'react'
import TableProcess from './ProcessUsers/TableProcess';
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    titlebutton: {
      padding: theme.spacing(4, 0, 2),
    },
    margintop4: {
      marginTop: theme.spacing(2),
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
  }));

export default function Proccess() {
    const classes = useStyles()
    return (
        <React.Fragment>
      <Grid container direction={"column"}>
        <Grid container item className={classes.titlebutton} spacing={4}>
          <Grid item>
            <Typography
              component="h1"
              variant="h4"
              align="left"
              color="textPrimary"
              gutterBottom
            >
              Procesos
            </Typography>
          </Grid>
        </Grid>

        <Grid container item spacing={4}>
          <TableProcess/>
        </Grid>
      </Grid>
    </React.Fragment>
    )
}
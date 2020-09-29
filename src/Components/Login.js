import React from 'react';
import {TextField, Grid, makeStyles, Button} from '@material-ui/core';
import {Image, View} from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',  
      },
    },
  }));

export default function Login() {
    const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off"> 
        <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}
        >
        <img 
        src="http://radioxenter.com/images/header_logo.png"
        alt="new"
        />
        
        <Grid item xs={3}>

            <TextField
            required
            id="outlined"
            label="Usuario"
            defaultValue=""
            variant="outlined"
            />
            <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="outlined"
            />
        <Grid item xs={12}>
            <Button variant="contained" color="primary">
                Ingresar
            </Button>
        </Grid>
        </Grid>   
        </Grid> 
    </form>
  );
}
import { Link, Redirect } from "react-router-dom";
import React, { useState } from "react";
import { Text, Text1, Text2, Text3 } from "./ConsentText.js";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import SignatureCanvas from "react-signature-canvas";
import Typography from "@material-ui/core/Typography";
import { api_process } from "../../../api_app.js";
import { makeStyles } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";

const useStyles = makeStyles((theme) => ({
  title: {
    padding: theme.spacing(4, 0, 4),
  },
  buttons: {
    padding: theme.spacing(4, 0, 4),
  },
  border: {
    border: "1px solid",
  },
  signature: {
    border: "1px solid #d3d3d3",
    backgroundColor: "#FFFFFF ",
  },
}));

export default function ConsentForm(props) {
  const { data, tutor } = props.location;
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  let refSignature = {};

  const [redirect, setRedirect] = useState(false);

  //TODO: FIX TEXT MESSAGE

  const text = Text;
  const text1 = Text1;
  const text2 = Text2;
  const text3 = Text3;

  const clear = () => {
    refSignature.clear();
  };

  const submit = () => {
    var signature_ref = refSignature.getTrimmedCanvas();
    var signature_image = signature_ref.toDataURL("image/png");

    api_process
      .post("crearConsentimiento", {
        signature: signature_image,
        documento_usuario: data.documento_usuario,
      })
      .then((res) => {
        enqueueSnackbar("Se ha agregado la transaccion exitososamente!", {
          variant: "success",
        });
        setRedirect(true);
      })
      .catch(function (error) {
        enqueueSnackbar(
          "Ha habido un error, revise los datos e intente de nuevo." +
            error.response,
          {
            variant: "error",
          }
        );
      });
  };

  return (
    <React.Fragment>
      <Grid container direction="column">
        <Grid container className={classes.title} item spacing={4}>
          <Grid item>
            <Typography
              component="h1"
              variant="h5"
              align="left"
              color="textPrimary"
              gutterBottom
            >
              Documento de Consentimiento
            </Typography>
          </Grid>
        </Grid>
        {/*//TODO: Añadir diferentes formas de mostrar el consentimiento*/}
        <Grid container item spacing={4}>
          <Typography variant="h6">
            Yo,
            {tutor !== undefined
              ? ` ${tutor.nombres_tutor} ${tutor.apellidos_tutor} identificado con el documento ${tutor.documento_tutor} tutor de ${data.nombres_usuario} ${data.apellidos_usuario}, identificado por el documento ${data.documento_usuario}`
              : data !== undefined
              ? ` ${data.nombres_usuario} ${data.apellidos_usuario} identificado con el documento ${data.documento_usuario}`
              : ""}
          </Typography>
          <Typography variant="body1">{text}</Typography>
          <Typography variant="body1">{text1}</Typography>
          <Typography variant="body1">{text2}</Typography>
          <Typography variant="body1">{text3}</Typography>
          {/*//TODO: Añadir datos del usuario que firmara*/}
          <Grid container item justify="flex-end">
            <Grid item>
              {/*<div id="imageBox" className={classes.signature}></div>*/}
              <SignatureCanvas
                penColor="black"
                ref={(ref) => {
                  refSignature = ref;
                }}
                canvasProps={{
                  width: 500,
                  height: 200,
                  className: classes.signature,
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          className={classes.buttons}
          justify="flex-end"
          item
          spacing={1}
        >
          <Grid item>
            <Button
              component={Link}
              to={"/Empleado/"}
              variant="contained"
              color="primary"
              size="small"
            >
              Volver
            </Button>
          </Grid>

          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={clear}
              size="small"
            >
              Limpiar
            </Button>
          </Grid>

          <Grid item>
            <Button
              className={classes.button}
              variant="contained"
              size="small"
              color="primary"
              onClick={submit}
            >
              Terminar
            </Button>
          </Grid>
        </Grid>
        {redirect === true ? <Redirect to="/Empleado/" /> : ""}
      </Grid>
    </React.Fragment>
  );
}

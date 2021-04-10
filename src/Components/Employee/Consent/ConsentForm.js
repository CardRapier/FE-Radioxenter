import { Link, Redirect } from "react-router-dom";
import React, { useState } from "react";
import { api_process, api_type_consent } from "../../../api_app.js";

import BackDropLoading from "../../BackDropLoading.js";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import ConsentContent from "./ConsentContent.js";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import SignatureCanvas from "react-signature-canvas";
import { Typography } from "@material-ui/core";
import { give_error_message } from "../../../utils.js";
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

const validated_selected_consents = (consents) => {
  let true_values = [];
  for (let i in consents) {
    if (consents[i]) {
      true_values.push(i);
    }
  }
  return true_values;
};

const validate_empty = (conditions, covid, true_values) => {
  for (let i in true_values) {
    if (true_values[i].nombre_tipo_consentimiento === "Consentimiento Covid") {
      for (let j in Object.values(covid)) {
        if (Object.values(covid)[j] === "") {
          return `el campo ${Object.keys(covid)[j]} esta vacio`;
        }
      }
    } else if (
      true_values[i].nombre_tipo_consentimiento ===
        "Consentimiento Intraoral" &&
      conditions.condicion_intraoral === ""
    ) {
      return `Las condiciones del consentimiento Intraoral estan vacias`;
    } else if (
      true_values[i].nombre_tipo_consentimiento ===
        "Consentimiento Extraoral" &&
      conditions.condicion_extraoral === ""
    ) {
      return `Las condiciones del consentimiento Extraoral estan vacias`;
    }
  }
  return "true";
};

export default function ConsentForm(props) {
  let { data, tutor, transaction } = props.location;

  const [conditions, setConditions] = useState({
    condicion_intraoral: "",
    condicion_extraoral: "",
  });

  const [covid, setCovid] = React.useState({
    riesgo_elevado: "",
    informado_directrices: "",
    confirmacion_solicitud: "",
    confirmacion_sintomas: "",
    declaracion_contacto: "",
    presentado_covid: false,
    cuarentena: false,
    entender_distancia: "",
    toma_temperatura: "",
  });

  const [typeConsent, setTypeConsent] = React.useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  let refSignature = {};
  let true_values;

  React.useState(() => {
    api_type_consent.get("/").then((res) => setTypeConsent(res.data.respuesta));
  });

  if (transaction !== undefined && typeConsent.length !== 0) {
    true_values = validated_selected_consents(transaction.consentimiento);
    transaction = typeConsent.filter((element, index) =>
      true_values.includes(`${element.cod_tipo_consentimiento}`)
    );
  }

  const clear = () => {
    refSignature.clear();
  };

  const submit = () => {
    setSubmitting(true);
    var signature_ref = refSignature.getTrimmedCanvas();
    var signature_image = signature_ref.toDataURL("image/png");
    let error = validate_empty(conditions, covid, transaction);
    if (error === "true") {
      if (!refSignature.isEmpty()) {
        api_process
          .post("crearConsentimiento", {
            signature: signature_image,
            documento_usuario: data.documento_usuario,
            condiciones: conditions,
            covid: covid,
          })
          .then((res) => {
            enqueueSnackbar("Se ha agregado la transaccion exitososamente!", {
              variant: "success",
            });
            setRedirect(true);
            setSubmitting(false);
          })
          .catch(function (error) {
            setSubmitting(false);
            enqueueSnackbar(give_error_message(error.response), {
              variant: "error",
            });
          });
      } else {
        setSubmitting(false);
        enqueueSnackbar(
          "El formato de firma está vacío, por favor coloque su firma",
          { variant: "error" }
        );
      }
    } else {
      setSubmitting(false);
      enqueueSnackbar(error, {
        variant: "error",
      });
    }
  };

  return (
    <React.Fragment>
      <Grid container direction="column">
        <Container className="form-paper" elevation={3} component={Card} fixed>
          <CardHeader title="Consentimiento" />
          <CardContent>
            {typeConsent.length !== 0 && (
              <React.Fragment>
                <ConsentContent
                  conditions={conditions}
                  setConditions={setConditions}
                  tutor={tutor}
                  data={data}
                  covid={covid}
                  setCovid={setCovid}
                  transaction={transaction}
                />
                <Typography style={{ fontWeight: 600 }} variant="body2">
                  Respetado(a) Paciente, por favor lea el texto a continuación
                  antes de proceder al servicio: RadioXenter Ltda. solicitará el
                  suministro de algunos de sus datos personales con el exclusivo
                  fin de atender su solicitud de prestación de servicios de
                  Radiología Oral, facturarlos y generar los indicadores de
                  calidad correspondientes. Dichos datos serán tratados en forma
                  estrictamente confidencial y serán procesados, utilizados,
                  protegidos y almacenados de conformidad con las normas legales
                  vigentes sobre protección de datos personales.
                </Typography>
                <br />
                <Typography
                  style={{ fontWeight: 600 }}
                  variant="body2"
                  color="secondary"
                >
                  Por medio de la siguiente firma, acepta utilizar esta para
                  diligencias los consentimientos necesarios para prestar él
                  servicio:
                </Typography>
              </React.Fragment>
            )}
          </CardContent>
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
              <Typography variant="body2">
                {data !== undefined
                  ? tutor !== undefined
                    ? `Nombre: ${tutor.nombres_tutor} ${tutor.apellidos_tutor}`
                    : `Nombre: ${data.nombres_usuario} ${data.apellidos_usuario}`
                  : ""}
              </Typography>

              <Typography variant="body2">
                {data !== undefined
                  ? tutor !== undefined
                    ? `Documento: ${tutor.documento_tutor}`
                    : `Documento: ${data.documento_usuario}`
                  : ""}
              </Typography>
            </Grid>
          </Grid>
          <CardActions disableSpacing>
            <Grid container justify="flex-end" item spacing={1}>
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
          </CardActions>
        </Container>
      </Grid>
      {redirect === true ? <Redirect to="/Empleado/" /> : ""}
      <BackDropLoading isSubmitting={submitting} />
    </React.Fragment>
  );
}

import Grid from "@material-ui/core/Grid";
import React from "react";
import { TextField } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  topPad: {
    paddingTop: theme.spacing(2),
  },

  botPad: {
    paddingBottom: theme.spacing(2),
  },
}));

export default function ConsentExtraOral(props) {
  const { tutor, data, conditions, setConditions } = props;
  const classes = useStyles();
  return (
    <Grid
      container
      item
      spacing={1}
      className={classes.topPad}
      style={{ height: "100%", overflow: "auto" }}
    >
      <Grid item>
        <Typography variant="body2">
          Por medio de la presente constancia, en pleno y normal uso de mis
          facultades mentales, otorgo en forme libre mi consentimiento al
          prestador de salud oral para que en ejercicio legal de su labor y con
          el concurso de otros profesionales de la salud que llegaren a
          requerirse, así como el personal auxiliar de servicio asistenciales
          que se hagan necesarios, se me practique(n)lo(s) siguientes(s)
          procedimiento(s):
        </Typography>
      </Grid>

      <Grid item>
        <Typography variant="body2" style={{ fontWeight: 600 }}>
          RADIOGRAFIA EXTRAORAL
        </Typography>
      </Grid>

      <Grid item>
        <Typography variant="body2">
          El prestador de salud oral queda igualmente facultado para llevar a
          cabo la práctica de conductas o procedimientos adicionales a los ya
          autorizados en el punto anterior, si en el curso del procedimiento
          llegare a presentarse una situación advertida o imprevista que a
          juicio del profesional tratante, los haga aconsejable
        </Typography>
      </Grid>

      <Grid item>
        <Typography variant="body2">
          Que el procedimiento que necesito y se me va a realizar consiste en:
        </Typography>
      </Grid>

      <Grid item>
        <Typography variant="body2" style={{ fontWeight: 600 }}>
          LAS RADIOGRAFÍA EXTRAORAL ES UN EXAMEN DENTAL CON RAYOS X
          BIDIMENSIONALES (2-D) QUE CAPTURA IMÁGENES DE LA BOCA ENTERA EN UNA
          SOLA TOMA, INCLUYENDO LOS DIENTES, LAS MANDÍBULAS INFERIOR Y SUPERIOR,
          Y LAS ESTRUCTURAS Y TEJIDOS CIRCUNDANTES
        </Typography>
      </Grid>

      <Grid item>
        <Typography variant="body2" style={{ fontWeight: 600 }}>
          Que los BENEFICIOS son:
        </Typography>

        <ul>
          <li>
            <Typography variant="body2">
              No queda radiación en el cuerpo de un paciente luego de realizar
              el examen de rayos X.
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              Los rayos X por lo general no tienen efectos secundarios en el
              rango de diagnóstico típico para este examen.
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              Los rayos X panorámicos pueden usarse en niños muy jóvenes, ya que
              la placa no tiene que ser ubicada dentro de la boca.
            </Typography>
          </li>
        </ul>
        <Typography variant="body2" style={{ fontWeight: 600 }}>
          Que los RIESGOS previstos y posibles complicaciones más frecuentes
          son:
        </Typography>

        <ul>
          <li>
            <Typography variant="body2">
              Exposición a la radiación y repetición de la toma de radiografías
            </Typography>
          </li>
        </ul>
      </Grid>

      <Grid item>
        <Typography variant="body2">
          El prestador de salud oral tratante me ha dado las recomendaciones
          necesarias para la toma de la ayuda diagnostica, me ha explicado que
          la exposición a la radiación utilizando este tipo de técnicas
          radiográficas es muy baja
        </Typography>
      </Grid>

      <Grid item>
        <Typography variant="body2" style={{ fontWeight: 600 }}>
          QUE DE ACUERDO A MIS CONDICIONES DE SALUD LOS RIESGOS ESPECÍFICOS SON:
        </Typography>

        <TextField
          value={conditions.condicion_extraoral}
          onChange={(event) =>
            setConditions({
              ...conditions,
              condicion_extraoral: event.target.value,
            })
          }
          required
          label="Condiciones"
          fullWidth
          multiline
        />
      </Grid>

      <Grid item>
        <Typography variant="body2">
          Por ello manifestó que estoy satisfecho con la información recibida y
          que comprendo el alcance y los riesgos del procedimiento Nota: cuando
          el paciente no tenga capacidad legal para otorga el consentimiento,
          las manifestaciones de este contenías en el presente documento se
          entienden hechas por la persona responsable que lo representa y en
          relación con el paciente correspondiente para cutos efectos lo
          suscriben
        </Typography>
      </Grid>

      <Grid item>
        <Typography variant="body2" style={{ fontWeight: 600 }}>
          YO
          {tutor !== undefined
            ? ` ${tutor.nombres_tutor.toUpperCase()} ${tutor.apellidos_tutor.toUpperCase()} CON DOCUMENTO DE IDENTIDAD NUMERO ${tutor.documento_tutor.toUpperCase()} 
            EN CALIDAD DE ${tutor.parentesco_tutor.toUpperCase()} DEL MENOR ${data.nombres_usuario.toUpperCase()} ${data.apellidos_usuario.toUpperCase()} DECIDO LIBRE Y VOLUNTARIAMENTE ACEPTAR EL PROCEDIMIENTO SUGERIDO Y
            ASUMO LA RESPONSABILIDAD Y LAS CONSECUENCIAS QUE ELLO ACARREE`
            : data !== undefined
            ? ` ${data.nombres_usuario.toUpperCase()} ${data.apellidos_usuario.toUpperCase()} CON DOCUMENTO DE IDENTIDAD NUMERO ${data.documento_usuario.toUpperCase()}
            DECIDO LIBRE Y VOLUNTARIAMENTE ACEPTAR EL PROCEDIMIENTO SUGERIDO Y
            ASUMO LA RESPONSABILIDAD Y LAS CONSECUENCIAS QUE ELLO ACARREE.`
            : ""}
        </Typography>
      </Grid>
    </Grid>
  );
}

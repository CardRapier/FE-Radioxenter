import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import React from "react";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
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

  botMar: {
    marginBottom: theme.spacing(2),
  },
}));

export default function ConsentCovid(props) {
  const { covid, setCovid, tutor, data } = props;

  const classes = useStyles();
  return (
    <Grid
      container
      spacing={1}
      className={classes.topPad}
      style={{ height: "100%", overflow: "auto" }}
    >
      <Grid item>
        <Typography variant="body2">
          Yo,{" "}
          {tutor !== undefined
            ? ` ${tutor.nombres_tutor} ${tutor.apellidos_tutor},  identificado tal como aparece abajo, tutor
            legal de ${data.nombres_usuario} ${data.apellidos_usuario}, por voluntad propia y debidamente informado
            (a) consiento que a mi representado se le tomen las radiografía Radiografías y/o estudios
            diagnósticos de emergencia/urgencia a ser realizado durante la Pandemia de COVID-19.`
            : ` ${data.nombres_usuario} ${data.apellidos_usuario}, por voluntad propia y debidamente
            informado (a) consiento tomar la radiografía digital y/o estudios diagnósticos de
            emergencia/urgencia a ser realizado durante la Pandemia de COVID-19.`}
        </Typography>
      </Grid>

      <Grid item>
        <Typography variant="body2">
          {`Entiendo que el virus COVID-19 tiene un periodo de incubación durante
          el cual sus portadores pueden estar asintomáticos, siendo altamente
          contagioso. Entiendo que al momento, debido a las limitaciones para la
          realización de las pruebas virales, es imposible determinar quién es
          portador del virus y quién no. `}
        </Typography>
      </Grid>

      <Grid item>
        <Box fontSize="body2.fontSize">
          <ul>
            <li>
              {`Entiendo que, a pesar del seguimiento de normas de bioseguridad en
              el Centro de Radiología Oral y Maxilofacial RADIOXENTER, debido a
              la presencia de otros pacientes, a las características del virus y
              a la toma de Radiografías y/o estudios diagnósticos, existe un
              riesgo elevado de contraer el virus por el solo hecho de
              permanecer en el Centro de Radiología. `}
              <TextField
                margin="none"
                value={covid.riesgo_elevado}
                onChange={(event) =>
                  setCovid({
                    ...covid,
                    riesgo_elevado: event.target.value,
                  })
                }
                required
                label=""
                className={classes.botMar}
              />
              (Iniciales)
            </li>
            <li>
              {`He sido informado que las directrices de todas las instituciones
              de salud internacionales, ante la situación de pandemia actual,
              recomiendan suspender la realización de tratamiento odontológico
              electivo. La toma de Radiografías y/o estudios diagnósticos se
              limita al procedimiento de ayudas diagnósticas para el tratamiento
              de dolor, infección y condiciones que interfiera de forma
              significativa las funciones bucales o que puedan generar
              agudización de una de estas condiciones, lo anterior es decisión y
              responsabilidad posterior a la previa evaluación por el
              profesional odontólogo remitente. `}
              <TextField
                margin="none"
                value={covid.informado_directrices}
                onChange={(event) =>
                  setCovid({
                    ...covid,
                    informado_directrices: event.target.value,
                  })
                }
                required
                label=""
                className={classes.botMar}
                size="small"
              />
              (Iniciales)
            </li>

            <li>
              {`Confirmo que solicito la toma de Radiografías y/o estudios
              diagnósticos por una condición clínica que está enmarcado en los
              criterios anteriormente expuestos. `}
              <TextField
                margin="none"
                value={covid.confirmacion_solicitud}
                onChange={(event) =>
                  setCovid({
                    ...covid,
                    confirmacion_solicitud: event.target.value,
                  })
                }
                required
                label=""
                className={classes.botMar}
                size="small"
              />
              (Iniciales)
            </li>

            <li>
              {tutor !== undefined
                ? `Confirmo que mi representado no presenta, ni he presentado en los
              últimos 14 días, ninguno de los síntomas de COVID-19 de la
              siguiente lista: (Temperatura mayor o igual a 38°C), dificultad
              respiratoria, tos seca, secreción nasal, dolor de garganta,
              sensación de cansancio o malestar general, diarrea u otras
              molestias digestivas, perdida del gusto o del olfato.`
                : `Confirmo que no presento, ni he presentado en los últimos 14 días, ninguno de los
              síntomas de COVID-19 de la siguiente lista: Fiebre (Temperatura mayor o igual a 38°C),
              dificultad respiratoria, tos seca, secreción nasal, dolor de garganta, sensación de cansancio
              o malestar general, diarrea u otras molestias digestivas, perdida del gusto o del olfato. `}
              <TextField
                margin="none"
                value={covid.confirmacion_sintomas}
                onChange={(event) =>
                  setCovid({
                    ...covid,
                    confirmacion_sintomas: event.target.value,
                  })
                }
                required
                label=""
                className={classes.botMar}
                size="small"
              />
              (Iniciales)
            </li>

            <li>
              {tutor !== undefined
                ? `Declaro que mi representado ni yo hemos estado en contacto con personas con
                confirmación de COVID-19 o con cuadro respiratorio agudo en los últimos 14 días.
                `
                : `Declaro que no he estado en contacto con alguna persona con confirmación de COVID-19
                o con cuadro respiratorio agudo en los últimos 14 días.`}
              <TextField
                margin="none"
                value={covid.declaracion_contacto}
                onChange={(event) =>
                  setCovid({
                    ...covid,
                    declaracion_contacto: event.target.value,
                  })
                }
                required
                label=""
                className={classes.botMar}
                size="small"
              />
              (Iniciales)
            </li>

            <li>
              {`Ha presentado la enfermedad del COVID-19?   NO`}
              <Switch
                checked={covid.presentado_covid}
                onChange={(event) =>
                  setCovid({
                    ...covid,
                    presentado_covid: event.target.checked,
                  })
                }
                name="presentado"
                color="primary"
              />
              {`SÍ   En caso de haber presentado la enfermedad ¿sigue usted en
              cuarentena? NO`}
              <Switch
                checked={covid.cuarentena}
                onChange={(event) =>
                  setCovid({
                    ...covid,
                    cuarentena: event.target.checked,
                  })
                }
                name="cuarentena"
                color="primary"
              />
              SÍ (Iniciales)
            </li>

            <li>
              {`Entiendo que organismos internacionales de salud recomiendan el distanciamiento social
                de mínimo 1.8 metros, lo cual es imposible durante la toma de las Radiografías y/o
                estudios diagnósticos `}
              <TextField
                margin="none"
                value={covid.entender_distancia}
                onChange={(event) =>
                  setCovid({
                    ...covid,
                    entender_distancia: event.target.value,
                  })
                }
                required
                label=""
                className={classes.botMar}
                size="small"
              />
              (Iniciales)
            </li>

            <li>
              {`Toma de temperatura `}
              <TextField
                margin="none"
                value={covid.toma_temperatura}
                onChange={(event) =>
                  setCovid({
                    ...covid,
                    toma_temperatura: event.target.value,
                  })
                }
                required
                label=""
                type="number"
                className={classes.botMar}
                size="small"
              />
              (Iniciales)
            </li>
          </ul>
        </Box>
      </Grid>
    </Grid>
  );
}

import {
  Checkbox,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";

import BackDropLoading from "../../BackDropLoading";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import React from "react";
import ReceiptEntityModal from "./ReceiptEntityModal";
import { api_transactions } from "../../../api_app";

export default function ReceiptEntityForm(props) {
  const { data, subdata } = props.location;
  const [submitting, setSubmitting] = React.useState(false);
  const [stateAlert, setstateAlert] = React.useState(false);
  const [transactionsSelected, setTransactionsSelected] = React.useState([]);
  const [checked, setChecked] = React.useState([]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  React.useEffect(() => {
    if (data !== undefined) {
      api_transactions
        .get(`/entidades/${data.cod_entidad}`)
        .then((res) => setTransactionsSelected(res.data.respuesta));
    }
  }, [data]);

  return (
    <Grid container direction="column">
      <Container className="form-paper" elevation={3} component={Card} fixed>
        <CardHeader
          title={
            data !== undefined
              ? `Facturar Entidad - ${data.nombre_comercial_entidad}`
              : "Facturar Entidad"
          }
        />
        <CardContent>
          <List>
            {transactionsSelected.length === 0 ? (
              <Grid container justify="center" alignItems="center">
                <Typography variant="h6">
                  No hay transacción a facturar
                </Typography>
              </Grid>
            ) : (
              ""
            )}
            {transactionsSelected.map((value, index) => (
              <React.Fragment key={`shipment-list-item-${index}`}>
                <ListItem
                  role={undefined}
                  dense
                  button
                  onClick={handleToggle(value)}
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={checked.indexOf(value) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{
                        "aria-labelledby": `checkbox-list-label-${index}`,
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    id={`checkbox-list-label-${index}`}
                    primary={`Transacción Numero ${value.numero_transaccion} de valor $${value.valor_transaccion} del ${value.fecha_transaccion}. `}
                    secondary={
                      <Typography
                        component="span"
                        variant="body2"
                        color="textPrimary"
                      >
                        {`Doctor ${
                          subdata.doctor_entity.find(
                            (element) =>
                              element.cod_entidad_doctor ===
                              value.cod_entidad_doctor
                          ).Doctor.nombres_doctor
                        } ${
                          subdata.doctor_entity.find(
                            (element) =>
                              element.cod_entidad_doctor ===
                              value.cod_entidad_doctor
                          ).Doctor.apellidos_doctor
                        }`}
                      </Typography>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            ))}
          </List>
        </CardContent>
        <CardActions>
          <Grid container justify="flex-end" spacing={2}>
            <Grid item>
              <Button
                component={Link}
                to={"/Administrador/Entidades"}
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
                size="small"
                onClick={() => setChecked([])}
              >
                Limpiar
              </Button>
            </Grid>

            <Grid item>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => setstateAlert(true)}
              >
                Facturar
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </Container>

      <ReceiptEntityModal
        stateAlert={stateAlert}
        setstateAlert={setstateAlert}
        checked={checked}
        setSubmitting={setSubmitting}
        data={data}
      />

      <BackDropLoading isSubmitting={submitting} />
    </Grid>
  );
}

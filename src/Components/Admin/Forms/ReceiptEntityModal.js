import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import React from "react";
import { api_receipts } from "../../../api_app";
import { give_error_message } from "../../../utils";
import publicIp from "public-ip";
import { useSnackbar } from "notistack";

export default function ReceiptEntityModal(props) {
  const { stateAlert, setstateAlert, checked, setSubmitting, data } = props;
  const [ipv4, setIpv4] = React.useState(undefined);
  publicIp.v4().then((e) => setIpv4(e));
  const { enqueueSnackbar } = useSnackbar();

  const calculate_total_value = () => {
    let value = 0;
    for (let i in checked) {
      value += checked[i].valor_transaccion;
    }

    return value;
  };

  const validated_selected = () => {
    if (checked.length === 0) {
      return false;
    } else {
      return true;
    }
  };

  const onSubmit = () => {
    setSubmitting(true);
    if (validated_selected()) {
      api_receipts
        .put(`/facturarEntidad/${data.cod_entidad}`, {
          cod_transacciones: checked.map((element) => element.cod_transaccion),
          ipv4: ipv4,
        })
        .then((res) => {
          setSubmitting(false);
          setstateAlert(false);
          enqueueSnackbar("Se ha agregado la transacción exitosamente!", {
            variant: "success",
          });
        })
        .catch((error) => {
          setSubmitting(false);
          setstateAlert(false);
          enqueueSnackbar(give_error_message(error.response), {
            variant: "error",
          });
        });
    } else {
      setSubmitting(false);
      setstateAlert(false);
      enqueueSnackbar("Debe seleccionar al menos una transacción a facturar", {
        variant: "error",
      });
    }
  };

  return (
    <Dialog open={stateAlert} onClose={() => setstateAlert(false)}>
      <DialogTitle>
        Valor total a facturar: ${calculate_total_value()}
      </DialogTitle>
      <DialogContent>¿Desea continuar con la facturación?</DialogContent>
      <DialogActions>
        <Button onClick={() => setstateAlert(false)} color="primary">
          Cancelar
        </Button>
        <Button onClick={() => onSubmit()} color="primary" autoFocus>
          Continuar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

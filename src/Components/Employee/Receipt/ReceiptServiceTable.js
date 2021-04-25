import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import React from "react";
import RemoveIcon from "@material-ui/icons/Remove";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";

export default function ReceiptServiceTable(props) {
  const {
    servicesSelected,
    remove_service,
    evaluate_total_value,
    handleQuantity,
  } = props;

  return (
    <React.Fragment>
      <TableContainer component={Paper} elevation={3}>
        <Table size="small" aria-label="table">
          <TableHead>
            <TableRow>
              <TableCell key={"Servicio"}>Servicio</TableCell>
              <TableCell key={"Cantidad"}>Cantidad</TableCell>
              <TableCell key={"Iva"}>Iva</TableCell>
              <TableCell key={"valor"}>Valor</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {servicesSelected.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} key={"single-row"}>
                  No hay servicios seleccionados
                </TableCell>
                <TableCell />
              </TableRow>
            ) : (
              servicesSelected.map((service, index) => (
                <TableRow key={`${index}-row`}>
                  <TableCell style={{ width: "30%" }} key={`${index}-name`}>
                    {service.nombre_servicio}
                  </TableCell>
                  <TableCell style={{ width: "20%" }} key={`${index}-quantity`}>
                    <TextField
                      label=""
                      required
                      type="number"
                      value={service.cantidad}
                      onChange={(e) => handleQuantity(service, e.target.value)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell style={{ width: "20%" }} key={`${index}-iva`}>
                    {service.iva_servicio} %
                  </TableCell>
                  <TableCell style={{ width: "20%" }} key={`${index}-data`}>
                    <Grid container alignItems="center">
                      <Grid item xs={9}>
                        {service.precio_servicio}
                      </Grid>
                      <Grid item xs={3}>
                        <IconButton
                          onClick={() => remove_service(service.cod_servicio)}
                        >
                          <RemoveIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
              ))
            )}
            <TableRow>
              <TableCell colSpan={3}>Total a pagar: </TableCell>
              <TableCell>{evaluate_total_value()}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}

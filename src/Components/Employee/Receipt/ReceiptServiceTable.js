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

export default function ReceiptServiceTable(props) {
  const { servicesSelected, remove_service, evaluate_total_value } = props;
  return (
    <React.Fragment>
      <TableContainer component={Paper}>
        <Table aria-label="table">
          <TableHead>
            <TableRow>
              <TableCell key={"Servicio"}>Servicio</TableCell>
              <TableCell key={"valor"}>Valor</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {servicesSelected.length === 0 ? (
              <TableRow>
                <TableCell key={"single-row"}>
                  No hay servicios seleccionados
                </TableCell>
                <TableCell />
              </TableRow>
            ) : (
              servicesSelected.map((service, index) => (
                <TableRow key={`${index}-row`}>
                  <TableCell key={`${index}-name`}>
                    {service.nombre_servicio}
                  </TableCell>
                  <TableCell key={`${index}-data`}>
                    <Grid container alignItems="center">
                      <Grid item xs={10}>
                        {service.precio_servicio}
                      </Grid>
                      <Grid item xs={2}>
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
              <TableCell>Total a pagar: </TableCell>
              <TableCell>{evaluate_total_value()}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}

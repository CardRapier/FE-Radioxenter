import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";

export default function PackageDescription(props) {
  const { data } = props;
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom component="div">
        Servicios
      </Typography>

      <Table size="small" aria-label="purchases">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Precio</TableCell>
            <TableCell align="right">Iva</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.packages.map((element) => (
            <TableRow key={element.cod_servicio}>
              <TableCell component="th" scope="row">
                {element.Servicio.nombre_servicio.replace("SE-", "")}
              </TableCell>
              <TableCell>{element.Servicio.precio_servicio}</TableCell>
              <TableCell align="right">
                {element.Servicio.iva_servicio} %
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}

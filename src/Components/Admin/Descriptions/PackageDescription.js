import React from "react";
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Typography from "@material-ui/core/Typography";

export default function PackageDescription(props) {
  const { row } = props;
  console.log(row);
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
          {row.services.map((service) => (
            <TableRow key={service.code}>
              <TableCell component="th" scope="row">
                {service.name}
              </TableCell>
              <TableCell>{service.price}</TableCell>
              <TableCell align="right">{service.iva}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}

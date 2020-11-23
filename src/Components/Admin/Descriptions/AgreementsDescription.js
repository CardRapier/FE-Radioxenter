import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";

export default function AgreementsDescription(props) {
  const { row } = props;
  console.log(row);
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom component="div">
        Descripción de los convenios
      </Typography>

      <Table size="small" aria-label="purchases">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Precio</TableCell>
            <TableCell>Fecha Inicial</TableCell>
            <TableCell>Fecha Final</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {row.services.map((service, i) => (
            <TableRow key={service.code}>
              <TableCell component="th" scope="row">
                {service.name}
              </TableCell>
              <TableCell>{service.price}</TableCell>
              <TableCell>{row.dates[i].initial}</TableCell>
              <TableCell>{row.dates[i].final}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}

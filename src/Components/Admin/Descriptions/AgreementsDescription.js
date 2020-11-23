import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";

export default function AgreementsDescription(props) {
  const { row, data } = props;
  console.log(row);
  console.log(data);
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
            <TableCell>Fecha inicial</TableCell>
            <TableCell>Fecha Final</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {row.servicios.map((service, i) => (
            <TableRow
              key={
                data.services.find(
                  (element) => element.cod_servicio === service
                ).cod_servicio
              }
            >
              <TableCell component="th" scope="row">
                {
                  data.services.find(
                    (element) => element.cod_servicio === service
                  ).nombre_servicio
                }
              </TableCell>
              <TableCell>
                {
                  data.services.find(
                    (element) => element.cod_servicio === service
                  ).precio_servicio
                }
              </TableCell>

              <TableCell>{row.fechas.fecha_inicial_convenio[i]}</TableCell>
              <TableCell>{row.fechas.fecha_final_convenio[i]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}

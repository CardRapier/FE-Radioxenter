import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";

//TODO: Edit the both ways
export default function AgreementsDescription(props) {
  const { row, data } = props;
  console.log(row);
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Descripción de los convenios
      </Typography>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Precio</TableCell>
            <TableCell>Fecha inicial</TableCell>
            <TableCell>Fecha Final</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {row.Convenios.map((element, i) => (
            <TableRow key={i}>
              <TableCell scope="row">
                {
                  data.services.find(
                    (service) => service.cod_servicio === element.cod_servicio
                  ).nombre_servicio
                }
              </TableCell>
              <TableCell>{element.valor_servicio}</TableCell>

              <TableCell>{element.fecha_inicial_convenio}</TableCell>
              <TableCell>{element.fecha_final_convenio}</TableCell>
              <TableCell>
                <Button
                  component={Link}
                  to={{
                    pathname: "/Administrador/EditarConvenio",
                    data: {
                      cod_entidad: row.cod_entidad,
                      fecha_inicial_convenio: element.fecha_inicial_convenio,
                      fecha_final_convenio: element.fecha_final_convenio,
                      servicios_convenio: [element.cod_servicio],
                      valores_servicios: [element.valor_servicio],
                    },
                  }}
                  variant="contained"
                  color="primary"
                  size="small"
                >
                  Editar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}

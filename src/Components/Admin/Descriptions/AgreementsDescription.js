import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import { remove_abbreviations } from "../../../utils";

export default function AgreementsDescription(props) {
  const { row } = props;

  let data = props.data;
  data.services = remove_abbreviations(data.services, ["SE-", "PA-"]);
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
                      cod_convenio: element.cod_convenio,
                      nom_servicio: data.services.find(
                        (service) =>
                          service.cod_servicio === element.cod_servicio
                      ).nombre_servicio,
                      nom_entidad: row.razon_social_entidad,
                      fecha_inicial_convenio: element.fecha_inicial_convenio,
                      fecha_final_convenio: element.fecha_final_convenio,
                      cod_servicio: element.cod_servicio,
                      valor_servicio: element.valor_servicio,
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

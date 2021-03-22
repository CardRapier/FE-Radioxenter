import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

export default function TransactionsRow(props) {
  const { row, subdata } = props;
  let doctor = undefined;
  const filter_doctor = () => {
    doctor = [...subdata.doctor_entity];

    doctor = doctor.find(
      (aux) => aux.cod_doctor === row.Entidad_doctor.cod_doctor
    );
    return doctor.Doctor;
  };

  doctor = filter_doctor();

  return (
    <React.Fragment>
      <TableRow>
        <TableCell align="center" component="th" scope="row">
          {row.numero_transaccion}
        </TableCell>
        <TableCell align="center">{row.documento_usuario}</TableCell>
        <TableCell align="center">{row.fecha_transaccion}</TableCell>
        <TableCell align="center">{row.valor_transaccion}</TableCell>
        <TableCell align="center">{`${doctor.nombres_doctor} ${doctor.apellidos_doctor}`}</TableCell>
      </TableRow>
    </React.Fragment>
  );
}

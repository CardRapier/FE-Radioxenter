import Button from "@material-ui/core/Button";
import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

export default function UserConsentRow(props) {
  const { row, date, consent_name } = props;

  return (
    <React.Fragment>
      <TableRow>
        <TableCell align="center" component="th" scope="row">
          {date}
        </TableCell>
        <TableCell align="center">{consent_name}</TableCell>
        <TableCell align="center">
          <Button
            color="primary"
            size="small"
            href={`${
              process.env.REACT_APP_API_ROUTE
            }/files/pdf/consentimientos/${row.ubicacion_consentimiento
              .split("/")
              .pop()}`}
            target="_blank"
          >
            Ver Consentimiento
          </Button>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

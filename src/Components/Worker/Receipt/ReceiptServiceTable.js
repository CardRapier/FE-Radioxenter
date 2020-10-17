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
  const [services, setServices] = React.useState([
    { name: "Panorámica", price: "20000" },
    { name: "Senos Paranasales", price: "20000" },
    { name: "ATM", price: "20000" },
  ]);
  return (
    <React.Fragment>
      <TableContainer component={Paper}>
        <Table aria-label="table">
          <TableHead>
            <TableCell>Servicio</TableCell>
            <TableCell>Valor</TableCell>
          </TableHead>
          <TableBody>
            {services.length === 0 ? (
              <TableRow style={{ height: 100 }}>
                <TableCell colSpan={8} />
              </TableRow>
            ) : (
              services.map((service) => (
                <TableRow>
                  <TableCell>{service.name}</TableCell>
                  <TableCell>
                    <Grid container alignItems="center">
                      <Grid item xs={10}>
                        {service.price}
                      </Grid>
                      <Grid item xs={2}>
                        <IconButton>
                          <RemoveIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}

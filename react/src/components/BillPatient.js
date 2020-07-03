import React from "react";
import ReceiptIcon from "@material-ui/icons/Receipt";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import {connect} from 'react-redux';
import {updatePatient} from '../redux/actions/patient';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  newPaper: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
    marginTop: theme.spacing(3.8),
  },
  container: {
    maxHeight: 350,
  },
}));

function BillPatient(props) {
  const [open, setOpen] = React.useState(false);
  const patient = props.patient;
  const handleClickOpen = () => {
    setOpen(true);
  };
  const m_bill = (patient.medicines).reduce((acc, value) => { return acc + Number(value.quantity * value.medicines.rate) }, 0)
  const d_bill = (patient.diagnostics).reduce((acc, value) => { return acc + Number(value.diagnostics.rate) }, 0)
  const handleClose = () => {
    setOpen(false);
  };
  const date = (utc_format) => {
    return new Date(utc_format).toDateString();
  };

  const cur_date = () => {
    const dayjs = require('dayjs');
    let now = dayjs();
    return now.format("ddd MMMM D YYYY");
  };

  const discharged = () => {
    props.updatePatient({discharged: true}, patient.id, true);
    setOpen(false);
  }
  const difference = (d1, d2) => {
    const dayjs = require('dayjs');

    const date1 = dayjs(d1);
    const date2 = dayjs(d2);
    const ans = date2.diff(date1, "day");
    if (ans === 0) { return 1; }
    return ans;
  }

  const roomPrice = (days, type) => {
    if (type === "General") {
      return (2000 * days);
    }
    else if (type === "Shared") {
      return (4000 * days);
    }
    else {
      return (8000 * days);
    }
  }

  const classes = useStyles();

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <ReceiptIcon />
      </IconButton>
      <Dialog
        fullWidth
        maxWidth="lg"
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Patient Billing</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description"></DialogContentText>
          <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" className={classes.mtop}>
                Patient Details
                </Typography>
              <Paper className={classes.newPaper} variant="outlined">
                <TableContainer className={classes.container}>
                  <Table aria-label="simple table" size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Patient Id</TableCell>
                        <TableCell align="right">Name</TableCell>
                        <TableCell align="right">Age</TableCell>
                        <TableCell align="right">Address</TableCell>
                        <TableCell align="right">Admitted Date</TableCell>
                        <TableCell align="right">Date Of Discharge</TableCell>
                        <TableCell align="right">Type Of Room</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          {patient.id}
                        </TableCell>
                        <TableCell align="right">{patient.name}</TableCell>
                        <TableCell align="right">{patient.age}</TableCell>
                        <TableCell align="right">
                          {patient.address}
                        </TableCell>
                        <TableCell align="right">{date(patient.admited_on)}</TableCell>
                        <TableCell align="right">{cur_date()}</TableCell>
                        <TableCell align="right">{patient.type_of_bed}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="subtitle1" className={classes.mtop}>
                Pharmacy Charges
                </Typography>
              <Paper className={classes.newPaper} variant="outlined">
                <TableContainer className={classes.container}>
                  <Table aria-label="simple table" size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Medicine</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Rate</TableCell>
                        <TableCell align="right">Amount</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {patient.medicines.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell component="th" scope="row">
                            {item.medicines.name}
                          </TableCell>
                          <TableCell align="right">{item.quantity}</TableCell>
                          <TableCell align="right">
                            {item.medicines.rate}
                          </TableCell>
                          <TableCell align="right">
                            Rs. {item.quantity * item.medicines.rate}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="subtitle1" className={classes.mtop}>
                Diagnostics Charges
                </Typography>
              <Paper className={classes.newPaper} variant="outlined">
                <TableContainer className={classes.container}>
                  <Table aria-label="simple table" size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name Of The Test</TableCell>
                        <TableCell align="right">Amount</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {patient.diagnostics.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell component="th" scope="row">
                            {item.diagnostics.name}
                          </TableCell>
                          <TableCell align="right">
                            Rs. {item.diagnostics.rate}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="subtitle1" className={classes.mtop}>
                Sub Total
                </Typography>
              <Paper className={classes.newPaper} variant="outlined">
                <TableContainer className={classes.container}>
                  <Table aria-label="simple table" size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Service</TableCell>
                        <TableCell align="right">Amount</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          Room({difference(date(patient.admited_on), cur_date())})
                          </TableCell>
                        <TableCell align="right">Rs. {roomPrice(Number(difference(date(patient.admited_on), cur_date())), patient.type_of_bed)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          Pharmacy
                          </TableCell>
                        <TableCell align="right">Rs. {m_bill}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          Diagnostics
                          </TableCell>
                        <TableCell align="right">Rs. {d_bill}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
            <Grid item xs={8}>
              <Paper className={classes.paper} variant="outlined">
                <Typography variant="h4" align="right">
                  Grand Total: Rs. {m_bill + d_bill + roomPrice(Number(difference(date(patient.admited_on), cur_date())), patient.type_of_bed)}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            cancel
          </Button>
          <Button
            onClick={discharged}
            color="primary"
            autoFocus
            variant="contained"
            disableElevation
          >
            Confirm
          </Button>
          <Button onClick={() => window.print()} color="primary" variant="outlined">
            Print Bill
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

BillPatient.propTypes = {
  updatePatient: PropTypes.func.isRequired
}


export default connect(null, {updatePatient})(BillPatient);

import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import TableHead from "@material-ui/core/TableHead";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  viewAllButton: {
    marginRight: theme.spacing(1),
  },
  container: {
    maxHeight: 350,
  },
}));

function ViewAllPatients() {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles();
  return (
    <div>
      <Button
        color="inherit"
        className={classes.viewAllButton}
        onClick={handleClickOpen}
      >
        View All Patients
      </Button>
      <Dialog
        fullWidth
        maxWidth="md"
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">All Patient</DialogTitle>
        <form className={classes.form} noValidate>
          <DialogContent>
            <Paper className={classes.newPaper} variant="outlined">
              <TableContainer variant="outlined" className={classes.container}>
                <Table aria-label="simple table" size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Patient ID</TableCell>
                      <TableCell align="right">Name</TableCell>
                      <TableCell align="right">Age</TableCell>
                      <TableCell align="right">Address</TableCell>
                      <TableCell align="right">Admitted Date</TableCell>
                      <TableCell align="right">Type Of Room</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        123456789
                      </TableCell>
                      <TableCell align="right">Joseph</TableCell>
                      <TableCell align="right">56</TableCell>
                      <TableCell align="right">
                        Rick Street, Ameerpet, Hyderabad
                      </TableCell>
                      <TableCell align="right">03-may-2020</TableCell>
                      <TableCell align="right">Single</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default ViewAllPatients;

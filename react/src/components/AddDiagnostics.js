import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addDiagnosticPatient } from '../redux/actions/patient';

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
  mtop: {
    marginTop: theme.spacing(3),
  },
}));


function AddDiagnostics(props) {
  const [open, setOpen] = useState(false);
  const [id, setID] = useState(null);

  useEffect(() => {
    
    return () => {
      setOpen(false);
      setID(null);
    }
  }, [])

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const onChange = (event, newValue) => { if (newValue != null) { setID(newValue.id); } }
  const onSubmit = (e) => { e.preventDefault(); props.addDiagnosticPatient(id, props.patient_id); setID(null); setOpen(false);}

  const classes = useStyles();
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
        disableElevation
        fullWidth
        className={classes.mtop}
        disabled={!props.patient_id}
      >
        Add Diagnostics
      </Button>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Diagnostics</DialogTitle>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <DialogContent>
            <DialogContentText>Add Diagnosis Here</DialogContentText>
            <Autocomplete
              size="small"
              fullWidth
              id="combo-box-demo"
              options={props.diagnostic_master}
              onChange={onChange}
              getOptionLabel={(option) => option.name}
              getOptionSelected={option => option.id}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Diagnostics Name"
                  variant="outlined"
                />
              )}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button
              color="primary"
              variant="contained"
              disableElevation
              type="submit"
            >
              submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

AddDiagnostics.propTypes = {
  patient_id: PropTypes.number.isRequired,
  diagnostic_master: PropTypes.array.isRequired,
  addDiagnosticPatient: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  patient_id: state.patient.id,
  diagnostic_master: state.masterDiagnostic.master,
})

export default connect(mapStateToProps, { addDiagnosticPatient })(AddDiagnostics);

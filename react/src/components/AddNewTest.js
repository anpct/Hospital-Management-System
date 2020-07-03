import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addDiagnosticMaster } from "../redux/actions/masterDiagnostic";

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

function AddNewMedicine(props) {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({
    name: "",
    rate: 0,
  });
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    props.addDiagnosticMaster(state);
  };

  useEffect(() => {
    return () => {
      setState({
        name: "",
        rate: 0,
      });
    };
  }, []);

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
      >
        Add New test
      </Button>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add New Test</DialogTitle>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <DialogContent>
            <DialogContentText>Add Test Here</DialogContentText>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label="Name Of Diagnostic Test"
                  name="name"
                  size="small"
                  type="text"
                  value={state.name}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="rate"
                  label="Rate"
                  name="rate"
                  size="small"
                  type="number"
                  onChange={onChange}
                  value={state.rate}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={handleClose}
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

AddNewMedicine.propTypes = {
  addDiagnosticMaster: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { addDiagnosticMaster })(AddNewMedicine);

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getPatient,
  removeMedicinePatient,
  removeDiagnosticPatient,
  getAllPatients,
  deletePatient,
} from "../redux/actions/patient";
import {
  getMedicineMaster,
  removeMedicineMaster,
} from "../redux/actions/masterMedicine";
import {
  getDiagnosticMaster,
  removeDiagnosticMaster,
} from "../redux/actions/masterDiagnostic";

//MUI
import {
  makeStyles,
  Dialog,
  DialogActions,
  DialogTitle,
  Box,
  Button,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import SearchIcon from "@material-ui/icons/Search";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import CachedIcon from "@material-ui/icons/Cached";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

//Components
import { AddPatient } from "../components";
import { AddMedicine } from "../components";
import { AddNewMedicine } from "../components";
import { AddDiagnostics } from "../components";
import { UpdatePatient } from "../components";
import { BillPatient } from "../components";
import { AddNewTest } from "../components";

import dayjs from "dayjs";

var utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

const useStyles = makeStyles((theme) => ({
  tandb: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    color: theme.palette.primary[600],
  },
  root: {
    flexGrow: 1,
  },
  row: {
    height: "42px",
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
  },
  spacer: {
    flexGrow: 1,
  },
  paper: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
  },
  gpaper: {
    marginTop: theme.spacing(4),
    display: "flex",
    padding: theme.spacing(2),
  },

  mtop: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
  },
  newPaper: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
  },
  tablePaper: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
  },
  search: {
    borderRadius: "4px",
    alignItems: "center",
    padding: theme.spacing(1),
    display: "flex",
    flexBasis: 420,
  },
  input: {
    flexGrow: 1,
    fontSize: "14px",
    lineHeight: "16px",
    letterSpacing: "-0.05px",
  },
  table: {
    minWidth: 300,
  },
  container: {
    maxHeight: 250,
  },
  ncontainer: {
    maxHeight: 280,
  },
  bspan: {
    padding: "10px",
    backgroundColor: "#cfc",
  },
}));

const Dashboard = (props) => {
  useEffect(() => {
    if (props.role === "Desk") {
      props.getAllPatients();
    } else if (props.role === "Pharmacist") {
      props.getMedicineMaster();
    } else {
      props.getDiagnosticMaster();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onConfirm = () => {
    if (open[0] === "m") {
      props.removeMedicinePatient(open.slice(1));
      setOpen(false);
    } else if (open[0] === "d") {
      props.removeDiagnosticPatient(open.slice(1));
      setOpen(false);
    } else if (open[0] === "p") {
      props.deletePatient(open.slice(1));
      setOpen(false);
    } else if (open[0] === "h") {
      props.removeMedicineMaster(open.slice(1));
      setOpen(false);
    } else if (open[0] === "t") {
      props.removeDiagnosticMaster(open.slice(1));
      setOpen(false);
    }
  };

  const date = (utc_format) => {
    return new Date(utc_format).toDateString();
  };

  const handleSwitchChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const [state, setState] = useState({
    checkedB: true,
  });

  const classes = useStyles();
  const [search, setSearch] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [open, setOpen] = React.useState(false);
  const onChange = (e) => setSearch(e.target.value);
  const onSubmit = (e) => {
    e.preventDefault();
    props.getPatient(search);
    setSubmitted(true);
  };
  let roleDashboard =
    props.role === "Desk" ? (
      <React.Fragment>
        <div>
          <Paper className={classes.newPaper} variant="outlined">
            <div className={classes.row}>
              <form onSubmit={onSubmit}>
                <TextField
                  size="small"
                  id="search"
                  label="Search"
                  variant="outlined"
                  value={search}
                  onChange={onChange}
                  fullWidth
                  className={classes.input}
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton aria-label="search" type="submit">
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </form>
              <IconButton
                onClick={() => {
                  setSubmitted(false);
                }}
              >
                <CachedIcon />
              </IconButton>
              <FormControlLabel
                control={
                  <Switch
                    checked={state.checkedB}
                    onChange={handleSwitchChange}
                    name="checkedB"
                    color="primary"
                  />
                }
                label="Include Discharged Patients"
              />
              <span className={classes.spacer} />
              <AddPatient />
            </div>
            <hr className={classes.tandb} />
            <Typography variant="h5" align="center" className={classes.tandb}>
              Patient Details
            </Typography>
            <Paper className={classes.newPaper} variant="outlined">
              <TableContainer variant="outlined" className={classes.ncontainer}>
                <Table
                  className={classes.table}
                  aria-label="simple table"
                  size="small"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>Patient ID</TableCell>
                      <TableCell align="right">Name</TableCell>
                      <TableCell align="right">Age</TableCell>
                      <TableCell align="right">Address</TableCell>
                      <TableCell align="right">Admitted Date</TableCell>
                      <TableCell align="right">Type Of Room</TableCell>
                      <TableCell align="right">Update</TableCell>
                      <TableCell align="right">Delete</TableCell>
                      <TableCell align="right">Billing</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {!submitted ? (
                      props.allPatients.map((item) => {

                        if(state.checkedB){
                          return(
                        <TableRow
                          key={item.id}
                          style={
                            item.discharged
                              ? { background: "#fff44f" }
                              : item.fresh
                              ? { background: "#00FF7F" }
                              : {}
                          }
                        >
                          <TableCell component="th" scope="row">
                            {item.id}
                          </TableCell>
                          <TableCell align="right">{item.name}</TableCell>
                          <TableCell align="right">{item.age}</TableCell>
                          <TableCell align="right">{item.address}</TableCell>
                          <TableCell align="right">
                            {date(item.admited_on)}
                          </TableCell>
                          <TableCell align="right">
                            {item.type_of_bed}
                          </TableCell>
                          <TableCell align="right">
                            <UpdatePatient patient={item} />
                          </TableCell>
                          <TableCell align="right">
                            <IconButton
                              onClick={() => {
                                setOpen("p" + item.id);
                              }}
                            >
                              <DeleteForeverIcon />
                            </IconButton>
                          </TableCell>
                          <TableCell align="right">
                            <BillPatient patient={item} />
                          </TableCell>
                        </TableRow>
                      )}
                    
                    else{
                      if(!item.discharged){
                        return(
                          <TableRow
                            key={item.id}
                            style={
                              item.discharged
                                ? { background: "#fff44f" }
                                : item.fresh
                                ? { background: "#00FF7F" }
                                : {}
                            }
                          >
                            <TableCell component="th" scope="row">
                              {item.id}
                            </TableCell>
                            <TableCell align="right">{item.name}</TableCell>
                            <TableCell align="right">{item.age}</TableCell>
                            <TableCell align="right">{item.address}</TableCell>
                            <TableCell align="right">
                              {date(item.admited_on)}
                            </TableCell>
                            <TableCell align="right">
                              {item.type_of_bed}
                            </TableCell>
                            <TableCell align="right">
                              <UpdatePatient patient={item} />
                            </TableCell>
                            <TableCell align="right">
                              <IconButton
                                onClick={() => {
                                  setOpen("p" + item.id);
                                }}
                              >
                                <DeleteForeverIcon />
                              </IconButton>
                            </TableCell>
                            <TableCell align="right">
                              <BillPatient patient={item} />
                            </TableCell>
                          </TableRow>
                        )
                      }
                      else{
                        return null;
                      }
                    }
                    
                    
                    })
                    ) : props.patient.id && ((state.checkedB && props.patient.discharged) || (!props.patient.discharged)) ? (
                      <TableRow
                        key={props.patient.id}
                        style={
                          props.patient.discharged
                            ? { background: "#fff44f" }
                            : props.patient.fresh
                            ? { background: "#00FF7F" }
                            : {}
                        }
                      >
                        <TableCell component="th" scope="row">
                          {props.patient.id}
                        </TableCell>
                        <TableCell align="right">
                          {props.patient.name}
                        </TableCell>
                        <TableCell align="right">{props.patient.age}</TableCell>
                        <TableCell align="right">
                          {props.patient.address}
                        </TableCell>
                        <TableCell align="right">
                          {date(props.patient.admited_on)}
                        </TableCell>
                        <TableCell align="right">
                          {props.patient.type_of_bed}
                        </TableCell>
                        <TableCell align="right">
                          <UpdatePatient patient={props.patient} />
                        </TableCell>
                        <TableCell align="right">
                          <IconButton
                            onClick={() => {
                              setOpen("p" + props.patient.id);
                            }}
                          >
                            <DeleteForeverIcon />
                          </IconButton>
                        </TableCell>
                        <TableCell align="right">
                          <BillPatient patient={props.patient} />
                        </TableCell>
                      </TableRow>
                    ) : (
                      <></>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
            <Paper variant="outlined" className={classes.gpaper}>
              <span
                style={{
                  backgroundColor: "#00FF7F",
                  height: "15px",
                  width: "15px",
                  marginRight: "1%",
                }}
              />
              New/Updated Entry
              <span
                style={{
                  backgroundColor: "#fff44f",
                  height: "15px",
                  width: "15px",
                  marginRight: "1%",
                  marginLeft: "1%",
                }}
              />
              Discharged Patient
              <span
                style={{
                  backgroundColor: "white",
                  border: "1px solid grey",
                  height: "15px",
                  width: "15px",
                  marginRight: "1%",
                  marginLeft: "1%",
                }}
              />
              Exsisting Entry
            </Paper>
          </Paper>
        </div>
      </React.Fragment>
    ) : props.role === "Pharmacist" ? (
      <React.Fragment>
        <Paper variant="outlined" className={classes.newPaper}>
          <Grid container spacing={2} className={classes.root}>
            <Grid item md={4} sm={12} xs={12}>
              <form onSubmit={onSubmit}>
                <TextField
                  id="search"
                  label="Search"
                  variant="outlined"
                  onChange={onChange}
                  fullWidth
                  className={classes.Input}
                  required
                  value={search}
                  helperText="Enter only the Patient ID"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton aria-label="search" type="submit">
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </form>
            </Grid>
            <Grid item md={8} sm={12} xs={12}>
              <Paper variant="outlined" className={classes.newPaper}>
                <TableContainer
                  variant="outlined"
                  className={classes.container}
                >
                  <Table
                    className={classes.table}
                    aria-label="simple table"
                    size="small"
                  >
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
                      {!submitted ? (
                        <></>
                      ) : props.patient.id ? (
                        <TableRow
                          key={props.patient.id}
                          style={
                            props.patient.discharged
                              ? { background: "#fff44f" }
                              : props.patient.fresh
                              ? { background: "#00FF7F" }
                              : {}
                          }
                        >
                          <TableCell component="th" scope="row">
                            {props.patient.id}
                          </TableCell>
                          <TableCell align="right">
                            {props.patient.name}
                          </TableCell>
                          <TableCell align="right">
                            {props.patient.age}
                          </TableCell>
                          <TableCell align="right">
                            {props.patient.address}
                          </TableCell>
                          <TableCell align="right">
                            {date(props.patient.admited_on)}
                          </TableCell>
                          <TableCell align="right">
                            {props.patient.type_of_bed}
                          </TableCell>
                        </TableRow>
                      ) : (
                        <></>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
            <Grid item md={12} sm={12} xs={12}>
              <hr className={classes.tandb} />
            </Grid>
            <Grid item md={6} sm={12} xs={12}>
              <Typography variant="h6" align="center" className={classes.tandb}>
                Patient's Medicine Chart
              </Typography>
              <Paper className={classes.newPaper} variant="outlined">
                <TableContainer className={classes.container}>
                  <Table
                    aria-label="simple table"
                    size="small"
                    className={classes.table}
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>Medicine</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Rate </TableCell>
                        <TableCell align="right">Amount</TableCell>
                        <TableCell align="right">Remove</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {props.patient.medicines.map((item) => (
                        <TableRow
                          key={item.id}
                          style={item.fresh ? { background: "#00FF7F" } : {}}
                        >
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
                          <TableCell align="right">
                            <IconButton
                              onClick={() => {
                                setOpen("m" + item.id);
                              }}
                            >
                              <DeleteForeverIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <AddMedicine className={classes.tandb} />
              </Paper>
            </Grid>
            <Grid item md={6} sm={12} xs={12}>
              <Typography variant="h6" align="center" className={classes.tandb}>
                Pharmacy Stock
              </Typography>
              <Paper className={classes.newPaper} variant="outlined">
                <TableContainer
                  variant="outlined"
                  className={classes.container}
                >
                  <Table
                    aria-label="simple table"
                    size="small"
                    className={classes.table}
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>Medicine</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Rate </TableCell>
                        <TableCell align="right">Remove </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {props.master_med.map((item) => (
                        <TableRow
                          key={item.id}
                          style={item.fresh ? { background: "#00FF7F" } : {}}
                        >
                          <TableCell component="th" scope="row">
                            {item.name}
                          </TableCell>
                          <TableCell align="right">{item.quantity}</TableCell>
                          <TableCell align="right">{item.rate}</TableCell>
                          <TableCell align="right">
                            <IconButton
                              onClick={() => {
                                setOpen("h" + item.id);
                              }}
                            >
                              <DeleteForeverIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <AddNewMedicine className={classes.tandb} />
              </Paper>
            </Grid>
          </Grid>
          <Paper variant="outlined" className={classes.gpaper}>
            <span
              style={{
                backgroundColor: "#00FF7F",
                height: "15px",
                width: "15px",
                marginRight: "1%",
              }}
            />
            New/Updated Entry
            <span
              style={{
                backgroundColor: "#fff44f",
                height: "15px",
                width: "15px",
                marginRight: "1%",
                marginLeft: "1%",
              }}
            />
            Discharged Patient
            <span
              style={{
                backgroundColor: "white",
                border: "1px solid grey",
                height: "15px",
                width: "15px",
                marginRight: "1%",
                marginLeft: "1%",
              }}
            />
            Exsisting Entry
          </Paper>
        </Paper>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <Paper variant="outlined" className={classes.newPaper}>
          <Grid container spacing={2} className={classes.root}>
            <Grid item md={4} sm={12} xs={12}>
              <form onSubmit={onSubmit}>
                <TextField
                  id="search"
                  label="Search"
                  variant="outlined"
                  onChange={onChange}
                  fullWidth
                  value={search}
                  className={classes.Input}
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton aria-label="search" type="submit">
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </form>
            </Grid>
            <Grid item md={8} sm={12} xs={12}>
              <Paper variant="outlined" className={classes.newPaper}>
                <TableContainer
                  variant="outlined"
                  className={classes.container}
                >
                  <Table
                    className={classes.table}
                    aria-label="simple table"
                    size="small"
                  >
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
                      {!submitted ? (
                        <></>
                      ) : props.patient.id ? (
                        <TableRow
                          key={props.patient.id}
                          style={
                            props.patient.discharged
                              ? { background: "#fff44f" }
                              : props.patient.fresh
                              ? { background: "#00FF7F" }
                              : {}
                          }
                        >
                          <TableCell component="th" scope="row">
                            {props.patient.id}
                          </TableCell>
                          <TableCell align="right">
                            {props.patient.name}
                          </TableCell>
                          <TableCell align="right">
                            {props.patient.age}
                          </TableCell>
                          <TableCell align="right">
                            {props.patient.address}
                          </TableCell>
                          <TableCell align="right">
                            {date(props.patient.admited_on)}
                          </TableCell>
                          <TableCell align="right">
                            {props.patient.type_of_bed}
                          </TableCell>
                        </TableRow>
                      ) : (
                        <></>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
            <Grid item md={12} sm={12} xs={12}>
              <hr className={classes.tandb} />
            </Grid>
            <Grid item md={6} sm={12} xs={12}>
              <Typography variant="h6" align="center" className={classes.tandb}>
                Patient's Diagnostics Chart
              </Typography>
              <Paper className={classes.newPaper} variant="outlined">
                <TableContainer className={classes.container}>
                  <Table
                    aria-label="simple table"
                    size="small"
                    className={classes.table}
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>Name Of The Test</TableCell>
                        <TableCell align="right">Amount</TableCell>
                        <TableCell align="right">Remove</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {props.patient.diagnostics.map((item) => (
                        <TableRow
                          key={item.id}
                          style={item.fresh ? { background: "#00FF7F" } : {}}
                        >
                          <TableCell component="th" scope="row">
                            {item.diagnostics.name}
                          </TableCell>
                          <TableCell align="right">
                            Rs. {item.diagnostics.rate}
                          </TableCell>
                          <TableCell align="right">
                            <IconButton
                              onClick={() => {
                                setOpen("d" + item.id);
                              }}
                            >
                              <DeleteForeverIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <AddDiagnostics className={classes.tandb} />
              </Paper>
            </Grid>
            <Grid item md={6} sm={12} xs={12}>
              <Typography variant="h6" align="center" className={classes.tandb}>
                Diagnostics Available
              </Typography>
              <Paper className={classes.newPaper} variant="outlined">
                <TableContainer
                  variant="outlined"
                  className={classes.container}
                >
                  <Table
                    aria-label="simple table"
                    size="small"
                    className={classes.table}
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>Name Of Test</TableCell>
                        <TableCell align="right">Amount</TableCell>
                        <TableCell align="right">Remove</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {props.diagnostic_master.map((item) => (
                        <TableRow
                          key={item.id}
                          style={item.fresh ? { background: "#00FF7F" } : {}}
                        >
                          <TableCell component="th" scope="row">
                            {item.name}
                          </TableCell>
                          <TableCell align="right">Rs. {item.rate}</TableCell>
                          <TableCell align="right">
                            <IconButton
                              onClick={() => {
                                setOpen("t" + item.id);
                              }}
                            >
                              <DeleteForeverIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <AddNewTest className={classes.tandb} />
              </Paper>
            </Grid>
          </Grid>
          <Paper variant="outlined" className={classes.gpaper}>
            <span
              style={{
                backgroundColor: "#00FF7F",
                height: "15px",
                width: "15px",
                marginRight: "1%",
              }}
            />
            New/Updated Entry
            <span
              style={{
                backgroundColor: "#fff44f",
                height: "15px",
                width: "15px",
                marginRight: "1%",
                marginLeft: "1%",
              }}
            />
            Discharged Patient
            <span
              style={{
                backgroundColor: "white",
                border: "1px solid grey",
                height: "15px",
                width: "15px",
                marginRight: "1%",
                marginLeft: "1%",
              }}
            />
            Exsisting Entry
          </Paper>
        </Paper>
      </React.Fragment>
    );
  return (
    <div>
      <Container maxWidth="lg">
        <Box>
          <Dialog
            maxWidth="sm"
            open={open ? true : false}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">ARE YOU SURE?</DialogTitle>
            <DialogActions>
              <Button
                color="primary"
                onClick={() => {
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                variant="contained"
                disableElevation
                type="submit"
                onClick={onConfirm}
              >
                YES
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
        <Box>{roleDashboard}</Box>
      </Container>
    </div>
  );
};

Dashboard.propTypes = {
  role: PropTypes.string.isRequired,
  getPatient: PropTypes.func.isRequired,
  patient: PropTypes.object.isRequired,
  getMedicineMaster: PropTypes.func.isRequired,
  master_med: PropTypes.array.isRequired,
  removeMedicinePatient: PropTypes.func.isRequired,
  removeDiagnosticPatient: PropTypes.func.isRequired,
  getDiagnosticMaster: PropTypes.func.isRequired,
  diagnostic_master: PropTypes.array.isRequired,
  getAllPatients: PropTypes.func.isRequired,
  allPatients: PropTypes.array.isRequired,
  deletePatient: PropTypes.func.isRequired,
  removeMedicineMaster: PropTypes.func.isRequired,
  removeDiagnosticMaster: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  role: state.auth.user.role,
  patient: state.patient,
  master_med: state.masterMedicine.master,
  diagnostic_master: state.masterDiagnostic.master,
  allPatients: state.allPatients.result,
});

const mapDispatchToProps = {
  getPatient,
  getMedicineMaster,
  removeMedicinePatient,
  removeDiagnosticPatient,
  getDiagnosticMaster,
  getAllPatients,
  deletePatient,
  removeMedicineMaster,
  removeDiagnosticMaster,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

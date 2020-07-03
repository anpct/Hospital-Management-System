import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../redux/actions/auth";

//MUI
import { makeStyles } from "@material-ui/styles";
import { AppBar, Toolbar, Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "none",
  },
  flexGrow: {
    flexGrow: 1,
  },
  spaceRight: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
    color: "white",
  },
}));

const Navbar = (props) => {
  const classes = useStyles();
  return (
    <div>
      <AppBar className={classes.root}>
        <Toolbar>
          <Typography
            variant="h5"
            className={classes.title}
            component={Link}
            to={"/"}
          >
            ABC
          </Typography>
          <div className={classes.flexGrow} />
          { props.isAuthenticated?
          <>
          <Button
            className={classes.spaceRight}
            color="inherit"
            disableElevation
            onClick = {()=>{props.logout()}}
          >
            sign out
          </Button>
          </>:
          <>
          <Button
            className={classes.spaceRight}
            color="inherit"
            variant="outlined"
            component={Link}
            to={'/signup'}
          >
            sign up
          </Button>
          </>
          }   
        </Toolbar>
      </AppBar>
      ;
    </div>
  );
}

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state =>({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {logout})(Navbar);

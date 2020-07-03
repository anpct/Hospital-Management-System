import React from "react";

//MUI
import { makeStyles } from "@material-ui/styles";
import { Grid, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
  content: {
    paddingTop: 150,
    textAlign: "center",
  },
  image: {
    marginTop: 50,
    display: "inline-block",
    maxWidth: "100%",
    width: 560,
  },
  icon: {
    fontSize: 100,
  },
}));

function NotFound() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container justify="center" spacing={4}>
        <Grid item lg={6} xs={12}>
          <div className={classes.content}>
            <CloseIcon color="error" className={classes.icon} />
            <Typography variant="h5">
              404: The page you are looking for isn’t here
            </Typography>
            <Typography variant="subtitle1">
              You either tried some shady route or you came here by mistake.
              Whichever it is, try using the navigation
            </Typography>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default NotFound;

import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import styles from "../theme";

const Header = props => {
  const { classes } = props;
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="absolute" className={classNames(classes.appBar)}>
        <Toolbar disableGutters={false} className={classes.toolbar}>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            className={classNames(classes.menuButton)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="title"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

Header.propTypes = {
  classes: PropTypes.shape({}).isRequired
};

export default withStyles(styles)(Header);

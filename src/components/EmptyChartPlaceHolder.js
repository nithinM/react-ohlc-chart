import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import styles from "../theme";

const EmptyChartPlaceHolder = props => {
  const { classes } = props;
  return (
    <Card
      className={classNames(
        classes.card,
        classes.cardFullHeight,
        classes.cardCenterContent
      )}
    >
      <CardContent>
        <Typography
          className={classes.title}
          variant="headline"
          gutterBottom
          color="textSecondary"
        >
          Please select a company to view data!
        </Typography>
        <Typography component="p">
          Your selected companies are listed in left panel, Please click on one
          of them to load data..
        </Typography>
      </CardContent>
    </Card>
  );
};

EmptyChartPlaceHolder.propTypes = {
  classes: PropTypes.shape({}).isRequired
};

export default withStyles(styles)(EmptyChartPlaceHolder);

import React from "react";
import PropTypes from "prop-types";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List/List";
import Divider from "@material-ui/core/Divider/Divider";

const SideItemList = ({ symbolList, handleListClick }) => (
  <List dense>
    {symbolList &&
      Object.keys(symbolList).map(item => (
        <React.Fragment key={symbolList[item].value}>
          <ListItem
            button
            onClick={() =>
              handleListClick({
                symbol: symbolList[item].value,
                label: symbolList[item].label
              })
            }
          >
            <ListItemText primary={symbolList[item].label} />
          </ListItem>
          <Divider />
        </React.Fragment>
      ))}
  </List>
);

SideItemList.propTypes = {
  symbolList: PropTypes.arrayOf(PropTypes.any).isRequired,
  handleListClick: PropTypes.func.isRequired
};

export default SideItemList;

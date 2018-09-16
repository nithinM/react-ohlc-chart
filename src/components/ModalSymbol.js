import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CompanyMultiSelect from "./CompanyMultiSelect";

const ModalSymbol = ({
  handleSelectChange,
  handleClose,
  open,
  apiSymbolData,
  symbolList
}) => (
  <Dialog
    disableBackdropClick
    disableEscapeKeyDown
    open={open}
    onClose={handleClose}
    aria-labelledby="form-dialog-title"
  >
    <DialogTitle id="form-dialog-title">Add companies</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Please select to add multiple companies to your dashboard.
      </DialogContentText>
      <CompanyMultiSelect
        apiSymbolData={apiSymbolData}
        symbolList={symbolList}
        handleSelectChange={handleSelectChange}
      />
    </DialogContent>
    <DialogActions>
      <Button
        disabled={symbolList.length <= 0}
        onClick={handleClose}
        color="primary"
      >
        Cancel
      </Button>
    </DialogActions>
  </Dialog>
);

ModalSymbol.propTypes = {
  handleSelectChange: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  apiSymbolData: PropTypes.arrayOf(PropTypes.any).isRequired,
  symbolList: PropTypes.arrayOf(PropTypes.any).isRequired
};

export default ModalSymbol;

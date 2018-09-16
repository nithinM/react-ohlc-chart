import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const CompanyMultiSelect = ({
  apiSymbolData,
  symbolList,
  handleSelectChange
}) => (
  <Select
    defaultValue={symbolList || null}
    isMulti
    name="colors"
    options={apiSymbolData}
    className="basic-multi-select"
    classNamePrefix="select"
    menuPortalTarget={document.body}
    isSearchable
    menuPosition="fixed"
    menuPlacement="bottom"
    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
    onChange={handleSelectChange}
  />
);

CompanyMultiSelect.propTypes = {
  apiSymbolData: PropTypes.arrayOf(PropTypes.any).isRequired,
  symbolList: PropTypes.arrayOf(PropTypes.any).isRequired,
  handleSelectChange: PropTypes.func.isRequired
};

export default CompanyMultiSelect;

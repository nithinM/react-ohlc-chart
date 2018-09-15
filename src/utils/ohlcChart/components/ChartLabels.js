import React from "react";
import PropTypes from "prop-types";

const ChartLabels = ({
  x,
  y,
  fill,
  fontFamily,
  fontSize,
  textAnchor,
  date
}) => (
  <text
    x={x}
    y={y}
    fill={fill}
    fontFamily={fontFamily}
    fontSize={fontSize}
    textAnchor={textAnchor}
  >
    {date}
  </text>
);

ChartLabels.defaultProps = {
  fill: "#444",
  fontFamily: "Arial",
  fontSize: "12px",
  textAnchor: "middle"
};

ChartLabels.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  fill: PropTypes.string,
  fontFamily: PropTypes.string,
  fontSize: PropTypes.string,
  textAnchor: PropTypes.string
};

export default ChartLabels;

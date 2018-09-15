import React from "react";
import PropTypes from "prop-types";

const ChartXGrid = ({
  x1,
  y1,
  x2,
  y2,
  fill,
  shapeRendering,
  stroke,
  strokeDasharray,
  strokeWidth
}) => (
  <line
    x1={x1}
    y1={y1}
    x2={x2}
    y2={y2}
    fill={fill}
    shapeRendering={shapeRendering}
    stroke={stroke}
    strokeDasharray={strokeDasharray}
    strokeWidth={strokeWidth}
  />
);

ChartXGrid.defaultProps = {
  fill: "none",
  shapeRendering: "crispEdges",
  stroke: "#ccc",
  strokeDasharray: "5,2",
  strokeWidth: "1"
};

ChartXGrid.propTypes = {
  x1: PropTypes.number.isRequired,
  y1: PropTypes.number.isRequired,
  x2: PropTypes.number.isRequired,
  y2: PropTypes.number.isRequired,
  fill: PropTypes.string,
  shapeRendering: PropTypes.string,
  stroke: PropTypes.string,
  strokeDasharray: PropTypes.string,
  strokeWidth: PropTypes.string
};

export default ChartXGrid;

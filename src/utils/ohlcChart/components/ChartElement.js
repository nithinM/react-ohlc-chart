import React from "react";
import PropTypes from "prop-types";

const ChartElement = ({
  apiData,
  drawingHeight,
  yAxisValues,
  xAxisValues,
  xGridGap
}) => {
  const yGap = drawingHeight / yAxisValues.length;
  const yAxisMaxVal = yAxisValues[yAxisValues.length - 1];
  const apiDataDates = Object.keys(apiData);
  return xAxisValues.map((date, index) => {
    const moveToStartPoint = (index + 1) * xGridGap;
    if (apiDataDates.includes(date)) {
      const yHigh = yAxisMaxVal + 1 - parseFloat(apiData[date]["2. high"]);
      const yLow = yAxisMaxVal + 1 - parseFloat(apiData[date]["3. low"]);
      const yOpen = yAxisMaxVal + 1 - parseFloat(apiData[date]["1. open"]);
      const yClose = yAxisMaxVal + 1 - parseFloat(apiData[date]["4. close"]);
      const yHighPoint = yGap * yHigh;
      const yLowPoint = yGap * yLow;
      const yOpenPoint = yGap * yOpen;
      const yClosePoint = yGap * yClose;
      const strokeColor =
        parseFloat(apiData[date]["1. open"]) >
        parseFloat(apiData[date]["4. close"])
          ? "#f50057"
          : "#4caf50";
      return (
        <path
          key={date}
          d={`M ${moveToStartPoint}, ${yHighPoint} L ${moveToStartPoint}, ${yLowPoint}
      M ${moveToStartPoint}, ${yOpenPoint}  L ${moveToStartPoint -
            5}, ${yOpenPoint} M ${moveToStartPoint}, ${yClosePoint}  L ${moveToStartPoint +
            5}, ${yClosePoint}`}
          stroke={strokeColor}
          strokeWidth="2"
          fill="none"
        />
      );
    }

    return null;
  });
};

ChartElement.propTypes = {
  apiData: PropTypes.shape({}).isRequired,
  drawingHeight: PropTypes.number.isRequired,
  yAxisValues: PropTypes.arrayOf(PropTypes.any).isRequired,
  xAxisValues: PropTypes.arrayOf(PropTypes.any).isRequired,
  xGridGap: PropTypes.number.isRequired
};

export default ChartElement;

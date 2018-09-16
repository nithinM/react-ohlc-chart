import React from "react";
import PropTypes from "prop-types";
import Moment from "moment";
import { extendMoment } from "moment-range";
import ChartXGrid from "./components/ChartXGrid";
import ChartLabels from "./components/ChartLabels";
import ChartElement from "./components/ChartElement";

const moment = extendMoment(Moment);

class OhlcChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawingWidth: 0,
      drawingHeight: 0,
      hasError: false
    };
    this.svgRef = React.createRef();
  }

  componentDidMount() {
    const { paddingTop, paddingBottom, paddingLeft, paddingRight } = this.props;
    const drawingHeight =
      this.svgRef.current.clientHeight - (paddingTop + paddingBottom);
    const drawingWidth =
      this.svgRef.current.clientWidth - (paddingLeft + paddingRight);

    this.setState({
      drawingWidth,
      drawingHeight
    });
  }

  getMinY = data =>
    Object.keys(data).reduce(
      (min, currentVal) =>
        parseFloat(data[currentVal]["3. low"]) < min
          ? parseFloat(data[currentVal]["3. low"])
          : min,
      data[Object.keys(data)[0]]["3. low"]
    );

  getMaxY = data =>
    Object.keys(data).reduce(
      (high, currentVal) =>
        parseFloat(data[currentVal]["2. high"]) > high
          ? parseFloat(data[currentVal]["2. high"])
          : high,
      data[Object.keys(data)[0]]["2. high"]
    );

  getYAxisValues = (yMaxVal, yMinVal) => {
    const valueArray = [];
    for (
      let i = Math.ceil((yMinVal - 10) / 10) * 10;
      i <= Math.ceil((yMaxVal + 1) / 10) * 10;
      i += 1
    ) {
      valueArray.push(i);
    }

    return valueArray;
  };

  getDateRange = (startDate, endDate) => {
    const start = moment(startDate, "YYYY-MM-DD");
    const end = moment(endDate, "YYYY-MM-DD");
    const range = moment.range(start, end);
    const acc = Array.from(range.by("days"));
    return acc.map(m => m.format("YYYY-MM-DD"));
  };

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    console.log(error, info); // eslint-disable-line no-console
  }

  render() {
    const {
      apiData,
      chartWidth,
      chartHeight,
      paddingTop,
      paddingRight,
      paddingBottom,
      paddingLeft
    } = this.props;

    const { drawingHeight, drawingWidth, hasError } = this.state;

    const svgStyle = {
      padding: `${paddingTop} ${paddingRight} ${paddingBottom} ${paddingLeft}`
    };

    if (Object.keys(apiData).length > 0 && !hasError) {
      const yMinVal = this.getMinY(apiData);
      const yMaxVal = this.getMaxY(apiData);
      const apiDataDatesArray = Object.keys(apiData);
      const xAxisValues = this.getDateRange(
        apiDataDatesArray[apiDataDatesArray.length - 1],
        apiDataDatesArray[0]
      );
      const xGridGap = (drawingWidth - 100) / xAxisValues.length;
      const yAxisValues = this.getYAxisValues(yMaxVal, yMinVal);

      return (
        <svg
          ref={this.svgRef}
          width={chartWidth}
          height={chartHeight}
          style={svgStyle}
        >
          <g className="chart__grid">
            {xAxisValues.map((item, index) => (
              <ChartXGrid
                key={item}
                x1={(index + 1) * xGridGap}
                y1={drawingHeight / yAxisValues.length}
                x2={(index + 1) * xGridGap}
                y2={drawingHeight}
                fill="none"
                shapeRendering="crispEdges"
                stroke="#ccc"
                strokeDasharray="5,2"
                strokeWidth="1"
              />
            ))}
          </g>

          <g className="chart__axis chart__axis--x">
            {xAxisValues.map((item, index) => {
              let chartXGrid = null;
              if (index % 10 === 0) {
                chartXGrid = (
                  <ChartXGrid
                    key={item}
                    x1={(index + 1) * xGridGap}
                    y1={drawingHeight + 1}
                    x2={(index + 1) * xGridGap}
                    y2={drawingHeight + 5}
                    fill="none"
                    shapeRendering="crispEdges"
                    stroke="#666"
                    strokeWidth="1"
                  />
                );
              }

              return chartXGrid;
            })}
          </g>

          <g className="chart__labels chart__labels--x">
            {xAxisValues.map((item, index) => {
              let chartLabels = null;
              if (index % 10 === 0) {
                chartLabels = (
                  <ChartLabels
                    key={item}
                    x={(index + 1) * xGridGap}
                    y={drawingHeight + 20}
                    fill="#666"
                    fontFamily="Roboto"
                    fontSize="12px"
                    textAnchor="middle"
                    date={item}
                  />
                );
              }

              return chartLabels;
            })}
          </g>

          <g className="chart__axis chart__axis--y">
            {yAxisValues.map((item, index) => (
              <line
                key={item}
                x1="-5"
                y1={
                  drawingHeight - index * (drawingHeight / yAxisValues.length)
                }
                x2="0"
                y2={
                  drawingHeight - index * (drawingHeight / yAxisValues.length)
                }
                fill="none"
                shapeRendering="crispEdges"
                stroke="#666"
                strokeWidth="1"
              />
            ))}
          </g>

          <g className="zui-chart-labels zui-chart-labels-y">
            {yAxisValues.map((item, index) => (
              <text
                key={item}
                x="-10"
                y={drawingHeight - index * (drawingHeight / yAxisValues.length)}
                fill="#666"
                fontFamily="Roboto"
                fontSize="12px"
                textAnchor="end"
              >
                <tspan alignmentBaseline="middle">$ {item}</tspan>
              </text>
            ))}
          </g>

          <path
            d={`M 0 ${drawingHeight} l ${drawingWidth - 80} 0`}
            stroke="#666"
            strokeWidth="1"
            fill="none"
          />

          <path
            d={`M 0 0 L 0 ${drawingHeight}`}
            stroke="#666"
            strokeWidth="1"
            fill="none"
          />

          <ChartElement
            apiData={apiData}
            drawingHeight={drawingHeight}
            yAxisValues={yAxisValues}
            xAxisValues={xAxisValues}
            xGridGap={xGridGap}
          />
        </svg>
      );
    }
    return (
      <svg
        ref={this.svgRef}
        width={chartWidth}
        height={chartHeight}
        style={svgStyle}
      />
    );
  }
}

OhlcChart.defaultProps = {
  apiData: {},
  chartWidth: "75%",
  chartHeight: "75%",
  paddingTop: 20,
  paddingRight: 30,
  paddingBottom: 30,
  paddingLeft: 50
};

OhlcChart.propTypes = {
  apiData: PropTypes.shape({}),
  chartWidth: PropTypes.string,
  chartHeight: PropTypes.string,
  paddingTop: PropTypes.number,
  paddingRight: PropTypes.number,
  paddingBottom: PropTypes.number,
  paddingLeft: PropTypes.number
};
export default OhlcChart;

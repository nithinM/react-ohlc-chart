import React from "react";
import apiFetch from "../utils/apiFetch";
import OhlcChart from "../utils/ohlcChart";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiData: {}
    };
  }

  async componentDidMount() {
    const apiData = await apiFetch();
    const chartData = apiData["Time Series (Daily)"];
    this.setState({ apiData: chartData });
  }

  // async componentDidUpdate(prevProps, prevState) {}

  render() {
    const { apiData } = this.state;
    return (
      <OhlcChart
        apiData={apiData}
        chartWidth="75%"
        chartHeight="75%"
        paddingTop={20}
        paddingRight={30}
        paddingBottom={30}
        paddingLeft={50}
      />
    );
  }
}

export default Dashboard;

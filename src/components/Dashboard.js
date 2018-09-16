import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import CircularProgress from "@material-ui/core/CircularProgress";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import styles from "../theme";
import { timeSeriesDailyApi, getNasdaqSymbolsApi } from "../utils/apiFetch";
import OhlcChart from "../utils/ohlcChart";
import Header from "./Header";
import SideItemList from "./SideItemList";
import EmptyChartPlaceHolder from "./EmptyChartPlaceHolder";
import ModalSymbol from "./ModalSymbol";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiData: {},
      apiSymbolData: [],
      symbolList: props.symbols,
      isLoading: Object.keys(props.symbols).length <= 0,
      modalSymbolOpen: false,
      selectSymbol: null,
      selectCompany: null
    };
  }

  componentDidMount() {
    const { symbolList } = this.state;
    if (Object.keys(symbolList).length <= 0) {
      this.fetchSymbols();
    }
  }

  fetchApiData = async e => {
    this.setState({ isLoading: true });
    const apiData = await timeSeriesDailyApi(e.symbol);
    if (apiData.status === "success") {
      this.setState({
        isLoading: false,
        apiData: apiData.data["Time Series (Daily)"],
        selectSymbol: e.symbol,
        selectCompany: e.label
      });
    } else {
      this.setState({
        isLoading: false
      });
    }
  };

  fetchSymbols = async () => {
    const apiSymbolData = await getNasdaqSymbolsApi("nasdaq");
    if (apiSymbolData.status === "success") {
      const modifiedApiSymbolData = apiSymbolData.data.map(item => ({
        value: item.Symbol,
        label: item.Name
      }));
      this.setState({
        isLoading: false,
        apiSymbolData: modifiedApiSymbolData
      });
      this.handleClickOpen();
    } else {
      this.setState({
        isLoading: false
      });
    }
  };

  handleClickOpen = () => {
    this.setState({ modalSymbolOpen: true });
  };

  handleClose = () => {
    this.setState({ modalSymbolOpen: false });
  };

  handleSelectChange = e => {
    localStorage.setItem("ohlcSymbolsData", JSON.stringify(e));
    this.setState({ symbolList: e });
  };

  handleListClick = e => {
    this.fetchApiData(e);
  };

  render() {
    const { classes } = this.props;
    const {
      apiData,
      symbolList,
      isLoading,
      modalSymbolOpen,
      selectSymbol,
      selectCompany,
      apiSymbolData
    } = this.state;
    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <Header />
          {isLoading ? (
            <div className={classes.progressWrapper}>
              <CircularProgress size={50} />
            </div>
          ) : (
            <React.Fragment>
              <Drawer
                variant="permanent"
                classes={{
                  paper: classNames(classes.drawerPaper)
                }}
                open
              >
                <div className={classes.toolbarIcon}>
                  <IconButton>
                    <ChevronLeftIcon />
                  </IconButton>
                </div>
                <Divider />
                <SideItemList
                  symbolList={symbolList}
                  handleListClick={this.handleListClick}
                />
              </Drawer>
              <main className={classes.content}>
                {symbolList && selectSymbol ? (
                  <Card
                    className={classNames(
                      classes.card,
                      classes.cardFullHeight,
                      classes.cardCenterContent
                    )}
                  >
                    <CardContent className={classes.CardContentFull}>
                      <Typography variant="headline">
                        {selectCompany} - Open-high-low-close Chart
                      </Typography>
                      <OhlcChart
                        apiData={apiData}
                        chartWidth="100%"
                        chartHeight="90%"
                        paddingTop={20}
                        paddingRight={30}
                        paddingBottom={30}
                        paddingLeft={50}
                      />
                    </CardContent>
                  </Card>
                ) : (
                  <EmptyChartPlaceHolder />
                )}
              </main>
            </React.Fragment>
          )}
          <ModalSymbol
            handleSelectChange={this.handleSelectChange}
            handleClose={this.handleClose}
            open={modalSymbolOpen}
            apiSymbolData={apiSymbolData}
            symbolList={symbolList}
          />
        </div>
      </React.Fragment>
    );
  }
}

Dashboard.propTypes = {
  symbols: PropTypes.arrayOf(PropTypes.any).isRequired,
  classes: PropTypes.shape({}).isRequired
};

export default withStyles(styles)(Dashboard);

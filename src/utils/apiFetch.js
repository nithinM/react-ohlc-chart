import { apiKeyAlphavantage, apiAlphavantage, apiSymbols } from "../config/api";

export const timeSeriesDailyApi = async symbol => {
  let response = "";
  try {
    const res = await apiAlphavantage.get(
      `query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKeyAlphavantage}`
    );
    console.log("res.data", res.data); // eslint-disable-line no-console
    response = { status: "success", data: res.data };
  } catch (e) {
    response = { status: "error", statusCode: e.response.status };
  }

  return response;
};

export const getNasdaqSymbolsApi = async stockExchange => {
  let response = "";
  try {
    const res = await apiSymbols.get(`${stockExchange}-symbol.json`);
    response = { status: "success", data: res.data };
  } catch (e) {
    response = { status: "error", statusCode: e.response.status };
  }

  return response;
};

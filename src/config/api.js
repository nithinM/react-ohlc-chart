import axios from "axios";

export const apiKeyAlphavantage = "7WPLTPG56DTR4WO8";

export const apiAlphavantage = axios.create({
  baseURL: `https://www.alphavantage.co/`
});

export const apiSymbols = axios.create({
  baseURL: `https://s3.amazonaws.com/assets.stockohlc.tk/data/`
});

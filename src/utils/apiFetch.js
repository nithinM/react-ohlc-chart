import API from "../config/api";

export default async () => {
  const response = await API.get(
    `query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=demo`
  );
  return response.data;
};

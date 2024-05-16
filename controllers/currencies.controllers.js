const currencyInfo = require("../currencies.json");

const get = (request, response) => {
  response.send("<h1>Welcome to node-express currency server</h1>");
};

const getServer = (request, response) => {
  response.status(200).json({
    server: "node-express server",
    port: port2,
    time: new Date().toLocaleTimeString(),
  });
};

const getCurrencies = (request, response) => {
  const { minSize } = request.query;
  if (minSize) {
    const filteredCurrency = currencyInfo.data.filter(
      (x) => x?.min_size >= Number(minSize)
    );
    response.json(filteredCurrency);
  } else {
    response.json(currencyInfo.data);
  }
};

const getCurrenciesById = (request, response) => {
  const { id } = request.params;
  const findCurrency = currencyInfo.data.find(
    (x) => x.id?.toLowerCase() === id?.toLowerCase()
  );
  response.status(200).json(findCurrency);
};

const postCurrencies = (request, response) => {
  const newList = [{ ...request.body }, ...currencyInfo.data];
  console.log(newList);
};

module.exports = {
  get,
  getServer,
  getCurrencies,
  getCurrenciesById,
  postCurrencies,
};

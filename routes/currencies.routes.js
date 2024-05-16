const {
  get,
  getServer,
  getCurrencies,
  getCurrenciesById,
  postCurrencies,
} = require("../controllers/currencies.controllers");

const currenciesRouter = require("express").Router();

currenciesRouter.get("/", get);
currenciesRouter.get("/server", getServer);
currenciesRouter.get("/currencies", getCurrencies);
currenciesRouter.post("/currencies/new", postCurrencies);
currenciesRouter.get("/currencies/:id", getCurrenciesById);

module.exports = currenciesRouter;

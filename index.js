const http = require("http");
const cors = require("cors");
const express = require("express");
const port1 = 8081;
require("dotenv").config();
const mongoose = require("mongoose");

const DB_URI = "mongodb://localhost:27017/blogsdb";

const usersInfo = require("./users.json");
const currencyInfo = require("./currencies.json");
const currenciesRouter = require("./routes/currencies.routes");
const usersRouter = require("./routes/users.routes");
const verifyAuthentication = require("./middlewares/verifyauth");
const blogsRouter = require("./routes/blogs.router");

const server = http.createServer((request, response) => {
  if (request.method === "GET") {
    const id = request.url.split("/")[2];
    const findIdCurrency = currencyInfo.data.find(
      (x) => x.id?.toLowerCase() === id?.toLowerCase()
    );
    if (request.url === "/") {
      response.write("<h1>Welcome to node-http server</h1>");
      response.end();
    } else if (request.url === "/server") {
      response.writeHead(200, { "Content-Type": "application/json" });
      response.write(
        JSON.stringify({
          server: "Node HTTP server",
          port: port1,
          time: new Date().toTimeString(),
        })
      );
      response.end();
    } else if (request.url === "/currencies") {
      response.writeHead(200, { "Content-Type": "application/json" });
      response.write(JSON.stringify(currencyInfo.data));
      response.end();
    } else if (request.url === "/users") {
      response.writeHead(200, { "Content-Type": "application/json" });
      response.write(JSON.stringify(usersInfo.data));
      response.end();
    } else if (findIdCurrency) {
      response.writeHead(200, { "Content-Type": "application/json" });
      response.write(JSON.stringify(findIdCurrency));
      response.end();
    }
  } else if (request.method === "POST") {
    if (request.url === "/currency") {
      let body = "";
      request
        .on("error", (error) => {
          console.log(error);
        })
        .on("data", (chunk) => {
          body += chunk;
        })
        .on("end", () => {
          body = JSON.parse(body);
          currencyInfo.data = [...currencyInfo.data, body];
          response.writeHead(200, { "Content-Type": "appication/json" });
          response.write(JSON.stringify(currencyInfo.data));
          response.end();
        });
    }
  }
});

server.listen(port1, () => {
  console.log(`Listening the http-node server on port: ${port1}`);
});
/////////////////////////// //////////////////////////////////////////////////////////
const port2 = 8082;

const currencyExpress = express();

currencyExpress.use(express.json());
currencyExpress.use("/", currenciesRouter);

currencyExpress.listen(port2, () => {
  console.log(`Listening the node-express server on port: ${port2}`);
});

const port3 = 8083;

const usersExpress = express();

usersExpress.use(verifyAuthentication);
usersExpress.use(express.json());
usersExpress.use("/", usersRouter);

usersExpress.listen(port3, () => {
  console.log(`Listening the node-express server on port: ${port3}`);
});

const port4 = 8084;

const blogsExpress = express();
blogsExpress.use(cors());
blogsExpress.use(express.json());
blogsExpress.use("/blog", blogsRouter);

mongoose
  .connect(DB_URI)
  .then(() => {
    console.log("Succesfully connected to mongodb database");

    blogsExpress.listen(port4, () => {
      console.log(`Listening mongodb server at port: ${port4}`);
    });
  })
  .catch(() => {
    console.log("Failed connecting to mongo db");
  });

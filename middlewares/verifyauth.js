let PASSWORD = process.env.ROUTE_PASSWORD;

const verifyAuthentication = (request, response, next) => {
  let authorization = request.headers["authorization"];

  if (!authorization || authorization !== PASSWORD) {
    return response.status(403).json({ message: "Unauthorized access" });
  }

  next();
};

module.exports = verifyAuthentication;

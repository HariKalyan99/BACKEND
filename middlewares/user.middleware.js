const searchQuery = require("../validators/users.validators");

const userValidator = (request, response, next) => {
  const { gender, age } = request.query;

  const error = searchQuery({ gender, age });

  if (error) {
    return response.status(422).json({ message: error });
  }

  next();
};

module.exports = userValidator;

const Joi = require("joi");

const userSchema = Joi.object()
  .keys({
    gender: Joi.string().valid("male", "female").lowercase(),
    age: Joi.number().integer().min(0).max(100),
  })
  .or("gender", "age");

const searchQuery = ({ gender, age }) => {
  const validator = userSchema.validate({
    gender,
    age,
  });

  if (validator.error) {
    return validator.error;
  }
};

module.exports = searchQuery;

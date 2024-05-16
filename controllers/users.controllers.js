const usersSchema = require("../middlewares/user.middleware");
const usersInfo = require("../users.json");

const getUserDashboard = (request, response) => {
  response.send("<h1>Welcome to node-express user server</h1>");
};

const getUserServer = (request, response) => {
  response.status(200).json({
    server: "node-express server",
    port: port3,
    time: new Date().toLocaleTimeString(),
  });
};

const getUsers = (request, response) => {
  return response.json(usersInfo.data);
};

const getUsersSearch = (request, response) => {
  const { gender, age } = request.query;

  // const validator = usersSchema.validate({
  //   gender,
  //   age,
  // });

  // if (validator.error) {
  //   return response.status(422).json({ message: validator.error });
  // }

  if (gender && age) {
    const newList = usersInfo.data.filter(
      (x) => x.gender === gender.toLowerCase() && x.dob.age === Number(age)
    );
    return response.json(newList);
  }

  if (gender) {
    const newList = usersInfo.data.filter((x) => x.gender === gender);
    return response.json(newList);
  }
  if (age) {
    const newList = usersInfo.data.filter((x) => x.dob.age === Number(age));
    return response.json(newList);
  }
};

const getUSersByUuid = (request, response) => {
  const { uuid } = request.params;
  const findUuid = usersInfo.data.find((x) => x.login.uuid === uuid);
  response.json(findUuid);
};

module.exports = {
  getUserDashboard,
  getUserServer,
  getUsers,
  getUSersByUuid,
  getUsersSearch,
};

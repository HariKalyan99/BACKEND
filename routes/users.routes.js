const {
  getUserDashboard,
  getUserServer,
  getUsers,
  getUSersByUuid,
  getUsersSearch,
} = require("../controllers/users.controllers");
const userValidator = require("../middlewares/user.middleware");

const usersRouter = require("express").Router();

usersRouter.get("/", getUserDashboard);
usersRouter.get("/server", getUserServer);
usersRouter.get("/users", getUsers);
usersRouter.get("/users/search", userValidator, getUsersSearch);
usersRouter.get("/users/:uuid", getUSersByUuid);

module.exports = usersRouter;

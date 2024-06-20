const { Router } = require("express");
const userController = require("../controllers/userController");
const { validation } = require("../middleware");

class UserRouter {
  router;
  constructor() {
    this.router = Router();
    this.setupRoutes();
  }

  setupRoutes() {
    this.router.post("/register", validation.validateRegistration, userController.register);
    this.router.post("/login", validation.validateLogin, userController.login);
  }
}

module.exports = UserRouter;
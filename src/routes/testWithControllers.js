const { TestControllers } = require("../controllers");

class TestWithControllersRouter {
	router;
	constructor() {
		this.router = require("express").Router();

		// Initilaize the routers
		this.setupRouters();
	}

	// Fill your routers here!
	setupRouters() {
		this.router.get("/test2", TestControllers.index);
	}
}
module.exports = TestWithControllersRouter;

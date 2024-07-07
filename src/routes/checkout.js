const { Router } = require("express");
const checkoutController = require("../controllers/checkout");

class checkoutRouter {
    router;
    constructor() {
        this.router = Router();
        this.setupRoutes();
    }

    setupRoutes() {
        this.router.get("/checkout", checkoutController.listCheckout);
    }
}

module.exports = checkoutRouter;

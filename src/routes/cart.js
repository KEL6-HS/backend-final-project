const { Router } = require("express");
const cartController = require("../controllers/cart");

class cartRouter {
  router;
  constructor() {
    this.router = Router();
    this.setupRoutes();
  }

  setupRoutes() {
    this.router.post("/cart", cartController.create);
    this.router.get("/cart/:user_id", cartController.showMyCart);
    this.router.get("/cart/get/:id", cartController.show);
    this.router.delete("/cart/get/:id", cartController.delete);
    this.router.put("/cart/update", cartController.update);
  }
}

module.exports = cartRouter;

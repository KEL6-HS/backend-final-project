const { Router } = require("express");
const product = require("../controllers/product");

class ProductRouter {
	rotuer;
	constructor() {
		this.router = Router();
		this.setupRoutes();
	}

	setupRoutes() {
		this.router.get("/product/get", product.index);
		this.router.get("/product/get/:id", product.show);
		this.router.post("/product/create", product.create);
		this.router.put("/product/update", product.update);
		this.router.delete("/product/get", product.delete);
	}
}

module.exports = ProductRouter;

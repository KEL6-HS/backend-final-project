const { Router } = require("express");
const productTag = require("../controllers/product_tag");

class ProductTagRouter {
	rotuer;
	constructor() {
		this.router = Router();
		this.setupRoutes();
	}

	setupRoutes() {
		this.router.get("/product-tag/get", productTag.index);
		this.router.post("/product-tag/create", productTag.create);
		this.router.put("/product-tag/update", productTag.update);
		this.router.delete("/product-tag/get", productTag.delete);
	}
}

module.exports = ProductTagRouter;

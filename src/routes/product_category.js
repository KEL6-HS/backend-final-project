const { Router } = require("express");
const productCategory = require("../controllers/product_category");

class ProductCategoryRouter {
	rotuer;
	constructor() {
		this.router = Router();
		this.setupRoutes();
	}

	setupRoutes() {
		this.router.get("/product-category/get", productCategory.index);
		this.router.post("/product-category/create", productCategory.create);
		this.router.put("/product-category/update", productCategory.update);
		this.router.delete("/product-category/get", productCategory.delete);
	}
}

module.exports = ProductCategoryRouter;

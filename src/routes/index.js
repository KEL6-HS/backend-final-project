// const TestRouter = require("./test");
// const TestWithControllersRouter = require("./testWithControllers");
const ProductCategoryRouter = require("./product_category");
const ProductTagRouter = require("./product_tag");
const ProductRouter = require("./product");

const UserRouter = require("./user");

const CartRouter = require("./cart"); 

module.exports = {
	// TestRouter,
	// TestWithControllersRouter,
	UserRouter,

	CartRouter,

	ProductCategoryRouter,
	ProductTagRouter,
	ProductRouter,
};

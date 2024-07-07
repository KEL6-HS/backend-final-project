// const TestRouter = require("./test");
// const TestWithControllersRouter = require("./testWithControllers");
const ProductCategoryRouter = require("./product_category");
const ProductTagRouter = require("./product_tag");
const ProductRouter = require("./product");

const UserRouter = require("./user");

const CartRouter = require("./cart");
const CheckoutRouter = require("./checkout");

module.exports = {
    // TestRouter,
    // TestWithControllersRouter,
    UserRouter,

    CartRouter,
    CheckoutRouter,

    ProductCategoryRouter,
    ProductTagRouter,
    ProductRouter,
};

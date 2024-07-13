// const TestControllers = require("./test");
const UserController = require("./userController");
const ProductCategoryController = require("./product_category");
const ProductTagController = require("./product_tag");
const ProductController = require("./product");
const CartController = require("./cart");
const CheckoutController = require("./checkout");

module.exports = {
    // TestControllers,
    UserController,

    CartController,
    CheckoutController,

    ProductCategoryController,
    ProductTagController,
    ProductController,
};

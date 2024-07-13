const {
    filterModel,
    paginationBuilder,
    paginationResponse,
    validateRequestAndExtract,
} = require("../helper/utils");

const Checkout = require("../models/checkout");
const User = require("../models/user");
const Carts = require("../models/cart");
const Product = require("../models/product");
const { Sequelize } = require("sequelize");

module.exports = {
    async listCheckout(req, res) {
        const { userId } = req.user; // token
        const { cart_id } = req.body;

        // get detail user
        const user = await User.findAll({
            attributes: { exclude: ["email", "password"] },
            where: {
                id: userId,
            },
        });

        // list produk yang akan di checkout
        const cart = await Carts.findAll({
            where: {
                cart_id,
            },
            include: [
                {
                    model: Product,
                    as: "product_detail",
                },
            ],
            attributes: [
                [
                    Sequelize.literal("product_detail.price*cart.quantity"),
                    "total_amount",
                ],
            ],
        });

        let total_price = 0;

        cart.forEach((product_detail) => {
            total_price += product_detail.dataValues.total_amount;
        });

        return res.json({ user, cart, total_price });
    },
};

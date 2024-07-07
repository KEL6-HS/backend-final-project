const {
    filterModel,
    paginationBuilder,
    paginationResponse,
    validateRequestAndExtract,
} = require("../helper/utils");
const Carts = require("../models/cart");

module.exports = {
    async create(req, res) {
        const form = await validateRequestAndExtract(req, {
            user_id: "required|exists:users,id",
            product_id: "required|exists:products,id",
            quantity: "required",
        });

        if (!form.validate)
            return res.status(412).json({
                errors: form.errors,
            });

        Carts.create(form.body);

        return res.json({
            message: "berhasil menambahkan cart",
        });
    },

    async showMyCart(req, res) {
        const { user_id } = req.params;
        const data = await Carts.findAll({
            where: {
                user_id,
            },
        });
        if (!data)
            return res.status(404).json({
                errors: "Cart tidak ditemukan",
            });

        return res.json({
            data,
        });
    },

    async show(req, res) {
        const { id } = req.params;
        const data = await Carts.findByPk(id, {});
        if (!data)
            return res.status(404).json({
                errors: "Cart tidak ditemukan",
            });

        return res.json({
            data,
        });
    },

    async delete(req, res) {
        const id = req.params.id;
        const data = await Carts.findByPk(id, {});
        if (!data)
            return res.status(404).json({
                errors: "data tidak ada",
            });

        await data.destroy();

        return res.json({
            message: "Berhasil menghapus cart",
        });
    },

    async update(req, res) {
        const { userId } = req.user;
        const { cart_id } = req.body;
        const form = await validateRequestAndExtract(req, {
            cart_id: "required|exists:carts,cart_id",
            product_id: "required|exists:products,id",
            quantity: "required",
        });

        if (!form.validate)
            return res.status(412).json({
                errors: form.errors,
            });

        const data = await Carts.findByPk(cart_id);
        if (!data)
            return res.status(404).json({
                errors: "Data tidak ditemukan",
            });
        else if (userId !== data.user_id)
            return res.status(403).json({
                errors: "Akses tidak diberikan",
            });

        delete form.body.id;
        await data.update(form.body);

        return res.json({
            message: "Berhasil mengubah card",
        });
    },

    async payment(req, res) {
        const { userId } = req.user;
        const { cart_id, payment_at } = req.body;

        const data = await Carts.findByPk(cart_id);
        if (!data)
            return res.status(404).json({
                errors: "Data tidak ditemukan",
            });
        else if (userId !== data.user_id)
            return res.status(403).json({
                errors: "Akses tidak diberikan",
            });

        await data.update({
            is_payment: true,
            payment_at,
        });

        return res.json({
            data,
        });
    },
};

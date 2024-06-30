const {
	paginationBuilder,
	paginationResponse,
	validateRequestAndExtract,
} = require("../helper/utils");
const ProductsTag = require("../models/product_tag");

module.exports = {
	/**
	 *
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	async index(req, res) {
		return res.json(
			paginationResponse(
				req,
				await ProductsTag.findAndCountAll({
					...paginationBuilder(req),
				})
			)
		);
	},

	/**
	 *
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	async create(req, res) {
		const form = await validateRequestAndExtract(req, {
			name: "required",
		});

		if (!form.validate)
			return res.status(412).json({
				errors: form.errors,
			});

		ProductsTag.create(form.body);

		return res.json({
			message: "Berhasil menambahkan tag produk",
		});
	},

	/**
	 *
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	async update(req, res) {
		const form = await validateRequestAndExtract(req, {
			id: "required",
			name: "required",
		});

		if (!form.validate)
			return res.status(412).json({
				errors: form.errors,
			});

		const data = await ProductsTag.findByPk(form.body.id);
		if (!data)
			return res.status(404).json({
				errors: "Data tidak ditemukan",
			});

		delete form.body.id;
		await data.update(form.body);

		return res.json({
			message: "Berhasil mengubah tag produk",
		});
	},

	/**
	 *
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	async delete(req, res) {
		const form = await validateRequestAndExtract(req, {
			id: "required",
		});

		if (!form.validate)
			return res.status(412).json({
				errors: form.errors,
			});

		const data = await ProductsTag.findByPk(form.body.id);
		if (!data)
			return res.status(404).json({
				errors: "Data tidak ditemukan",
			});

		delete form.body.id;
		await data.destroy();

		return res.json({
			message: "Berhasil menghapus tag produk",
		});
	},
};

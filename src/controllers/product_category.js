const {
	paginationBuilder,
	paginationResponse,
	validateRequestAndExtract,
} = require("../helper/utils");
const ProductsCategory = require("../models/product_category");

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
				await ProductsCategory.findAndCountAll({
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

		ProductsCategory.create(form.body);

		return res.json({
			message: "Berhasil menambahkan kategori produk",
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

		const data = await ProductsCategory.findByPk(form.body.id);
		if (!data)
			return res.status(500).json({
				errors: "Data tidak ditemukan",
			});

		delete form.body.id;
		await data.update(form.body);

		return res.json({
			message: "Berhasil mengubah kategori produk",
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

		const data = await ProductsCategory.findByPk(form.body.id);
		if (!data)
			return res.status(500).json({
				errors: "Data tidak ditemukan",
			});

		delete form.body.id;
		await data.destroy();

		return res.json({
			message: "Berhasil menghapus kategori produk",
		});
	},
};

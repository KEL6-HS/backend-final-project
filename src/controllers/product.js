const {
	paginationBuilder,
	paginationResponse,
	validateRequestAndExtract,
	filterModel,
} = require("../helper/utils");
const Products = require("../models/product");
const ProductsCategory = require("../models/product_category");

module.exports = {
	/**
	 *
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	async index(req, res) {
		const categoryId = req.query["category"] ?? null;
		const tagId = req.query["tag"] ?? null;

		let filterRelationship = {};
		if (categoryId) filterRelationship["categoryId"] = categoryId;
		if (tagId) filterRelationship["tagId"] = tagId;

		return res.json(
			paginationResponse(
				req,
				await Products.findAndCountAll({
					...paginationBuilder(req),
					where: {
						...filterModel(req, Products),
						...filterRelationship,
					},
				})
			)
		);
	},

	/**
	 *
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	async show(req, res) {
		const id = req.params.id;
		const data = await Products.findByPk(id, {});
		if (!data)
			return res.status(404).json({
				errors: "Data tidak ditemukan",
			});

		return res.json({
			data,
		});
	},

	/**
	 *
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	async create(req, res) {
		const form = await validateRequestAndExtract(req, {
			categoryId: "required|exists:products_categories,id",
			tagId: "required|exists:products_tags,id",
			name: "required",
			img: "required",
			price: "required",
			description: "required",
		});

		if (!form.validate)
			return res.status(412).json({
				errors: form.errors,
			});

		Products.create(form.body);

		return res.json({
			message: "Berhasil menambahkan produk",
		});
	},

	/**
	 *
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	async update(req, res) {
		const form = await validateRequestAndExtract(req, {
			categoryId: "required|exists:products_categories,id",
			tagId: "required|exists:products_tags,id",
			name: "required",
			img: "required",
			price: "required",
			description: "required",
			id: "required",
		});

		if (!form.validate)
			return res.status(412).json({
				errors: form.errors,
			});

		const data = await Products.findByPk(form.body.id);
		if (!data)
			return res.status(404).json({
				errors: "Data tidak ditemukan",
			});

		delete form.body.id;
		await data.update(form.body);

		return res.json({
			message: "Berhasil mengubah produk",
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

		const data = await Products.findByPk(form.body.id);
		if (!data)
			return res.status(404).json({
				errors: "Data tidak ditemukan",
			});

		delete form.body.id;
		await data.destroy();

		return res.json({
			message: "Berhasil menghapus produk",
		});
	},
};

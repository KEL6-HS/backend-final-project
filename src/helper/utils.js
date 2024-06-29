const { Op, DataTypes } = require("sequelize");
const { InitialRules, make } = require("simple-body-validator");

require("./validator");

class Utils {
	/**
	 * Macro to create validate request
	 *
	 * @param {import("express").Request} req
	 * @param {import("simple-body-validator").InitialRules}
	 */
	static async validateRequest(req, rules) {
		const validator = make(req.body, rules);

		return {
			validate: await validator.validateAsync(),
			errors: validator.errors().all(),
		};
	}

	/**
	 * Macro to create validate request and extract body
	 *
	 * @param {import("express").Request} req
	 * @param {import("simple-body-validator").InitialRules}
	 * @returns
	 */
	static async validateRequestAndExtract(req, rules) {
		let body = {};
		Object.keys(rules).forEach((key) => (body[key] = req.body[key]));

		return {
			...(await Utils.validateRequest(req, rules)),
			body,
		};
	}

	/**
	 * Create pagination
	 *
	 * @param {import("express").Request} req
	 * @param {any} model
	 * @returns
	 */
	static paginationBuilder(req, model) {
		const limit = parseInt(req.query["perPage"] ?? "15");
		const page = parseInt(req.query["page"] ?? "1");
		const offset = page * limit;

		return {
			limit,
			offset: offset - limit,
		};
	}

	/**
	 * Formating pagination response
	 *
	 * @param {*} result
	 */
	static paginationResponse(req, result) {
		const limit = parseInt(req.query["perPage"] ?? "15");
		const page = parseInt(req.query["page"] ?? "1");
		let totalPage = result.count / limit;

		if (totalPage <= 0) totalPage = 1;
		totalPage = Math.round(totalPage);

		return {
			data: result.rows,
			perPage: limit,
			page: page,
			totalPage,
		};
	}

	/**
	 * Create filter of model, put this on where attr
	 * @param {import("express").Request} req
	 * @param {import("sequelize").ModelCtor} model
	 */
	static filterModel(req, model) {
		const filter = [];
		if (!req.query["filter"]) return {};

		Object.keys(model.rawAttributes).map((field) => {
			const attribute = model.rawAttributes[field];

			if (
				attribute.type instanceof DataTypes.STRING ||
				attribute.type instanceof DataTypes.TEXT
			) {
				let obj = {};
				obj[field] = {
					[Op.like]: "%" + (req.query["filter"] ?? "-") + "%",
				};

				filter.push(obj);
			}
		});

		return {
			[Op.or]: filter,
		};
	}
}

module.exports = Utils;

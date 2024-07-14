const { register } = require("simple-body-validator");
const sequelize = require("../database");
const { QueryTypes } = require("sequelize");

// Create custom body validator

/**
 * Check is data exists
 */
register(
	"exists",
	async (value, parameters, attribute) => {
		const table = parameters[0];
		const primaryKey = parameters[1];

		const query = await sequelize.query(
			{
				query: `SELECT * FROM ${table} WHERE ${primaryKey} = ? LIMIT 1`,
				values: [parseInt(value)],
			},
			{
				type: QueryTypes.SELECT,
			}
		);

		if (query.length > 0) return true;
		else return false;
	},
	(message, parameters, data) => {
		return "Data not exists";
	}
);

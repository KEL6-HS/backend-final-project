const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const ProductsTag = sequelize.define("products_tag", {
	name: {
		type: DataTypes.STRING,
	},
});

module.exports = ProductsTag;

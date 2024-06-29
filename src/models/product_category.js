const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const ProductsCategory = sequelize.define("products_category", {
	name: {
		type: DataTypes.STRING,
	},
});

module.exports = ProductsCategory;

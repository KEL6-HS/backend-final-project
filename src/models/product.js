const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const ProductsCategory = require("./product_category");
const ProductsTag = require("./product_tag");

const Products = sequelize.define("products", {
	categoryId: {
		type: DataTypes.INTEGER,
		allowNull: true,
		references: {
			model: ProductsCategory,
		},
	},
	tagId: {
		type: DataTypes.INTEGER,
		allowNull: true,
		references: {
			model: ProductsTag,
		},
	},
	name: {
		type: DataTypes.STRING,
	},
	img: {
		type: DataTypes.TEXT,
	},
	price: {
		type: DataTypes.DOUBLE,
		defaultValue: 0,
	},
	discount_price: {
		type: DataTypes.DOUBLE,
		allowNull: true,
	},
	description: {
		type: DataTypes.TEXT,
	},
	available_size: {
		type: DataTypes.STRING,
		defaultValue: "XXL,XL,L,S",
	},
	available_color: {
		type: DataTypes.STRING(1000),
		defaultValue: "Black,Blue,Yellow,Red,White",
	},
});

// Relationship

module.exports = Products;

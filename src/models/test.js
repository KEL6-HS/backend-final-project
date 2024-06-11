const { DataTypes } = require("sequelize");
const { db } = require("../server");

const TestModel = db.define("test", {
	name: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	release_date: {
		type: DataTypes.DATEONLY,
	},
	subject: {
		type: DataTypes.INTEGER,
	},
});

module.exports = { TestModel };

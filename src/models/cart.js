const { DataTypes, BelongsTo } = require("sequelize");
const sequelize = require("../database");
const Product = require("./product");

const Cart = sequelize.define(
    "cart",
    {
        cart_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Product,
            },
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        is_payment: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: false,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
        payment_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        tableName: "carts",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

Cart.belongsTo(Product, {
    foreignKey: "product_id",
    as: "product_detail",
});

module.exports = Cart;

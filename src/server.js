require("dotenv").config();

const express = require("express");
const { Sequelize } = require("sequelize");

const PORT = process.env.SERVER_PORT || 3000;

class Server {
	#expressApp;

	/**
	 * @type {import("sequelize").Sequelize}
	 */
	static db;

	constructor(routers = []) {
		this.#expressApp = express();

		// Configuring middleware
		this.#middleware();

		// Configuring routers
		this.#setupRouters(routers);

		// Configuring database
		this.#setupDatabase();
	}

	// Private function for booting
	#middleware() {
		this.#expressApp.use(express.urlencoded({ extended: true }));
		this.#expressApp.use(express.json());
	}

	// Setup for routers
	#setupRouters(routers = []) {
		routers.forEach((expressRouter) => {
			this.#expressApp.use(expressRouter.router);
		});
	}

	// Setup for database (static function so other file can use "db" easily)
	#setupDatabase() {
		Server.db = new Sequelize(
			process.env.DB_NAME || "test_db",
			process.env.DB_USERNAME || "test",
			process.env.DB_PASSWORD || "",
			{
				host: process.env.DB_HOST || "localhost",
				dialect: process.env.DB_TYPE || "mysql",
			}
		);

		Server.db
			.authenticate()
			.then(() => {
				console.log(`Database ${process.env.DB_NAME} connected!`);

				// Sync the models
				require("./models");

				Server.db
					.sync()
					.then(() => {
						console.log("Synchronize successfully!");
					})
					.catch((error) => {
						console.error("Unable to synchronize models : ", error);
					});
			})
			.catch((error) => {
				console.error("Unable to connect to the database: ", error);
			});
	}

	// Start the http service
	start() {
		this.#expressApp.listen(PORT, () => {
			console.log(`Listening to port ${PORT}`);
		});
	}
}

module.exports = Server;

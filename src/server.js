require("dotenv").config();

const express = require("express");
const cors = require("cors");
const sequelize = require("./database");
const User = require("./models/user");
const { authenticateToken } = require("./middleware/auth");
const UserRouter = require("./routes/user");

const bodyParser = require("body-parser");
const multer = require("multer");
const upload = multer();

const PORT = process.env.SERVER_PORT || 3000;

class Server {
	#expressApp;

	constructor(routers = []) {
		this.#expressApp = express();
		this.#middleware();
		this.#setupRouters(routers);
	}

	#middleware() {
		this.#expressApp.use(cors());
		this.#expressApp.use(bodyParser.urlencoded({ extended: true }));
		this.#expressApp.use(bodyParser.json());
		this.#expressApp.use(upload.array());

		// Auth setup
		this.#expressApp.use(authenticateToken);
	}

	#setupRouters(routers = []) {
		routers.forEach((expressRouter) => {
			this.#expressApp.use(expressRouter.router);
		});

		this.#expressApp.get("/users", async (req, res) => {
			try {
				const users = await User.findAll();
				res.json(users);
			} catch (error) {
				console.error("Failed to fetch users:", error);
				res.status(500).json({ error: "Internal server error" });
			}
		});
	}

	async start() {
		try {
			await sequelize.authenticate();
			console.log(`Database connected to ${process.env.DB_NAME}`);

			// Sync models
			await sequelize.sync({
				// alter: true,
				// force: true,
			});

			// Start server
			this.#expressApp.listen(PORT, () => {
				console.log(`Server is running on http://localhost:${PORT}`);
			});
		} catch (error) {
			console.error("Failed to connect to database:", error);
		}
	}
}

module.exports = Server;
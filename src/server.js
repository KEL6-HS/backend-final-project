require('dotenv').config();

const express = require('express');
const { Sequelize } = require('sequelize');

const PORT = process.env.SERVER_PORT || 3000;

class Server {
  #expressApp;

  /**
   * @type {import('sequelize').Sequelize}
   */
  static db;

  constructor(routers = []) {
    this.#expressApp = express();

    // Configuring middleware
    this.#middleware();

    // Configuring routers (initial empty)
    this.#setupRouters(routers);
  }

  #middleware() {
    this.#expressApp.use(express.urlencoded({ extended: true }));
    this.#expressApp.use(express.json());
  }

  #setupRouters(routers = []) {
    routers.forEach((expressRouter) => {
      this.#expressApp.use(expressRouter.router);
    });
  }

  async #setupDatabase() {
    Server.db = new Sequelize(
		process.env.DB_NAME,
		process.env.DB_USERNAME,
		process.env.DB_PASSWORD,
		{
		  host: process.env.DB_HOST,
		  dialect: process.env.DB_TYPE,
		  port: process.env.DB_PORT,
		  logging: console.log, // Enable logging for debugging
		}
	  );
  
	  try {
		await Server.db.authenticate();
		console.log(`Database ${process.env.DB_NAME} connected!`);
  
		// Sync the models
		require('./models');
		await Server.db.sync();
		console.log('Synchronize successfully!');
	  } catch (error) {
		console.error('Unable to connect or synchronize models:', error);
		throw error; // Rethrow the error to handle in main script
	  }
  }

  start() {
    this.#expressApp.listen(PORT, () => {
      console.log(`Listening to port ${PORT}`);
    });
  }
}

module.exports = Server;
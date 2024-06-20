require('dotenv').config();
const express = require('express');
const sequelize = require('./database');
const User = require('./models/user');

const PORT = process.env.SERVER_PORT || 3000;

class Server {
  #expressApp;

  constructor(routers = []) {
    this.#expressApp = express();
    this.#middleware();
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

    this.#expressApp.get('/users', async (req, res) => {
      try {
        const users = await User.findAll();
        res.json(users);
      } catch (error) {
        console.error('Failed to fetch users:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });
  }

  async start() {
    try {
      await sequelize.authenticate();
      console.log(`Database connected to ${process.env.DB_NAME}`);

      // Sync models
      await sequelize.sync();

      // Start server
      this.#expressApp.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
      });
    } catch (error) {
      console.error('Failed to connect to database:', error);
    }
  }
}

module.exports = Server;
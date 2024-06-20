const { TestRouter, TestWithControllersRouter, UserRouter } = require('./routes');
const Server = require('./server');

async function main() {
    const server = new Server([]);
  
    try {
      await server.setupDatabase();
      server.setupRouters([new TestRouter(), new TestWithControllersRouter()]);
      server.start();
    } catch (error) {
      console.error('Failed to initialize server:', error);
    }
  }
  
  main();
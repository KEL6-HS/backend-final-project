const {
  // TestRouter,
  // TestWithControllersRouter,
  UserRouter,
} = require("./routes");
const Server = require("./server");

async function main() {
  const server = new Server([
    // new TestRouter(),
    // new TestWithControllersRouter(),
    new UserRouter(),
  ]);

  try {
    await server.start();
  } catch (error) {
    console.error("Failed to initialize server:", error);
  }
}

main();

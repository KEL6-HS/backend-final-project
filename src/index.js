const { TestRouter, TestWithControllersRouter } = require("./routes");
const Server = require("./server");

new Server([new TestRouter(), new TestWithControllersRouter()]).start();

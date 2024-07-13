const {
    // TestRouter,
    // TestWithControllersRouter,
    UserRouter,

    CartRouter,
    CheckoutRouter,

    ProductCategoryRouter,
    ProductTagRouter,
    ProductRouter,
} = require("./routes");
const Server = require("./server");

async function main() {
    const server = new Server([
        // new TestRouter(),
        // new TestWithControllersRouter(),

        new UserRouter(),

        new CartRouter(),
        new CheckoutRouter(),

        new ProductCategoryRouter(),
        new ProductTagRouter(),
        new ProductRouter(),
    ]);

    try {
        await server.start();
    } catch (error) {
        console.error("Failed to initialize server:", error);
    }
}

main();

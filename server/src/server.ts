import { createServer, Server } from "http";
import app from "./app";
import { Config } from "./config";
import { connectRedis } from "./redis";

let server: Server;
const port = Config.PORT || 5000;

process.on("uncaughtException", (err) => {
  console.error("😈 uncaughtException detected, shutting down...", err);
  if (server) {
    server.close(() => process.exit(1));
  } else {
    process.exit(1);
  }
});

process.on("unhandledRejection", (err) => {
  console.error("😈 unhandledRejection detected, shutting down...", err);
  if (server) {
    server.close(() => process.exit(1));
  } else {
    process.exit(1);
  }
});

async function main() {
  try {
    server = createServer(app);
    await connectRedis();
    server.listen(port, () => {
      console.log(`✅ Server running on port ${port} `);
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
}

main();

import { createClient } from "redis";
import { Config } from "../config";

const redisClient = createClient({
  url: Config.REDIS_URL,
});

redisClient.on("error", (err) => {
  console.error("Redis Client Error:", err);
});

export const connectRedis = async () => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
    console.log("🔴 Redis connected successfully!");
  }
};

export default redisClient;

import app from "./app";
import { nanoid } from "nanoid";

const PORT = parseInt(process.env.PORT || "3004");

const envToLogger = {
  development: {
    transport: {
      target: "./lib/pino-pretty",
    },
  },
  production: true,
  test: false,
};

export const build = () =>
  app({
    logger: envToLogger[process.env.NODE_ENV === "production" ? "production" : "development"],
    genReqId: (req) => nanoid(12),
  });

const start = async () => {
  const fastify = build();
  try {
    await fastify.listen({ port: PORT });
  } catch (err: any) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

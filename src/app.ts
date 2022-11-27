import Fastify, { FastifyServerOptions } from "fastify";

const app = (config: FastifyServerOptions) => {
    const fastify = Fastify(config);
    
    return fastify;
};
export default app;
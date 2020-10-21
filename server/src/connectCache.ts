import { createClient } from 'redis';
import redisConnect from 'connect-redis';
import session from 'express-session';

const RedisStore = redisConnect(session);

const store = () => new RedisStore({ client: createClient() });

export { store };

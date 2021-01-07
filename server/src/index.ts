import 'reflect-metadata';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { RegistrableController } from 'controllers/RegistrableController';
import container from './inversify.config';
import TYPES from './inversifyTypes';
import { store } from './connectCache';
import session from 'express-session';

const app = express();

app.use(helmet());
app.use(express.json());

app.use(cors({ origin: 'http://localhost:5000' }));

app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    name: 'sessionId',
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
    },
    store: store(),
  })
);

const controllers: RegistrableController[] = container.getAll<
  RegistrableController
>(TYPES.Controller);

controllers.forEach((controller) => controller.register(app));

app.listen(process.env.PORT);

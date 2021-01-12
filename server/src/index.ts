import 'reflect-metadata';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { RegistrableController } from 'controllers/RegistrableController';
import container from './inversify.config';
import TYPES from './inversifyTypes';

const app = express();

app.use(helmet());
app.use(express.json());

app.use(
  cors({
    origin: 'http://localhost:5000',
    exposedHeaders: 'Authorization',
    credentials: true,
  })
);

const controllers: RegistrableController[] = container.getAll<
  RegistrableController
>(TYPES.Controller);

controllers.forEach((controller) => controller.register(app));

app.listen(process.env.PORT);

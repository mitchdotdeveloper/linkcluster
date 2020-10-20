import 'reflect-metadata';
import express from 'express';
import { RegistrableController } from 'controllers/RegistrableController';
import container from './inversify.config';
import TYPES from './inversifyTypes';

const app = express();

app.use(express.json());

const controllers: RegistrableController[] = container.getAll<
  RegistrableController
>(TYPES.Controller);

controllers.forEach((controller) => controller.register(app));

app.listen(3000);

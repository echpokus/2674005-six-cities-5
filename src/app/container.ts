import { Container } from 'inversify';
import { Component } from '../types/component.enum.js';
import { PinoLogger, type ILogger } from '../shared/libs/logger/index.js';
import { DatabaseClient, type IDatabaseClient } from '../shared/libs/database-client/index.js';
import { UserService, type IUserService } from '../shared/models/user/index.js';
import { OfferService, type IOfferService } from '../shared/models/offer/index.js';
import { Application } from './application.js';

export function initContainer(): Container {
  const container = new Container();

  container.bind<ILogger>(Component.Logger).to(PinoLogger).inSingletonScope();
  container.bind<IDatabaseClient>('DatabaseClient').to(DatabaseClient).inSingletonScope();
  container.bind<IUserService>('UserService').to(UserService).inSingletonScope();
  container.bind<IOfferService>('OfferService').to(OfferService).inSingletonScope();
  container.bind<Application>(Application).toSelf().inSingletonScope();

  return container;
}

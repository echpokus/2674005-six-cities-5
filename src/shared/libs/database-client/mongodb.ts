import { connect, disconnect } from 'mongoose';
import { injectable, inject } from 'inversify';
import { ILogger } from '../logger/pino-logger.js';
import { Component } from '../../types/component.enum.js';
import { IDatabaseClient } from './database-client.interface.js';

@injectable()
export class DatabaseClient implements IDatabaseClient {
  constructor(
    @inject(Component.Logger) private logger: ILogger
  ) {}

  async connect(): Promise<void> {
    this.logger.info('Attempting to connect to MongoDB...');
    const mongoUrl = process.env.MONGO_URL || 'mongodb://admin:test@localhost:27017/six-cities';
    
    try {
      await connect(mongoUrl);
      this.logger.info('Successfully connected to MongoDB');
    } catch (error) {
      this.logger.error(`Failed to connect to MongoDB: ${error}`);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    await disconnect();
    this.logger.info('Disconnected from MongoDB');
  }
}

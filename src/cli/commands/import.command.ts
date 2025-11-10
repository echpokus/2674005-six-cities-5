import { Command } from './command.interface.js';
import { TSVFileReader } from '../../shared/libs/file-reader/index.js';
import { Offer } from '../../shared/types/index.js';
import { DatabaseClient } from '../../shared/libs/database-client/index.js';
import { UserService } from '../../shared/models/user/index.js';
import { OfferService } from '../../shared/models/offer/index.js';
import { PinoLogger } from '../../shared/libs/logger/pino-logger.js';
import chalk from 'chalk';

export class ImportCommand implements Command {
  getName(): string {
    return '--import';
  }

  async execute(...parameters: string[]): Promise<void> {
    const [filename, dbUri] = parameters;

    if (!filename) {
      console.log(chalk.red('Необходимо указать путь к TSV файлу'));
      console.log(chalk.yellow('Пример: --import ./mocks/offers.tsv mongodb://admin:test@localhost:27017/six-cities'));
      return;
    }

    process.env.MONGO_URL = dbUri || process.env.MONGO_URL || 'mongodb://admin:test@localhost:27017/six-cities';

    const logger = new PinoLogger();
    const databaseClient = new DatabaseClient(logger);
    const userService = new UserService();
    const offerService = new OfferService();

    try {
      await databaseClient.connect();
      logger.info('Database connection established');

      const fileReader = new TSVFileReader(filename);
      let importedCount = 0;

      console.log(chalk.blue(`\nИмпорт данных из файла: ${filename} в БД\n`));

      const offers: Offer[] = [];

      fileReader.on('line', (offer: Offer) => {
        offers.push(offer);
      });

      fileReader.on('end', async (count: number) => {
        console.log(chalk.blue(`Начинаем импорт ${offers.length} предложений...`));
        
        for (const offer of offers) {
          try {
            const user = await userService.findOrCreate(
              offer.author.email,
              offer.author.name,
              offer.author.lastName,
              offer.author.password,
              offer.author.avatarUrl,
              offer.author.type
            );

            const offerData = {
              ...offer,
              author: user._id
            };

            await offerService.create(offerData as any);
            importedCount++;
            
            console.log(chalk.green(`✓ Импортировано: ${offer.title}`));
          } catch (error) {
            console.error(chalk.red(`✗ Ошибка при импорте: ${offer.title}`));
            logger.error(`Import error: ${error}`);
          }
        }

        console.log(chalk.green(`\n✓ Процесс завершен. Обработано строк: ${count}, Успешно импортировано: ${importedCount}\n`));
        await databaseClient.disconnect();
        process.exit(0);
      });

      fileReader.on('error', (error: Error) => {
        console.error(chalk.red(`\n✗ Ошибка при чтении файла ${filename}`));
        console.error(chalk.red(error.message));
        process.exit(1);
      });

      await fileReader.read();

    } catch (error) {
      console.error(chalk.red(`\n✗ Ошибка при импорте данных`));
      if (error instanceof Error) {
        console.error(chalk.red(error.message));
        logger.error(`Import failed: ${error.message}`);
      }
      await databaseClient.disconnect();
      process.exit(1);
    }
  }
}

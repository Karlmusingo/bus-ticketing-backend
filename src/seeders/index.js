import 'dotenv/config';
import { logger } from '../helpers';
import { connectDb, Bus, } from '../models';
import buses from './buses';

const seedBuses = async () => {
  return new Promise(resolve => {
    buses.forEach(async (val, index) => {
      await Bus.updateOne(
        { number: val.number },
        { ...val, },
        { upsert: true, setDefaultsOnInsert: true },
      );
      const bus = await Bus.findOne({ number: val.number });
      logger.info(`Bus number: ${bus.number}`);
      if (buses.length >= index + 1) {
        resolve(true);
      }
    });
  });
};

const exitProcess = (code = 0) => {
  logger.info('Seeding ended!');
  process.exit(code);
};

connectDb()
  .then(() => {
    logger.info('Seeding started!');
    seedBuses()
      .then(() => {
        exitProcess();
      })
      .catch(() => {
        exitProcess(1);
      });
  })
  .catch(err => {
    logger.error(`Failed! ${err.message}`);
    process.exit();
  });

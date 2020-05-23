import nofifyer from 'node-cron';
import { DEPARTURE, ARRIVAL, INTHEMIDDLE } from '../events';

const TRAVEL_TIME = () => Math.random() + 2; // IN MINUTES

export default (io) => {
  let initial = true;
  let middleTiming = null;
  nofifyer.schedule(`*/${TRAVEL_TIME()} * * * *`, async () => {
    io.emit(initial ? DEPARTURE : ARRIVAL);
    let count = 0;
    const travelTime = TRAVEL_TIME() * 60000;
    middleTiming = setInterval(() => {
      count += 1;
      io.emit(INTHEMIDDLE, {
        time: (count * travelTime / 10) / 100, // in percentage
      });
    }, travelTime / 10);

    setTimeout(() => {
      clearInterval(middleTiming);
      io.emit(!initial ? DEPARTURE : ARRIVAL);
      initial = !initial;
    }, (TRAVEL_TIME() - 1) * 60000);
  });
};

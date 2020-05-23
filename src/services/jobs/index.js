import nofifyer from 'node-cron';
import { DEPARTURE, ARRIVAL, INTHEMIDDLE } from '../events';

const getTravelTime = () => 1.2; // IN MINUTES

export default (io) => {
  let initial = true;
  let middleTiming = null;
  const travelTime = getTravelTime();
  nofifyer.schedule(`*/${travelTime + 1} * * * *`, async () => {
    let count = 0;
    io.emit(initial ? DEPARTURE : ARRIVAL);
    const travelTimemMilli = (travelTime - 1) * 60000;
    middleTiming = setInterval(() => {
      count += 1;
      io.emit(INTHEMIDDLE, {
        time:
          ((initial ? -1 : 1) * (((count * travelTimemMilli) / 10) * 100)) /
          travelTimemMilli, // in percentage
      });
    }, travelTimemMilli / 10);

    setTimeout(() => {
      clearInterval(middleTiming);
      io.emit(!initial ? DEPARTURE : ARRIVAL);
      initial = !initial;
    }, (travelTime - 1) * 60000);
  });
};

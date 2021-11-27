import {
  ConsoleActionType,
  SubjectConsole,
} from '../types';

import { Timer } from '../../entity/Timer';
import { TimerRecord } from '../../entity/TimerRecord';

export class TimeTable {

  private timeRecords: TimerRecord[];

  constructor(private consoleSubject: SubjectConsole) {
    this.timeRecords = [];
    this.timeoutDescriptor = null;
  }

  addRecord(record: TimerRecord) {
    this.timeRecords.unshift(record);
  }

  clearRecords() {
    this.timeRecords = [];
  }

  finishRecord() {
    this.timeRecords.pop();
  }

  goOn() {

  }

  handleNewTimer(timer: Timer) {
    let finishMsTime;
    const orderMsTime = Date.now();
    const lastTimeRecord = this.timeRecords[0];

    if (lastTimeRecord) {
      finishMsTime = lastTimeRecord.finishMsTime + timer.timeout;
    } else {
      finishMsTime = orderMsTime + timer.timeout;
    }

    const timeRecord = new TimerRecord(orderMsTime, finishMsTime, timer);
    this.addRecord(timeRecord);
    this.goOn();
  }

  clearConsole() {
    this.consoleSubject.next({
      type: ConsoleActionType.CLEAR,
    });
  }

}

export default TimeTable;

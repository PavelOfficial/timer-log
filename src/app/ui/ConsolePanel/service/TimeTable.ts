import { Subject } from 'rxjs';

import {
  ActionNewLine,
  ConsoleActionType,
} from '../types';

import { Timer } from '../../entity/Timer';
import { TimerRecord } from '../../entity/TimerRecord';

export class TimeTable extends Subject<ActionNewLine> {

  private timeRecords: TimerRecord[];

  private timeoutID: NodeJS.Timeout|null;

  constructor() {
    super();
    this.timeRecords = [];
    this.timeoutID = null;
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

  startTimeout(timeRecord: TimerRecord) {
    const now = Date.now();
    const timeout = timeRecord.finishMsTime - now;

    this.timeoutID = setTimeout(this.goOn, timeout);
  }

  finishAllExpired() {
    const now = Date.now();
    const firstExpiredRecord = this.timeRecords.findIndex((timeRecord) => {
      return timeRecord.finishMsTime > now;
    });

    const finishedRecords = this.timeRecords.slice(firstExpiredRecord + 1);
    this.timeRecords = this.timeRecords.slice(0, firstExpiredRecord);

    this.log(finishedRecords)
  }

  goOn = () => {
    this.finishAllExpired();

    if (this.timeoutID === null &&
      !!this.timeRecords.length) {
      const lastRecord = this.timeRecords[this.timeRecords.length - 1];
      this.startTimeout(lastRecord);
    }
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

  log(finishedRecords: TimerRecord[]) {
    for (let i = finishedRecords.length - 1; i > -1; i -= 1) {
      this.next({
        type: ConsoleActionType.NEW_LINE,
        line: String(finishedRecords[i]),
      });
    }
  }

}

export default TimeTable;

import { Subject } from 'rxjs';

import { ActionNewLine, ConsoleActionType } from '../types';

import { Timer } from '../entity/Timer';
import { TimerRecord } from '../entity/TimerRecord';

export class TimeTable {
  private timeRecords: TimerRecord[];

  private timeoutID: NodeJS.Timeout | null;

  public subject: Subject<ActionNewLine>;

  constructor() {
    this.timeRecords = [];
    this.timeoutID = null;
    this.subject = new Subject<ActionNewLine>();
  }

  addRecord(record: TimerRecord) {
    this.timeRecords.unshift(record);
  }

  startTimeout(timeRecord: TimerRecord) {
    const now = Date.now();
    const timeout = timeRecord.finishMsTime - now;

    this.timeoutID = setTimeout(() => {
      this.timeoutID = null;

      this.goOn();
    }, timeout);
  }

  finishAllExpired() {
    const now = Date.now();
    const firstExpiredRecord = this.timeRecords.findIndex((timeRecord) => {
      return now >= timeRecord.finishMsTime;
    });

    if (firstExpiredRecord !== -1) {
      const finishedRecords = this.timeRecords.slice(firstExpiredRecord);
      this.timeRecords = this.timeRecords.slice(0, firstExpiredRecord);

      this.log(finishedRecords);
    }
  }

  goOn = () => {
    if (this.timeoutID !== null) {
      return;
    }

    this.finishAllExpired();

    if (this.timeRecords.length) {
      const lastRecord = this.timeRecords[this.timeRecords.length - 1];

      if (lastRecord) {
        this.startTimeout(lastRecord);
      }
    }
  };

  handleNewTimer = (timer: Timer) => {
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
  };

  log(finishedRecords: TimerRecord[]) {
    for (let i = finishedRecords.length - 1; i > -1; i -= 1) {
      this.subject.next({
        type: ConsoleActionType.NEW_LINE,
        line: String(finishedRecords[i]),
      });
    }
  }

  complete() {
    if (this.timeoutID !== null) {
      clearTimeout(this.timeoutID);
    }
  }
}

export default TimeTable;

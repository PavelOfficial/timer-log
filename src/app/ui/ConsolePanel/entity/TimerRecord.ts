import Timer from './Timer';

export class TimerRecord {

  static formatTime(msTime: number) {
    const date = new Date(msTime);
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  }

  constructor(public orderMsTime: number, public finishMsTime: number, public timer: Timer) {}

  toString() {
    const orderTimeFormatted = TimerRecord.formatTime(this.orderMsTime);
    const finishTimeFormatted = TimerRecord.formatTime(this.finishMsTime);
    const timerSeconds = String(this.timer);

    return `${finishTimeFormatted}: ${timerSeconds} / ${orderTimeFormatted}`;
  }

}

import { Timer } from './Timer';

const leadingZero = (value: number) => {
  return `0${value}`.slice(-2);
};

export class TimerRecord {
  static formatTime(msTime: number) {
    const date = new Date(msTime);
    const hours = leadingZero(date.getHours());
    const minutes = leadingZero(date.getMinutes());
    const seconds = leadingZero(date.getSeconds());

    return `${hours}:${minutes}:${seconds}`;
  }

  constructor(public orderMsTime: number, public finishMsTime: number, public timer: Timer) {}

  toString() {
    const orderTimeFormatted = TimerRecord.formatTime(this.orderMsTime);
    const finishTimeFormatted = TimerRecord.formatTime(this.finishMsTime);
    const timerSeconds = String(this.timer);

    return `${finishTimeFormatted}: ${timerSeconds} / ${orderTimeFormatted}`;
  }
}

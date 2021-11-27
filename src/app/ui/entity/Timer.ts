export class Timer {

  constructor(public timeout: number) {}

  toString() {
    const value = Math.floor(this.timeout / 1000);

    return String(value);
  }

}

export default Timer;

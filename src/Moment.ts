export class Moment {
  private secondsSinceMidnight: number

  constructor(timeStringOrSeconds: string | number | Moment) {
    if (typeof timeStringOrSeconds === 'string') {
      const hours = +timeStringOrSeconds.substring(0, 2)
      const minutes = +timeStringOrSeconds.substring(2, 4)
      const seconds = +timeStringOrSeconds.substring(4, 6)
      this.secondsSinceMidnight = hours * 3600 + minutes * 60 + seconds
    } else if (timeStringOrSeconds instanceof Moment) {
      this.secondsSinceMidnight = timeStringOrSeconds.secondsSinceMidnight
    } else {
      this.secondsSinceMidnight = timeStringOrSeconds
    }
  }

  public timeUntil(other: Moment) {
    return other.secondsSinceMidnight - this.secondsSinceMidnight
  }

  public nextDay() {
    return new Moment(this.secondsSinceMidnight + 24 * 3600)
  }

  public *rangeFrom(other: Moment, step: number) {
    if (step <= 0) throw new Error('Step must be positive')
    let current = this.secondsSinceMidnight
    while (current >= other.secondsSinceMidnight) {
      yield new Moment(current)
      current = current - step
    }
  }

  public *rangeUntil(other: Moment, step: number) {
    if (step <= 0) throw new Error('Step must be positive')
    let current = this.secondsSinceMidnight
    while (current < other.secondsSinceMidnight) {
      yield new Moment(current)
      current = current + step
    }
  }

  public offset(seconds: number) {
    return new Moment(this.secondsSinceMidnight + seconds)
  }

  public equals(other: Moment) {
    return this.secondsSinceMidnight === other.secondsSinceMidnight
  }

  public isBefore(other: Moment) {
    return this.secondsSinceMidnight < other.secondsSinceMidnight
  }

  public isAfter(other: Moment) {
    return this.secondsSinceMidnight > other.secondsSinceMidnight
  }

  public toString() {
    // Formatting as hh:mm:ss -- always two digits for each field
    const hours = Math.floor(this.secondsSinceMidnight / 3600)
    const minutes = Math.floor((this.secondsSinceMidnight % 3600) / 60)
    const seconds = this.secondsSinceMidnight % 60

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`
  }
}

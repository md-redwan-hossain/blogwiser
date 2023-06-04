const futureTime = {
  inSecond: function (desiredTimeUnit: number): Date {
    const now = new Date();
    now.setUTCSeconds(now.getUTCSeconds() + desiredTimeUnit);
    return now;
  },
  inMinute: function (desiredTimeUnit: number): Date {
    return this.inSecond(desiredTimeUnit * 60);
  },
  inHour: function (desiredTimeUnit: number): Date {
    return this.inMinute(desiredTimeUnit * 60);
  },
  inDay: function (desiredTimeUnit: number): Date {
    return this.inHour(desiredTimeUnit * 24);
  },
  inWeek: function (desiredTimeUnit: number): Date {
    return this.inDay(desiredTimeUnit * 7);
  },
  inMonth: function (desiredTimeUnit: number): Date {
    const now = new Date();
    now.setUTCMonth(now.getUTCMonth() + desiredTimeUnit);
    return now;
  },
  inYear: function (desiredTimeUnit: number): Date {
    const now = new Date();
    now.setUTCFullYear(now.getUTCFullYear() + desiredTimeUnit);
    return now;
  }
};
export default futureTime;

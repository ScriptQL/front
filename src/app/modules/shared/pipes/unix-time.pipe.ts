import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'UnixTime'
})
export class UnixTimePipe implements PipeTransform {

  private units: {
    unit: string; ms: number
  }[] = [
    {unit: 'year', ms: 31536000000},
    {unit: 'month', ms: 2628000000},
    {unit: 'day', ms: 86400000},
    {unit: 'hour', ms: 3600000},
    {unit: 'minute', ms: 60000},
    {unit: 'second', ms: 1000},
  ];

  transform(value: string | undefined | BigInt, style: 'full' | 'date' | 'relative'): string {
    if (!value) {
      return '';
    }
    const utcDate = new Date(Number(value));
    if (style === 'full') {
      return new Intl.DateTimeFormat('default', {
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit',
        timeZoneName: 'short',
        hour12: false,
      }).format(utcDate);
    } else if (style === 'date') {
      return new Intl.DateTimeFormat('default', {
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour12: false,
      }).format(utcDate);
    } else if (style === 'relative') {
      // @ts-ignore
      return this.relativeTimeFromDates(utcDate, new Intl.RelativeTimeFormat('default', {
        style: 'narrow',
      }));
    } else {
      return '';
    }
  }

  /**
   * Get language-sensitive relative time message from Dates.
   * @param relative  - the relative dateTime, generally is in the past or future
   * @param pivot     - the dateTime of reference, generally is the current time
   * @param rtf       - relative time format
   */
  private relativeTimeFromDates(relative: Date, rtf: any, pivot: Date = new Date()): string {
    const elapsed = relative.getTime() - pivot.getTime();
    return this.relativeTimeFromElapsed(elapsed, rtf);
  }

  /**
   * Get language-sensitive relative time message from elapsed time.
   * @param elapsed   - the elapsed time in milliseconds
   * @param rtf       - relative time format
   */
  private relativeTimeFromElapsed(elapsed: number, rtf: any): string {
    for (const {unit, ms} of this.units) {
      if (Math.abs(elapsed) >= ms || unit === 'second') {
        return rtf.format(Math.round(elapsed / ms), unit);
      }
    }
    return '';
  }

}

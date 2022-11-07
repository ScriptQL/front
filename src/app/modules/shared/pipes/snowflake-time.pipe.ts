import { Pipe, PipeTransform } from '@angular/core';
import {UnixTimePipe} from "./unix-time.pipe";

@Pipe({
  name: 'SnowflakeTime'
})
export class SnowflakeTimePipe implements PipeTransform {

  // @ts-ignore
  private EPOCH: BigInt = 1420070400000n;

  transform(value: string | undefined, style: 'full' | 'date' | 'relative'): string {
    if (!value) {
      return '';
    }
    // @ts-ignore
    let int = BigInt(value);
    // @ts-ignore
    let time = (int >> 22n) + this.EPOCH;
    return new UnixTimePipe().transform(time.toString(), style);
  }

}

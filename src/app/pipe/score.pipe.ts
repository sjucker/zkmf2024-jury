import {Pipe, PipeTransform} from '@angular/core';
import {DecimalPipe} from "@angular/common";
import {Modul} from "../rest";

@Pipe({
  name: 'score',
  standalone: false
})
export class ScorePipe implements PipeTransform {

  constructor(private decimalPipe: DecimalPipe) {
  }

  transform(value: number | string | null | undefined, modul: Modul): string | null {
    return this.decimalPipe.transform(value, modul === Modul.G ? '1.1-1' : '1.0-0');
  }
}

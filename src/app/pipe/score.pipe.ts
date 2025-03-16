import {inject, Pipe, PipeTransform} from '@angular/core';
import {DecimalPipe} from "@angular/common";
import {Modul} from "../rest";

@Pipe({name: 'score'})
export class ScorePipe implements PipeTransform {
  private decimalPipe = inject(DecimalPipe);


  transform(value: number | string | null | undefined, modul: Modul): string | null {
    return this.decimalPipe.transform(value, modul === Modul.G ? '1.1-1' : '1.0-0');
  }
}

import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'edad'
})
export class EdadPipe implements PipeTransform {
  constructor(private datePipe: DatePipe) { }

  transform(value: string) {
    const hoy = new Date();
    // tslint:disable-next-line:radix
    const cumpleanos = new Date(value);
    let edad = hoy.getFullYear() - cumpleanos.getFullYear();
    const m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
      edad--;
    }

    return this.datePipe.transform(edad);
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'sliceWords' })
export class SliceWordsPipe implements PipeTransform {
  transform(value?: string, start?: number, end?: number): string {
    if (value == null) return '';
    if (end && value.length < end) return value;

    return value.slice(start, end) + '...';
  }
}

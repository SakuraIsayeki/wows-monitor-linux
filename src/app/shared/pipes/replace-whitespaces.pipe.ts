import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceWhitespace'
})
export class ReplaceWhitespacePipe implements PipeTransform {
  transform(str: string, replaceChar = '-'): string {
    return str.replace(/\s/g, replaceChar);
  }
}

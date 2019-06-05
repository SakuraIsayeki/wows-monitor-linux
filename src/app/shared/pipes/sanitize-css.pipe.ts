import { Pipe, PipeTransform, Sanitizer, SecurityContext } from '@angular/core';

@Pipe({
  name: 'sanitizeCss'
})
export class SanitizeCssPipe implements PipeTransform {

  constructor(private sanitizer: Sanitizer) { }

  transform(css: string): string {
    return this.sanitizer.sanitize(SecurityContext.STYLE, css);
  }
}

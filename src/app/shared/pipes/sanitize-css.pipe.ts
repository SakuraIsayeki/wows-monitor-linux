import { Pipe, PipeTransform, SecurityContext, Inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'sanitizeCss'
})
export class SanitizeCssPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }

  transform(css: string): string {
    return css != null ? this.sanitizer.sanitize(SecurityContext.STYLE, css) : null;
  }
}

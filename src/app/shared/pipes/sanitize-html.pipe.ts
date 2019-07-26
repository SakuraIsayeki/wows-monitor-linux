import { Pipe, PipeTransform, Sanitizer, SecurityContext } from '@angular/core';

@Pipe({
  name: 'sanitizeHtml'
})
export class SanitizeHtmlPipe implements PipeTransform {

  constructor(private sanitizer: Sanitizer) { }

  transform(html: string): string {
    return this.sanitizer.sanitize(SecurityContext.HTML, html);
  }
}

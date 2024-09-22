import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';

@Pipe({
    standalone: true,
  name: 'markdown',
})
export class MarkdownPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {
    // Optionally configure marked options here
    marked.setOptions({
      breaks: true, // Use GFM line breaks
      gfm: true, // Enable GitHub flavored markdown
      async: false, // Enable async rendering
    });
  }

  transform(value: string): SafeHtml {
    if (!value) {
      return '';
    }

    // Convert Markdown to HTML
    const html = marked.parse(value);

    // Sanitize the HTML to prevent XSS attacks
    return this.sanitizer.bypassSecurityTrustHtml(html.toString());
  }
}

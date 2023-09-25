import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translation',
})
export class TranslationPipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
      case 'canceled':
        return 'لغو شده';
      case 'completed':
        return 'تکمیل شده';
      default:
        return value;
    }
  }
}

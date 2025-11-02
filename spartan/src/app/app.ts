import { Component, inject, model, OnInit, signal } from '@angular/core';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { HlmAccordionImports } from '@spartan-ng/helm/accordion';
import { HlmIconImports } from '@spartan-ng/helm/icon';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { lucideChevronRight } from '@ng-icons/lucide';
import { HlmDatePickerImports } from '@spartan-ng/helm/date-picker';
import { injectBrnCalendarI18n } from '@spartan-ng/brain/calendar';

@Component({
  selector: 'app-root',
  imports: [NgIcon, HlmIcon, HlmIconImports, HlmAccordionImports, HlmButtonImports, HlmDatePickerImports],
  templateUrl: './app.html',
  providers: [provideIcons({ lucideChevronRight })],
  styleUrl: './app.scss'
})

export class App implements OnInit {
  private readonly _i18n = injectBrnCalendarI18n();

  ngOnInit(): void {
    // Erweitere das Jahr-Range bis 2050 und setze deutsches Datumsformat
    this._i18n.use({
      years: (startYear?: number, endYear?: number) => {
        const start = startYear || 1900;
        const end = endYear || 2050;
        const years: number[] = [];
        for (let i = start; i <= end; i++) {
          years.push(i);
        }
        return years;
      },
      formatWeekdayName: (index: number) => {
        const weekdays = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
        return weekdays[index];
      },
      formatHeader: (month: number, year: number) => {
        const months = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 
                       'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
        return `${months[month]} ${year}`;
      },
      formatMonth: (month: number) => {
        const months = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 
                       'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
        return months[month];
      },
      firstDayOfWeek: () => 1  // Montag als erster Tag der Woche (0 = Sonntag, 1 = Montag)
    });
  }

  // Deutsche Datumsformatierung: DD.MM.YYYY
  formatDateDE = (date: Date): string => {
    if (!(date instanceof Date)) return `${date}`;
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };
  protected readonly title = signal('spartan');

  /** The minimum date */
  public minDate = new Date(2023, 0, 1);

  /** The maximum date */
  public maxDate = new Date(2050, 11, 31);

  protected readonly _captionLayout = model<'dropdown' | 'label' | 'dropdown-months' | 'dropdown-years'>('dropdown');

}

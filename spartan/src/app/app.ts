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
    // Erweitere das Jahr-Range bis 2050
    this._i18n.use({
      years: (startYear?: number, endYear?: number) => {
        const start = startYear || 1900;
        const end = endYear || 2050;
        const years: number[] = [];
        for (let i = start; i <= end; i++) {
          years.push(i);
        }
        return years;
      }
    });
  }
  protected readonly title = signal('spartan');

  /** The minimum date */
  public minDate = new Date(2023, 0, 1);

  /** The maximum date */
  public maxDate = new Date(2050, 11, 31);

  protected readonly _captionLayout = model<'dropdown' | 'label' | 'dropdown-months' | 'dropdown-years'>('dropdown');

}

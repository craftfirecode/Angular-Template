import { Component, model, OnInit, signal } from '@angular/core';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { HlmAccordionImports } from '@spartan-ng/helm/accordion';
import { HlmIconImports } from '@spartan-ng/helm/icon';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { lucideChevronRight } from '@ng-icons/lucide';
import { HlmDatePickerImports } from '@spartan-ng/helm/date-picker';
import { injectBrnCalendarI18n } from '@spartan-ng/brain/calendar';
import { formatDateDE, calendarI18nDE, DEFAULT_MIN_DATE, DEFAULT_MAX_DATE } from '../utility/date';
import { HlmFormFieldImports } from '@spartan-ng/helm/form-field';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [NgIcon, HlmIcon, HlmFormFieldImports,ReactiveFormsModule, HlmInputImports, HlmIconImports, HlmAccordionImports, HlmButtonImports, HlmDatePickerImports],
  templateUrl: './app.html',
  providers: [provideIcons({ lucideChevronRight })],
  styleUrl: './app.scss'
})

export class App implements OnInit {
  private readonly _i18n = injectBrnCalendarI18n();

  ngOnInit(): void {
    this._i18n.use(calendarI18nDE);
  }

  // Deutsche Datumsformatierung: DD.MM.YYYY


  protected readonly title = signal('spartan');

  public minDate = DEFAULT_MIN_DATE;
  public maxDate = DEFAULT_MAX_DATE;
  protected readonly _captionLayout = model<'dropdown' | 'label' | 'dropdown-months' | 'dropdown-years'>('dropdown');
  protected readonly formatDateDE = formatDateDE;
  public control = new FormControl('', [Validators.required, Validators.email]);
}

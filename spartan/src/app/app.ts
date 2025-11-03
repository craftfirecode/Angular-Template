import { Component, inject, model, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { HlmAccordionImports } from '@spartan-ng/helm/accordion';
import { HlmIconImports } from '@spartan-ng/helm/icon';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { lucideChevronRight } from '@ng-icons/lucide';
import { HlmDatePickerImports } from '@spartan-ng/helm/date-picker';
import { injectBrnCalendarI18n } from '@spartan-ng/brain/calendar';
import { formatDateDE, calendarI18nDE, DEFAULT_MIN_DATE, DEFAULT_MAX_DATE } from '../utility/date';
import { ThemeCustomizerComponent } from './components/theme-customizer.component';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  imports: [
    NgIcon, 
    HlmIcon, 
    HlmIconImports, 
    HlmAccordionImports, 
    HlmButtonImports, 
    HlmDatePickerImports,
    ThemeCustomizerComponent
  ],
  templateUrl: './app.html',
  providers: [provideIcons({ lucideChevronRight })],
  styleUrl: './app.scss'
})

export class App implements OnInit {
  private readonly _i18n = injectBrnCalendarI18n();
  private readonly route = inject(ActivatedRoute);
  private readonly themeService = inject(ThemeService);

  ngOnInit(): void {
    this._i18n.use(calendarI18nDE);
    
    // Load theme from URL parameters
    this.route.queryParams.subscribe(params => {
      this.themeService.loadFromUrlParams(params);
    });
  }

  // Deutsche Datumsformatierung: DD.MM.YYYY


  protected readonly title = signal('spartan');

  public minDate = DEFAULT_MIN_DATE;
  public maxDate = DEFAULT_MAX_DATE;
  protected readonly _captionLayout = model<'dropdown' | 'label' | 'dropdown-months' | 'dropdown-years'>('dropdown');
  protected readonly formatDateDE = formatDateDE;
}

import { Component, model, signal } from '@angular/core';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { HlmAccordionImports } from '@spartan-ng/helm/accordion';
import { HlmIconImports } from '@spartan-ng/helm/icon';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { lucideChevronRight } from '@ng-icons/lucide';
import { HlmDatePickerImports } from '@spartan-ng/helm/date-picker';

@Component({
  selector: 'app-root',
  imports: [NgIcon, HlmIcon, HlmIconImports, HlmAccordionImports, HlmButtonImports, HlmDatePickerImports],
  templateUrl: './app.html',
  providers: [provideIcons({ lucideChevronRight })],
  styleUrl: './app.scss'
})

export class App {
  protected readonly title = signal('spartan');

  /** The minimum date */
  public minDate = new Date(2023, 0, 1);

  /** The maximum date */
  public maxDate = new Date(2035, 11, 31);

  protected readonly _captionLayout = model<'dropdown' | 'label' | 'dropdown-months' | 'dropdown-years'>('dropdown');

}

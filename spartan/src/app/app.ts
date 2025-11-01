import { Component, signal } from '@angular/core';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { HlmAccordionImports } from '@spartan-ng/helm/accordion';
import { HlmIconImports } from '@spartan-ng/helm/icon';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { lucideChevronRight } from '@ng-icons/lucide';
@Component({
  selector: 'app-root',
  imports: [NgIcon, HlmIcon, HlmIconImports, HlmAccordionImports, HlmButtonImports],
  templateUrl: './app.html',
  providers: [provideIcons({ lucideChevronRight })],
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('spartan');
}

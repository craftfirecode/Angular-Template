import { Component, signal } from '@angular/core';

import { NgIcon } from '@ng-icons/core';
import { HlmAccordionImports } from '@spartan-ng/helm/accordion';
import { HlmIconImports } from '@spartan-ng/helm/icon';
import { HlmButtonImports } from '@spartan-ng/helm/button';

@Component({
  selector: 'app-root',
  imports: [NgIcon, HlmIconImports, HlmAccordionImports, HlmButtonImports ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('spartan');
}

import { Component, signal } from '@angular/core';
import { ZardAccordionItemComponent } from '@shared/components/accordion/accordion-item.component';
import { ZardAccordionComponent } from '@shared/components/accordion/accordion.component';
import { ZardButtonComponent } from '@shared/components/button/button.component';
import { ZardIconComponent } from '@shared/components/icon/icon.component';


@Component({
  selector: 'app-root',
  imports: [ZardButtonComponent, ZardIconComponent, ZardAccordionComponent, ZardAccordionItemComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('libs');
}

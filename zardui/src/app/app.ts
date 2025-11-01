import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ZardAccordionItemComponent } from '@shared/components/accordion/accordion-item.component';
import { ZardAccordionComponent } from '@shared/components/accordion/accordion.component';
import { ZardButtonComponent } from '@shared/components/button/button.component';
import { ZardDatePickerComponent } from '@shared/components/date-picker/date-picker.component';
import { ZardIconComponent } from '@shared/components/icon/icon.component';


@Component({
  selector: 'app-root',
  imports: [
    ZardButtonComponent,
    ZardIconComponent,
    ZardAccordionComponent,
    ZardAccordionItemComponent,
    ZardDatePickerComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('libs');

  selectedDate = signal<Date | null>(null);

  onDateChange(date: Date | null) {
    this.selectedDate.set(date);
    console.log('Selected date:', date);
  }
}

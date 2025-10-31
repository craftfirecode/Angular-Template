import { Component, signal } from '@angular/core';
import { ZardButtonComponent } from '@shared/components/button/button.component';
import { ZardIconComponent } from '@shared/components/icon/icon.component';


@Component({
  selector: 'app-root',
  imports: [ZardButtonComponent, ZardIconComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('libs');
}

import {Component, computed} from '@angular/core';
import {UserStoreService} from '../../user-store.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [
    NgIf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(public userStore: UserStoreService) {
  }

  get imagePath(): string {
    return 'assets/brand/';
  }
}

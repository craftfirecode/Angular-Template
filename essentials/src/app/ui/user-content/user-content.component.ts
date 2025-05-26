import {Component, computed, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {UserStoreService} from '../../user-store.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-user-content',
  imports: [
    NgIf
  ],
  templateUrl: './user-content.component.html',
  styleUrl: './user-content.component.scss'
})
export class UserContentComponent {
  constructor(public userStore: UserStoreService) {
  }
}

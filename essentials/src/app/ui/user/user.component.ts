import {Component, input} from '@angular/core';
import {IUsers} from '../../dump/userDump';
import {UserStoreService} from '../../user-store.service';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  imports: [
    NgForOf
  ],
  styleUrl: './user.component.scss'
})
export class UserComponent {
  headline = input.required<string>();

  constructor(public userStore: UserStoreService) {
    // injects
  }

  onClickUser(user: IUsers): void {
    this.userStore.setSelectedUser(user);
  }
}

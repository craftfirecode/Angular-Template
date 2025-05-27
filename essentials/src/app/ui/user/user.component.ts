import {Component, input, output} from '@angular/core';
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
  headline = input.required<string>(); // It is a signal in Angular 17
  userEmitted = output<IUsers>(); // It is a EventEmitter in Angular 17

  constructor(public userStore: UserStoreService) {
    // injects
  }

  onClickUser(user: IUsers): void {
    this.userStore.setSelectedUser(user);
    this.userEmitted.emit(user);
  }
}

import {Component, input} from '@angular/core';
import {IUsers} from './userDump';
import {UserStoreService} from '../../user-store.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  data = input.required<IUsers>();

  constructor(private userStore: UserStoreService) {
    // The userStore service is injected to manage user state
  }

  onClickUser(user: IUsers): void {
    this.userStore.setSelectedUser(user);
  }
}

import {Component} from '@angular/core';
import {HeaderComponent} from './ui/header/header.component';
import {UserComponent} from './ui/user/user.component';
import {UserStoreService} from './user-store.service';
import {UserContentComponent} from './ui/user-content/user-content.component';
import {IUsers} from './dump/userDump';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, UserComponent, UserContentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'essentials';
  emittedUser: IUsers | null = null;

  constructor(public userStore: UserStoreService) {
  }

  get userHeadline() {
    return this.userStore.usersList$()?.length + ' ' + 'users found';
  }

  onUserEmitted(user: IUsers): void {
    this.emittedUser = user;
  }
}

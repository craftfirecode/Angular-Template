import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from './ui/header/header.component';
import {UserComponent} from './ui/user/user.component';
import {UserStoreService} from './user-store.service';
import {UserContentComponent} from './ui/user-content/user-content.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, UserComponent, UserContentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'essentials';
  users$: ReturnType<UserStoreService['usersList$']> | null = null;

  constructor(public userStore: UserStoreService) {
  }

  ngOnInit() {
    this.users$ = this.userStore.usersList$();
  }

  get userHeadline() {
    return this.users$?.length + ' users found';
  }
}

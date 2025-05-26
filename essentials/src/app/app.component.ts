import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from './ui/header/header.component';
import {UserComponent} from './ui/user/user.component';
import {AsyncPipe, NgForOf} from '@angular/common';
import {IUsers, usersDump} from './ui/user/userDump';
import {Observable, of} from 'rxjs';
import {UserStoreService} from './user-store.service';
import {UserContentComponent} from './ui/user-content/user-content.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, UserComponent, NgForOf, AsyncPipe, UserContentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'essentials';
  users$!: Observable<IUsers[]>;

  constructor(public userStore: UserStoreService) {
  }

  ngOnInit() {
    this.users$ = of(usersDump);
  }

  updateUserStore(userData: IUsers) {
    this.userStore.setSelectedUser(userData);
  }
}

import {Component, input, OnInit} from '@angular/core';
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
export class UserComponent implements OnInit {
  headline = input.required<string>();
  users$: ReturnType<UserStoreService['usersList$']> | null = null;

  constructor(private userStore: UserStoreService) {
    // injects
  }

  ngOnInit(): void {
    this.users$ = this.userStore.usersList$();
  }

  onClickUser(user: IUsers): void {
    this.userStore.setSelectedUser(user);
  }
}

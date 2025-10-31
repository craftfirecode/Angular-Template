import { Component, effect, inject, OnInit } from '@angular/core';
import { AsyncPipe, NgForOf } from '@angular/common';
import { ApiService, User } from '../../api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  imports: [AsyncPipe],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent {
  users$!: Observable<User[]>;

  private apiService = inject(ApiService);

  constructor() {
    this.users$ = this.apiService.getUsers();
  }
}

import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgForOf } from '@angular/common';
import { ApiService, User } from '../../api.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-users',
  imports: [
    NgForOf,
    AsyncPipe
  ],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users$!: Observable<User[]>;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.users$ = this.apiService.getUsers();
  }
}

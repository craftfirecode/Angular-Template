import { Component, OnInit } from '@angular/core';
import {AsyncPipe, NgForOf} from '@angular/common';
import {ApiService, User} from '../../api.service';

@Component({
  selector: 'app-users',
  imports: [
    NgForOf,
    AsyncPipe
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  users: User[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getUsers().subscribe((data: User[]) => {
      this.users = data;
    });
  }
}

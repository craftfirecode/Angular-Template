import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from './ui/header/header.component';
import {UserComponent} from './ui/user/user.component';
import {AsyncPipe, NgForOf} from '@angular/common';
import {IUsers, usersDump} from './ui/user/userDump';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, UserComponent, NgForOf, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'essentials';
  users$!: Observable<IUsers[]>;

  ngOnInit() {
    this.users$ = of(usersDump);
  }
}

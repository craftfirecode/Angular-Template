import {Component, OnInit, signal, WritableSignal} from '@angular/core';
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
  selectedUser: WritableSignal<number> = signal(0);

  ngOnInit() {
    this.users$ = of(usersDump);
  }

  onClickUser(userId: number): void {
    this.selectedUser.set(userId);
  }
}

import {Component, computed, input, signal,} from '@angular/core';
import {IUsers} from './userDump';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-user',
  imports: [
    NgIf
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  data = input.required<IUsers>();
  
  onClickUser(): void {
    console.log(JSON.stringify(this.data));
  }
}

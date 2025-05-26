import {Component, Input} from '@angular/core';
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
  @Input() data: IUsers | undefined;

  onClickUser(): void {
    alert(JSON.stringify(this.data));
  }
}

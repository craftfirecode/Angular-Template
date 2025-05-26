import {Component, input} from '@angular/core';
import {IUsers} from './userDump';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrl: './user.component.scss'
})
export class UserComponent {
    data = input.required<IUsers>();

    onClickUser(): void {
        console.log(JSON.stringify(this.data));
    }
}

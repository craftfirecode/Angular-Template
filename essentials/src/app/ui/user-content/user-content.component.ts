import {Component} from '@angular/core';
import {UserStoreService} from '../../user-store.service';
import {NgIf, NgTemplateOutlet} from '@angular/common';

@Component({
    selector: 'app-user-content',
    imports: [
        NgIf,
        NgTemplateOutlet
    ],
    templateUrl: './user-content.component.html',
    styleUrl: './user-content.component.scss'
})
export class UserContentComponent {
    constructor(public userStore: UserStoreService) {
    }
}

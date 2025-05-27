import {Injectable, signal, WritableSignal} from '@angular/core';
import {IUsers, usersDump} from './dump/userDump';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  usersList$: WritableSignal<IUsers[] | null> = signal(null);
  selectedUser: WritableSignal<IUsers | null> = signal(null);

  constructor() {
    this.usersList$.set(usersDump);
  }

  setSelectedUser(user: IUsers) {
    this.selectedUser.set(user);
  }
}

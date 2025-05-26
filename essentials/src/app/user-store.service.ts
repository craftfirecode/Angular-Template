import {Injectable, WritableSignal, signal} from '@angular/core';
import {IUsers} from './ui/user/userDump';

@Injectable({
  providedIn: 'root'
})

export class UserStoreService {
  selectedUser: WritableSignal<IUsers | null> = signal(null);

  setSelectedUser(user: IUsers) {
    this.selectedUser.set(user);
  }
}

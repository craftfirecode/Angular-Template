// folder.service.ts
import { Injectable, signal, Signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FolderService {
  private _folderID = signal<string | null>(null);
  folderID: Signal<string | null> = this._folderID;

  setFolderID(id: string | null) {
    this._folderID.set(id);
  }

  resetFolderID() {
    this._folderID.set(null);
  }
}

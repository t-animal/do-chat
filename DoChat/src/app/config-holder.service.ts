import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigHolderService {

  private name = new Subject<string>();
  private server = new Subject<string>();

  setName(name: string) {
    if(name.trim() === ''){
      name = 'Vorname Nachname';
    }
    this.name.next(name);
  }

  setServer(server: string) {
    this.server.next(server);
  }

  getName(){
    return this.name.asObservable();
  }

  getServer() {
    return this.name.asObservable();
  }
}

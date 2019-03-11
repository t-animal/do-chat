import { Injectable, Inject } from '@angular/core';
import { Subject, concat, of } from 'rxjs';
import { StorageService, LOCAL_STORAGE } from 'angular-webstorage-service';

const RECEIVER_NAME_KEY = 'receiver-name';
const SERVER_KEY = 'server-address';

@Injectable({
  providedIn: 'root'
})
export class ConfigHolderService {

  private name = new Subject<string>();
  private server = new Subject<string>();

  constructor(
    @Inject(LOCAL_STORAGE) private storage: StorageService
 ){ }


  setName(name: string) {
    if(name.trim() === ''){
      name = 'Vorname Nachname';
    }
    this.storage.set(RECEIVER_NAME_KEY, name);
    this.name.next(name);
  }

  setServer(server: string) {
    this.storage.set(SERVER_KEY, server);
    this.server.next(server);
  }

  getName(){
    const storedName: string = this.storage.get(RECEIVER_NAME_KEY);

    if(storedName === null)
      return this.name.asObservable();

    return concat(of(storedName), this.name.asObservable());
  }

  getServer() {
    const storedServer: string = this.storage.get(SERVER_KEY);

    if(storedServer === null)
      return this.server.asObservable();
  
    return concat(of(storedServer), this.server.asObservable());
  }
}

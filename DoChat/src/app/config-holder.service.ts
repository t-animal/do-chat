import { Injectable, Inject } from '@angular/core';
import { Subject, concat, of } from 'rxjs';
import { StorageService, LOCAL_STORAGE } from 'angular-webstorage-service';

const RECEIVER_NAME_KEY = 'receiver-name';
const SERVER_KEY = 'server-address';
const SENDER_NAME_KEY = 'sender-name';

const DEFAULT_SERVER = 'ws://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class ConfigHolderService {

  private name = new Subject<string>();
  private server = new Subject<string>();
  private senderName = new Subject<string>();

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

  setSenderName(name: string) {
    if(name.trim() === ''){
      name = 'Unknown Sender';
    }
    this.storage.set(SENDER_NAME_KEY, name);
    this.senderName.next(name);
  }

  getName(){
    const storedName: string = this.storage.get(RECEIVER_NAME_KEY);

    if(storedName === null)
      return this.name.asObservable();

    return concat(of(storedName), this.name.asObservable());
  }

  getServer() {
    if(this.storage.get(SERVER_KEY) === null){
      this.storage.set(SERVER_KEY, DEFAULT_SERVER);
    }

    const storedServer: string = this.storage.get(SERVER_KEY);
    return concat(of(storedServer), this.server.asObservable());
  }

  getSenderName() {
    const storedSender: string = this.storage.get(SENDER_NAME_KEY);

    if(storedSender === null)
      return this.senderName.asObservable();

    return concat(of(storedSender), this.senderName.asObservable());
  }
}

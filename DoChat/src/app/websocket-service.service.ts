import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

const SERVER = 'ws://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class WebsocketServiceService {

  private socket: WebSocket;
  private messageSubject = new Subject<string>();

  constructor() {
    this.connect()
  }

  sendMessage(message: string) {
    this.socket.send(message);
  }

  getMessages(): Observable<string> {
    return this.messageSubject.asObservable();
  }

  private connect() {
    this.socket = new WebSocket(SERVER);
    this.socket.onmessage = (event: MessageEvent) => this.handleMessage(event);
  }

  private handleMessage(event: MessageEvent) {
    this.messageSubject.next(event.data);
  }

}

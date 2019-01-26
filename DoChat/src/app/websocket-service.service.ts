import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Message } from 'model/message';
import { IdentificationService } from './identification.service';

const SERVER = 'ws://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class WebsocketServiceService {

  private socket: WebSocket;
  private messageSubject = new Subject<Message>();

  constructor(
    private identificationService: IdentificationService
  ) {
    this.connect()
  }

  sendMessage(messageText: string) {
    const message: Message = {
      sender: this.identificationService.getId(),
      text: messageText
    }
    this.socket.send(JSON.stringify(message));
  }

  getMessages(): Observable<Message> {
    return this.messageSubject.asObservable();
  }

  private connect() {
    this.socket = new WebSocket(SERVER);
    this.socket.onmessage = (event: MessageEvent) => this.handleMessage(event);
  }

  private handleMessage(event: MessageEvent) {
    this.messageSubject.next(JSON.parse(event.data));
  }

}

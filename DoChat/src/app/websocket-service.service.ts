import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Message } from 'model/message';
import { IdentificationService } from './identification.service';
import { HistoryService } from './history.service';

const SERVER = 'ws://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class WebsocketServiceService {

  private socket: WebSocket;
  private messageSubject = new Subject<Message>();

  constructor(
    private identificationService: IdentificationService,
    private historyService: HistoryService
  ) {
    this.connect()
  }

  sendMessage(messageText: string) {
    const message: Message = {
      sender: this.identificationService.getId(),
      payload: messageText,
      type: 'text',
      version: 'v1'
    }
    this.socket.send(JSON.stringify(message));
  }

  async sendAudio(audio: Blob){
    const message: Message = {
      sender: this.identificationService.getId(),
      payload: await this.base64Encode(audio),
      type: 'audio',
      version: 'v1'
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
    const message = JSON.parse(event.data);
    this.historyService.addMessage(message);
    this.messageSubject.next(message);
  }


  private base64Encode(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.addEventListener("load", function () {
        resolve(<string>fileReader.result);
      }, false);

      fileReader.readAsDataURL(blob);

    });
  }

}

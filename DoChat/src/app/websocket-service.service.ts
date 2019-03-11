import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { Message } from 'model/message';
import { IdentificationService } from './identification.service';
import { HistoryService } from './history.service';
import { ConfigHolderService } from './config-holder.service';

const SERVER = 'ws://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class WebsocketServiceService implements OnDestroy {

  private socket: WebSocket;
  private messageSubject = new Subject<Message>();
  
  private senderName: string;
  private senderNameSubscription: Subscription;

  constructor(
    private identificationService: IdentificationService,
    private historyService: HistoryService,
    configService: ConfigHolderService
  ) {
    this.connect()

    this.senderNameSubscription = configService.getSenderName().subscribe(name => this.senderName = name);
  }

  ngOnDestroy() {
    this.senderNameSubscription.unsubscribe();
  }

  sendMessage(messageText: string) {
    const message: Message = {
      sender: this.identificationService.getId(),
      senderName: this.senderName,
      payload: messageText,
      sendTime: new Date(),
      type: 'text',
      version: 'v1'
    }
    this.socket.send(JSON.stringify(message));
  }

  async sendAudio(audio: Blob){
    const message: Message = {
      sender: this.identificationService.getId(),
      senderName: this.senderName,
      payload: await this.base64Encode(audio),
      sendTime: new Date(),
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
    message.sendTime = new Date(message.sendTime);

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

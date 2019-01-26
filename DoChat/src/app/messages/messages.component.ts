import { Component, OnInit } from '@angular/core';
import { WebsocketServiceService } from '../websocket-service.service';
import { Subscription } from 'rxjs';
import { Message } from 'model/message';
import { IdentificationService } from '../identification.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  private subscription: Subscription;

  messages: Message[] = [];

  constructor(
    private socket: WebsocketServiceService,
    private identificationService: IdentificationService
  ){ }

  ngOnInit() {
    this.subscription = this.socket.getMessages().subscribe((message) => {
      this.messages.push(message);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  isIncomingMessage(message: Message) {
    return message.sender !== this.identificationService.getId();
  }
}

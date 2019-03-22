import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { WebsocketServiceService } from '../websocket-service.service';
import { Message } from '@model/message'
import { IdentificationService } from '../identification.service';
import { HistoryService } from '../history.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  private subscription: Subscription;
  private formatter = new Intl.DateTimeFormat('de', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric' }); //TODO: If available use relativetimeformat

  messages: Message[] = [];

  constructor(
    private socket: WebsocketServiceService,
    private identificationService: IdentificationService,
    private historyService: HistoryService
  ){ }

  ngOnInit() {
    this.messages = this.historyService.getHistory();
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

  getTimeString(message: Message){
    return this.formatter.format(message.sendTime);
  }
}
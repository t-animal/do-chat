import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { WebsocketServiceService } from '../websocket-service.service';
import { UserMessage } from '@model/message'
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

  messages: UserMessage[] = [];

  constructor(
    private socket: WebsocketServiceService,
    private identificationService: IdentificationService,
    private historyService: HistoryService
  ){ }

  ngOnInit() {
    this.messages = this.historyService.getHistory();
    this.subscription = this.socket.getMessages().subscribe((message) => {
      this.messages.push(message);
      window.setTimeout(() =>
        this.scrollToBottom(), 0);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  isIncomingMessage(message: UserMessage) {
    return message.sender !== this.identificationService.getId();
  }

  getTimeString(message: UserMessage){
    return this.formatter.format(message.sendTime);
  }

  private scrollToBottom() {
    const mainElem = document.getElementsByTagName('main')[0];
    if(mainElem === undefined)
    return;
    mainElem.scrollBy(0, 10000000);
  }
}
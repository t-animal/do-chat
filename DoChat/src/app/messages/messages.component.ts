import { Component, OnInit } from '@angular/core';
import { WebsocketServiceService } from '../websocket-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  private subscription: Subscription;

  messages: string[] = [];

  constructor(
    private socket: WebsocketServiceService
  ){ }

  ngOnInit() {
    this.subscription = this.socket.getMessages().subscribe((message) => {
      this.messages.push(message);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

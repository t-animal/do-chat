import { Injectable } from '@angular/core';
import { Message } from 'model/message';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  private messages: Message[] = [];

  addMessage(message: Message) {
    this.messages.push(message);
  }

  getHistory() {
    return [...this.messages];
  }
}

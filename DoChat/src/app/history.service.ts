import { Injectable } from '@angular/core';
import { UserMessage } from '@model/message';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  private messages: UserMessage[] = [];

  addMessage(message: UserMessage) {
    this.messages.push(message);
  }

  getHistory() {
    return [...this.messages];
  }

  clearHistory() {
    this.messages = [];
  }
}

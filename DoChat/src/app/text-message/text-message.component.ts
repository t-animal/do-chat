import { Component, Input } from '@angular/core';
import { TextMessage } from '@model/message';

@Component({
  selector: 'app-text-message',
  templateUrl: './text-message.component.html',
  styleUrls: ['./text-message.component.css']
})
export class TextMessageComponent {
  @Input()
  message: TextMessage
}

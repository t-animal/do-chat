import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-audio-message',
  templateUrl: './audio-message.component.html',
  styleUrls: ['./audio-message.component.css']
})
export class AudioMessageComponent {

  @Input()
  message: TextMessage

}

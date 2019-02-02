import { Component, ElementRef, ViewChild } from '@angular/core';
import { WebsocketServiceService } from '../websocket-service.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {

  @ViewChild('input')
  textInput: ElementRef<HTMLTextAreaElement>

  constructor(
    private socket: WebsocketServiceService
  ) { }

  sendMessage(){
    this.socket.sendMessage(this.textInput.nativeElement.value);
    this.textInput.nativeElement.value = "";
  }
}

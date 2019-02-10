import { Component, ElementRef, ViewChild } from '@angular/core';
import { WebsocketServiceService } from '../websocket-service.service';
import * as MicRecorder from 'mic-recorder-to-mp3';
import { AudioRecorderService } from '../audio-recorder.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {

  @ViewChild('input')
  textInput: ElementRef<HTMLTextAreaElement>

  constructor(
    private socket: WebsocketServiceService,
    private recorder: AudioRecorderService
  ) { }

  sendMessage(){
    this.socket.sendMessage(this.textInput.nativeElement.value);
    this.textInput.nativeElement.value = "";
  }

  startRecordingAudio() {
    this.recorder.beginRecording();
  }

  async stopAudioRecording() {
    await this.recorder.endRecording();
    this.socket.sendAudio(this.recorder.getLatestRecording());
  }
}

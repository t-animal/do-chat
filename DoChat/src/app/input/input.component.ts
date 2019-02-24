import { Component, ElementRef, ViewChild } from '@angular/core';
import { WebsocketServiceService } from '../websocket-service.service';
import { AudioRecorderService } from './audio-recorder.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  providers: [ AudioRecorderService ]
})
export class InputComponent {

  @ViewChild('input')
  textInput: ElementRef<HTMLTextAreaElement>

  textHasInput = false;

  constructor(
    private socket: WebsocketServiceService,
    private recorder: AudioRecorderService
  ) { }

  async sendMessage(){
    if(this.recorder.isRecording){
      await this.recorder.endRecording();
      this.socket.sendAudio(this.recorder.getLatestRecording());
      return;
    }

    this.socket.sendMessage(this.textInput.nativeElement.value);
    this.textInput.nativeElement.value = "";
    this.textHasInput = false;
  }

  startRecordingAudio() {
    this.recorder.beginRecording();
  }

  stopAudioRecording() {
    return this.recorder.endRecording();
  }

  textInputEvent(event: Event) {
    console.log(this.textInput)
    this.textHasInput = this.textInput.nativeElement !== undefined && this.textInput.nativeElement.value.trim() !== '';
  }

  shouldShowRecordButton() {
    return !this.textHasInput && !this.recorder.isRecording;
  }

  shouldShowSendButton() {
    return this.textHasInput || this.recorder.isRecording;
  }

  shouldShowTextInput() {
    return !this.recorder.isRecording
  }

  shouldShowRecordingControls() {
    return this.recorder.isRecording
  }
}

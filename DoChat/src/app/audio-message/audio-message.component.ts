import { Component, Input, ViewChild, ElementRef } from '@angular/core';

import { AudioMessage } from '@model/message';

type State = 'stopped' | 'playing' | 'paused';

@Component({
  selector: 'app-audio-message',
  templateUrl: './audio-message.component.html',
  styleUrls: ['./audio-message.component.css']
})
export class AudioMessageComponent {

  duration: number = 0;
  currentTime: number = 0;
  percentage: number = 0;
  state: State = 'stopped';

  @Input()
  message: AudioMessage

  @ViewChild('player')
  player: ElementRef<HTMLAudioElement>;

  updateUI() {
    this.duration = this.player.nativeElement.duration;
    this.currentTime = this.player.nativeElement.currentTime;
    this.percentage = this.currentTime / this.duration * 100;

    if(this.duration - this.currentTime < 0.01){
      this.state = 'stopped';
    }
  }

  play(){
    this.state = 'playing'
    this.player.nativeElement.play();
  }

  stop(){
    this.state = 'stopped';
    this.player.nativeElement.pause();
    this.player.nativeElement.currentTime = 0;
  }

  pause(){
    this.state = 'paused';
    this.player.nativeElement.pause();
  }
}

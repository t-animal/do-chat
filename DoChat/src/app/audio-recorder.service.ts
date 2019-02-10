import { Injectable } from '@angular/core';

import * as MicRecorder from 'mic-recorder-to-mp3';

type Stream = Int8Array[]

@Injectable({
  providedIn: 'root'
})
export class AudioRecorderService {
  private recorder: MicRecorder = new MicRecorder({bitrate: 96});
  private recording = false;
  private latestRecording: [Stream, Blob];

  beginRecording() {
    this.recorder.start()
      .then(() => this.recording = true)  
      .catch(error => alert('Could not start recording audio:' + error));
  }

  async endRecording() {
    if(!this.recording){
      return;
    }
    this.recording = false;
    this.latestRecording = await this.recorder.stop().getMp3();
  }

  getLatestRecording() {
    if(this.latestRecording === undefined){
      return null;
    }

    return this.latestRecording[1];
  }
}

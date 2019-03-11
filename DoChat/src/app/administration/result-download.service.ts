import * as JSZip from 'jszip';

import { Injectable } from '@angular/core';
import { HistoryService } from '../history.service';
import { Message, AudioMessage } from 'model/message';

const AUDIO_MESSAGE_INDICATOR = 'Hat eine Sprachnachricht geschickt';
const UNKNOWN_MESSAGE_TYPE = 'Unbekannter Nachrichtentyp';
const RECORDS_FOLDER = 'aufnahmen';
const RECORDS_PREFIX = 'aufnahme-';
const DOWNLOADABLE_FILENAME = 'chat-data.zip';

@Injectable()
export class ResultDownloadService {

  private formatter = new Intl.DateTimeFormat('de', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric' });

  constructor(
    private historyService: HistoryService
  ) { }

  private createTextFileContent() {
    const header = 'date\tsender name\tsender id\tmessage\n';
    return header + this.historyService
      .getHistory()
      .map((message: Message): string => {
        switch(message.type) {
          case 'text':
            return `${this.formatter.format(message.sendTime)}\t${message.senderName}\t${message.sender}\t${message.payload}\n`;
          case 'audio':
            return `${this.formatter.format(message.sendTime)}\t${message.senderName}\t${message.sender}\t${AUDIO_MESSAGE_INDICATOR}\n`;
          case 'administrative':
            return '';
          default:
            return UNKNOWN_MESSAGE_TYPE + '\n';
        }
      })
      .join('');
  }

  private createAudioFiles() {
    const startIndex = 'data:audio/mp3;base64,'.length;
    return this.historyService
      .getHistory()
      .filter(message => message.type === 'audio')
      .map((message: AudioMessage) => ({name: message.senderName, audio: message.payload.substr(startIndex)}));
  }

  createDownload() {
    const zip = new JSZip();
    
    zip.file('log.csv', this.createTextFileContent());

    zip.folder(RECORDS_FOLDER);
    let i = 0;
    for(const data of this.createAudioFiles()) {
      const fileNumber = ('' + i).padStart(4, '0');
      i++;

      zip.file(`${RECORDS_FOLDER}/${RECORDS_PREFIX}${fileNumber}-${data.name}.mp3`, data.audio, {base64: true});
    }

    zip.generateAsync({type: 'blob'}).then(blob => {
      this.triggerDownload(blob, DOWNLOADABLE_FILENAME);
    });
  }

  private triggerDownload(blob: Blob, name: string) {
    const a = document.createElement('a')
    name = name;

    a.download = name

    a.href = URL.createObjectURL(blob);
    a.click();
  }
}

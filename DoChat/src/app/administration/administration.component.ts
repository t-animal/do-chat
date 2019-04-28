import { Component } from '@angular/core';
import { ConfigHolderService } from '../config-holder.service';
import { ResultDownloadService } from './result-download.service';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css'],
  providers: [ ResultDownloadService ]
})
export class AdministrationComponent {

  serverAddress: string;

  constructor(
    public downloadService: ResultDownloadService,
    private config: ConfigHolderService
  ){ }

  setName(event: Event){
    this.config.setName((<HTMLInputElement>event.target).value);
  }

  setSenderName(event: Event) {
    this.config.setSenderName((<HTMLInputElement>event.target).value);
  }
}

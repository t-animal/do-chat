import { Component, OnDestroy } from '@angular/core';
import { ConfigHolderService } from '../config-holder.service';
import { ResultDownloadService } from './result-download.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css'],
  providers: [ ResultDownloadService ]
})
export class AdministrationComponent implements OnDestroy {

  serverAddress: string;
  serverAddressSubscription: Subscription;

  constructor(
    public downloadService: ResultDownloadService,
    private config: ConfigHolderService
  ){
    this.serverAddressSubscription = config.getServer().subscribe(server => this.serverAddress = server);
  }

  ngOnDestroy() {
    this.serverAddressSubscription.unsubscribe();
  }

  setName(event: Event){
    this.config.setName((<HTMLInputElement>event.target).value);
  }

  setServer(event: Event) {
    alert('Reconnecting to new server. Remember to set this server on all connected "apps"!');
    this.config.setServer((<HTMLInputElement>event.target).value)
  }

  setSenderName(event: Event) {
    this.config.setSenderName((<HTMLInputElement>event.target).value);
  }
}

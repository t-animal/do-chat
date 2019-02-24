import { Component } from '@angular/core';
import { ConfigHolderService } from '../config-holder.service';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent {

  constructor(
    private config: ConfigHolderService
  ){ }

  setName(event: Event){
    this.config.setName((<HTMLInputElement>event.target).value);
  }

  setServer(event: Event) {
    alert('Server changes are not used yet');
    this.config.setName((<HTMLInputElement>event.target).value)
  }
}

import { Component, ViewEncapsulation } from '@angular/core';
import { WebsocketServiceService } from './websocket-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {

  constructor(
    private socketService: WebsocketServiceService // force instantiation to connet (fix this)
  ) {

  }
}

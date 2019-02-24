import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfigHolderService } from '../config-holder.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  name: string = 'Vorname Nachname';
  nameSubscription: Subscription;

  tapCount = 0;
  firstTap = new Date();

  constructor(
    private router: Router,
    private config: ConfigHolderService
  ) { }

  ngOnInit() {
    this.nameSubscription = this.config.getName().subscribe(value => {
      this.name = value;
    })
  }

  ngOnDestroy() {
    this.nameSubscription.unsubscribe();
  }


}

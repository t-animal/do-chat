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

  enterFullscreen() {
    if(!document.body.requestFullscreen){
      return;
    }
    document.body.requestFullscreen();
  }

  secretAdminInterface() {
    const fiveSeconds = 5 * 1000;
    if(new Date().getTime() - this.firstTap.getTime() > fiveSeconds) {
      this.tapCount = 0;
      this.firstTap = new Date();
    }

    this.tapCount++;

    if(this.tapCount >= 10 && new Date().getTime() - this.firstTap.getTime() < fiveSeconds) {
      this.tapCount = 0;
      this.firstTap = new Date();
      this.router.navigateByUrl('/admin');
    }
  }

}

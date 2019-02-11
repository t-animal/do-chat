import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { InputComponent } from './input/input.component';
import { MessagesComponent } from './messages/messages.component';
import { HeaderComponent } from './header/header.component';
import { TextMessageComponent } from './text-message/text-message.component';
import { AudioMessageComponent } from './audio-message/audio-message.component';
import { StorageServiceModule } from 'angular-webstorage-service';

@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    MessagesComponent,
    HeaderComponent,
    TextMessageComponent,
    AudioMessageComponent
  ],
  imports: [
    BrowserModule,
    StorageServiceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

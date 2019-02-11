import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { InputComponent } from './input/input.component';
import { MessagesComponent } from './messages/messages.component';
import { HeaderComponent } from './header/header.component';
import { TextMessageComponent } from './text-message/text-message.component';
import { AudioMessageComponent } from './audio-message/audio-message.component';
import { StorageServiceModule } from 'angular-webstorage-service';
import { AdministrationComponent } from './administration/administration.component';
import { ChatComponent } from './chat/chat.component';

const appRoutes: Routes = [
  { path: 'admin', component: AdministrationComponent },
  { path: '',      component: ChatComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    MessagesComponent,
    HeaderComponent,
    TextMessageComponent,
    AudioMessageComponent,
    AdministrationComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    StorageServiceModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

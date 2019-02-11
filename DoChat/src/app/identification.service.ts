import { Injectable, Inject } from '@angular/core';

import { LOCAL_STORAGE, StorageService } from 'angular-webstorage-service';


const ID_KEY = 'ID';

@Injectable({
  providedIn: 'root'
})
export class IdentificationService {
  private id = this.generateNewId();

  constructor(
     @Inject(LOCAL_STORAGE) private storage: StorageService
  ){ }

  getId() {
    return this.id;
  }

  private generateNewId(){
    if(this.storage.get(ID_KEY) === null){
      this.storage.set(ID_KEY, Math.random().toString(36).substr(2));
    }
    
    return this.storage.get(ID_KEY);
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdentificationService {
  private id = this.generateNewId();

  getId() {
    return this.id;
  }

  private generateNewId(){
    return Math.random().toString(36).substr(2);
  }
}

import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {

  private dataIdSource = new Subject();
  currentId = this.dataIdSource.asObservable();

  constructor() { }

  sendId(id: number) {
    this.dataIdSource.next(id);
  }
}

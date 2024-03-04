import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private storage = new BehaviorSubject<any>({});

  constructor() {
    this.storage.next(localStorage);
  }

  get(): Observable<any> {
    return this.storage.asObservable();
  }

  set(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
    this.storage.next(localStorage);
  }

  remove(key: string): void {
    localStorage.removeItem(key);
    this.storage.next(localStorage);
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private readonly storage;

  public constructor() {
    this.storage = window.localStorage;
  }

  set(key: string, obj: any): void {
    const objToString = JSON.stringify(obj);
    this.storage.setItem(key, objToString);
  }

  get(key: string): object | null {
    const str = window.localStorage.getItem(key);

    if (str == null)
      return str
    else
      return JSON.parse(str);
  }
}

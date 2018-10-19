import { Injectable } from '@angular/core';
import { ConfigService } from "./config.service";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private config: ConfigService) {}

  /**
   * Set a storage key value pair item
   * @param {string} key
   * @param value
   */
  public set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * Retrieve an item from storage with the items key
   * @param {string} key
   * @returns {any}
   */
  public get(key: string): any {
    const storeItem = localStorage.getItem(key);
    return JSON.parse(storeItem);
  }
}

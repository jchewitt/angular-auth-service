import { Injectable } from '@angular/core';

@Injectable()
export class AppLoaderService {
  public displaySpinner: boolean = false;

  constructor() {/**/}

  public show(): void {
    this.displaySpinner = true;
  }

  public hide(): void {
    this.displaySpinner = false;
  }

}

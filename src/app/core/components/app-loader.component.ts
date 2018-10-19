import { Component, OnInit } from '@angular/core';
import { AppLoaderService } from "../services/app-loader.service";

@Component({
  selector: 'app-loader',
  template: `
    <div class="overlay" *ngIf="spinnerService.displaySpinner">
      <div class="spinner"></div>
    </div>
  `,
  styles: [`
    div.overlay {
      position: fixed;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      z-index: 5000;
      background-color: rgba(255, 255, 255, 0.5);
    }

    div.spinner {
      width: 64px;
      height: 64px;
      left: calc(50% - 32px);
      top: calc(50% - 32px);
      position: fixed;
      background-image: url('/assets/images/spinner.svg');
      background-position: center center;
      background-size: contain;
      background-repeat: no-repeat;
    }
  `]
})
export class AppLoaderComponent implements OnInit {

  constructor(public spinnerService: AppLoaderService) {/**/}

  ngOnInit() {
  }

}

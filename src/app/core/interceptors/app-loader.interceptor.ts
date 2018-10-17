import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AppLoaderService } from "../services/app-loader.service";

@Injectable()
export class AppLoaderInterceptor implements HttpInterceptor {
  private count: number = 0;

  constructor(private spinnerService: AppLoaderService) {/**/}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.count++;
    if (this.count === 1) {
      this.spinnerService.show();
    }

    return next.handle(req).pipe(
      finalize(() => {
        this.count--;
        if (this.count === 0) {
          this.spinnerService.hide();
        }
      })
    );
  }
}

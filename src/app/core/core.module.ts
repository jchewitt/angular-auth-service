import { APP_INITIALIZER, ModuleWithProviders, NgModule, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AuthInterceptor } from "./interceptors/auth-interceptor";
import { ConfigService } from "./services/config.service";
import { AppLoaderService } from "./services/app-loader.service";
import { AppLoaderInterceptor } from "./interceptors/app-loader.interceptor";
import { IHttpConfig } from "./models/http-config.interface";
import { AuthService } from "./services/auth.service";
import { propertiesResolverFactory } from "./properties-resolver.factory";
import { StorageService } from "./services/storage.service";
import { AppLoaderComponent } from "./components/app-loader.component";
import { AuthGuardService } from "./services/auth-guard.service";
import { UserService } from './services/user.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [
    AppLoaderComponent
  ],
  exports: [
    AppLoaderComponent
  ]
})
export class CoreModule {
  public static forRoot(config?: IHttpConfig): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        AppLoaderService,
        HttpClientModule,
        StorageService,
        AuthGuardService,
        UserService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: AppLoaderInterceptor, multi: true },
        ConfigService,
        {provide: 'CONFIG', useValue: config},
        {
          provide: APP_INITIALIZER,
          useFactory: propertiesResolverFactory,
          deps: [ConfigService, AuthService, [new Inject('CONFIG')]],
          multi: true
        }

      ]
    };
  }
}

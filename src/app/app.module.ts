import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CONFIG } from "../app-config";
import { CoreModule } from "./core/core.module";
import { AppRoutingModule } from "./app-routing.module";
import { AccountModule } from "./account/account.module";
import { AppCommonModule } from "./common/app-common.module";
import { ProtectedModule } from "./protected/protected.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  imports: [
    BrowserModule,
    CoreModule.forRoot(CONFIG),
    AppCommonModule,
    AppRoutingModule,
    AccountModule,
    ProtectedModule,
    BrowserAnimationsModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

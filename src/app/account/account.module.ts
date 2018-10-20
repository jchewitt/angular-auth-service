import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './components/account/account.component';
import { LoginComponent } from './components/login/login.component';
import { RouterModule } from "@angular/router";
import { AppCommonModule } from "../common/app-common.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginGuardService } from "./services/login-guard.service";
import { MatButtonModule, MatCardModule, MatInputModule } from "@angular/material";
import { RegisterComponent } from "./components/register/register.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AppCommonModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule
  ],
  declarations: [
    AccountComponent,
    LoginComponent,
    RegisterComponent
  ],
  providers: [
    LoginGuardService
  ]
})
export class AccountModule {
}

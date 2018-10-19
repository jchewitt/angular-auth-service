import { Routes } from "@angular/router";
import { AccountComponent } from "./components/account/account.component";
import { LoginComponent } from "./components/login/login.component";
import { LoginGuardService } from "./services/login-guard.service";

export const AccountRoutes: Routes = [
  {
    path: '',
    component: AccountComponent,
    canActivate: [LoginGuardService],
    children: [{
      path: '',
      redirectTo: 'login',
      pathMatch: 'full'
    },{
      path: 'login',
      component: LoginComponent
    }]
  }
];

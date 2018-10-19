import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountRoutes } from "./account/account.routes";
import { ProtectedRoutes } from "./protected/protected.routes";
import { AuthGuardService } from "./core/services/auth-guard.service";

const routes: Routes = [
  {
    path: '',
    children: [{
      path: '',
      redirectTo: 'protected',
      pathMatch: 'full'
    },{
      path: 'account',
      children: AccountRoutes
    }, {
      path: 'protected',
      canActivate: [AuthGuardService],
      children: ProtectedRoutes
    }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

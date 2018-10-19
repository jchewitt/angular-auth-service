import { Component } from "@angular/core";
import { AuthService } from "../../core/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-protected',
  template: `
    <h1>Protected area</h1>
    <a href (click)="logout()">Logout</a>
  `
})
export class ProtectedComponent {
  constructor(private authService: AuthService, private router: Router) {/**/}

  /**
   * Logs out from the app
   */
  public logout(): void {
    this.authService.logout().subscribe(() =>{
      this.router.navigate(['/']);
    });
  }
}

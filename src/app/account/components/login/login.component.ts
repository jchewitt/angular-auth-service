import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../core/services/auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { StorageService } from "../../../core/services/storage.service";
import { FormControl, Validators } from "@angular/forms";
import { MyErrorStateMatcher } from "../../../common/form-utilities/error-state-matcher";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public emailControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  public passwordControl: FormControl = new FormControl('', [
    Validators.required
  ]);

  public matcher: MyErrorStateMatcher = new MyErrorStateMatcher();

  constructor(
    private authService: AuthService,
    private router: Router,
    private storage: StorageService) {
  }

  /**
   * Ng hood - component initialization
   */
  public ngOnInit(): void {
  }

  /**
   * Attempt logging in
   */
  public doLogin(): void {
    this.authService.login(this.emailControl.value, this.passwordControl.value).subscribe(res => {
      if (res) {
        const retUrl = this.storage.get('return_url');
        if (retUrl) {
          window.location.href = retUrl;
        } else {
          this.router.navigate(['/protected']);
        }
      }
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../core/services/auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { StorageService } from "../../../core/services/storage.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MyErrorStateMatcher } from "../../../common/form-utilities/form-utilities";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [Validators.required])
  });

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
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(res => {
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

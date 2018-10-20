import { Component } from "@angular/core";
import { UserService } from "../../../common/services/user.service";
import {
  ConfirmValidParentMatcher,
  CustomValidators,
  errorMessages, MyErrorStateMatcher, regExps
} from "../../../common/form-utilities/form-utilities";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { RegisterModel } from "../../../common/models/register.model";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  public confirmValidParentMatcher = new ConfirmValidParentMatcher();
  public matcher = new MyErrorStateMatcher();
  public errors = errorMessages;
  public registrationComplete: boolean = false;
  public registerForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    passwordGroup: new FormGroup({
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(regExps.password)
      ]),
      confirmPassword: new FormControl('', [Validators.required])
    }, [CustomValidators.childrenEqual])
  });
  constructor(private userService: UserService) {/**/}

  /**
   * Call the auth api to register the user
   */
  public doRegister(): void {
    if (!this.registerForm.valid) {
      return;
    }
    const user = new RegisterModel();
    user.name = this.registerForm.value['name'];
    user.email = this.registerForm.value['email'];
    user.password = this.registerForm.value['passwordGroup']['password'];
    this.userService.register(user).subscribe(() => {
      this.registrationComplete = true;
    });
  }
}

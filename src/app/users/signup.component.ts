import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { User } from './user.model';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})

export class SignupComponent implements OnInit {

  myForm: FormGroup;

  constructor ( private authService: AuthService) {}

  ngOnInit() {
    this.myForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
      ]),
      password: new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    const user = new User(this.myForm.value.email, this.myForm.value.password, this.myForm.value.firstName, this.myForm.value.lastName);
    this.authService.signup(user)
      .subscribe(
        data => console.log(data),
        error => console.log(error)
      )
    this.myForm.reset();
  }

}


/*
  two approches to create form
    1. using the all individual elements (used here)
    2. using form builder tool

  FormGroup takes a java script obj as input which describes it
  we will register the controls here
  key is the name of the control and value is how we configure it

  FormControl:
    1st arg is the default value
    2nd arg is validations

    For email we have added additional Validators.
    When adding multiple Validators the 2nd arg becomes an array where all the validations are specified
*/

import { Component, inject, signal, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgClass } from '@angular/common';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule, NgClass],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  authService = inject(AuthService);

  private form = viewChild<NgForm>('form');
  User_already_registered = signal(false);
  loginErr = signal(false);
  isLogin = true;

  onSwitch() {
    this.isLogin = !this.isLogin;
    this.User_already_registered.set(false);
    this.loginErr.set(false);
    this.form()?.reset();
  }

  signInWithGoogle() {
    this.authService.signInWithGoogle().subscribe((result) => {
      if (result.error) {
        console.log(result.error);
      } else {
        console.log(result.data);
      }
    });
  }

  onSubmit(formData: NgForm) {
    if (formData.invalid) {
      return;
    }

    const email = formData.form.value.email;
    const password = formData.form.value.password;
    const name = formData.form.value.name;

    if (this.isLogin) {
      this.authService.login(email, password).subscribe((result) => {
        if (result.error) {
          if (result.error.code === 'invalid_credentials') {
            this.loginErr.set(true);
          }
        } else {
          console.log(result.data);
        }
      });
    } else {
      this.authService.register(email, password, name).subscribe((result) => {
        if (result.error) {
          if (result.error.message === 'User already registered') {
            this.User_already_registered.set(true);
          }
        } else {
          console.log(result.data);
        }
      });
    }
    this.form()?.controls['password'].reset();
  }
}

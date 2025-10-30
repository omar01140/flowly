import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule, NgClass],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  isLogin = false;
  authService = inject(AuthService);

  onSwitch() {
    this.isLogin = !this.isLogin;
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
    this.authService.register(email, password, name).subscribe((result) => {
      if (result.error) {
        console.log(result.error);
      } else {
        console.log(result.data);
      }
    });
    formData.reset();
  }
}

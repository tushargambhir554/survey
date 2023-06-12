import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'auth.service';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/assets/UserService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  password: string | undefined;
  showPassword: boolean = false;
  errorMessage: any;

  loginObj: any = {
    username: '',
    password: '',
    email: ''
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    private http: HttpClient,
    private userService: UserService
  ) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }

  login() {
    if (!this.loginObj.username && !this.loginObj.email || !this.loginObj.password) {
      this.errorMessage = 'Please enter your username/email and password';
      return;
    }

    this.userService.login(this.loginObj.username, this.loginObj.password).subscribe(
      (response: any) => {
        const accessToken = response.accessToken;
        this.userService.setAuthToken(accessToken);

        this.authService.login();
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        this.errorMessage = 'Invalid username/email or password';
        console.error('Error fetching login details:', error);
      }
    );
  }
}

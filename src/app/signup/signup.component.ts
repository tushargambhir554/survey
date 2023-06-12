import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  
  goToLogin() {
    this.router.navigate(['/login']);
  }

  password: string | undefined;
  showPassword: boolean = false;

  passwordVisible: boolean = false;
  passwordFieldType: string = 'password';

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
    this.passwordFieldType = this.passwordVisible ? 'text' : 'password';
  }

  signupUsers:any[]=[];
  signupObj:any={
    username:'',
    email:'',
    password:''
  }

  constructor(private snackBar: MatSnackBar, private formBuilder: FormBuilder,private router:Router) {}
  signupForm: FormGroup | undefined;


  
  
  signup() {
    
    if (!this.isValidEmail(this.signupObj.email)) {
      console.log('Invalid email format');
      return;
    }
  
    
    if (this.signupObj.password.length < 6 || !this.hasSpecialCharacter(this.signupObj.password)) {
      console.log('Password does not meet the requirements.');
      return;
    }
  
    
    const localData = localStorage.getItem('signUpUsers');
    let signUpUsers = [];
  
    if (localData) {
      signUpUsers = JSON.parse(localData);
    }
  
    // check if username or email already exists
    const existingUser = signUpUsers.find((user: any) => user.username === this.signupObj.username || user.email === this.signupObj.email);
    if (existingUser) {
      console.log('Username or email already exists.');
      return;
    }
  

    signUpUsers.push(this.signupObj);
  
    localStorage.setItem('signUpUsers', JSON.stringify(signUpUsers));  
    console.log('Signup successful!');
    this.router.navigate(['/login']);
    
  }
  
  hasSpecialCharacter(password: string): boolean {
    const specialCharacters = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
    return specialCharacters.test(password);
  }
  
  isValidEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }
}  

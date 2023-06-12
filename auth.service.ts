import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInKey = 'isLoggedIn';
  private isLoggedInValue: boolean = false;

  constructor() {
    this.isLoggedInValue = this.getLoginStatusFromStorage();
  }

  isLoggedIn(): boolean {
    return this.isLoggedInValue;
  }

  login(): void {
    // Perform login logic here
    this.isLoggedInValue = true;
    this.saveLoginStatusToStorage();
  }

  logout(): void {
    // Perform logout logic here
    this.isLoggedInValue = false;
    this.clearLoginStatusFromStorage();
  }

  private getLoginStatusFromStorage(): boolean {
    const loginStatus = sessionStorage.getItem(this.isLoggedInKey);
    return loginStatus === 'true';
  }

  private saveLoginStatusToStorage(): void {
    sessionStorage.setItem(this.isLoggedInKey, this.isLoggedInValue.toString());
  }

  private clearLoginStatusFromStorage(): void {
    sessionStorage.removeItem(this.isLoggedInKey);
  }
}

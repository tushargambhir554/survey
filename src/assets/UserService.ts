import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://dev.platformcommons.org/gateway/auth-service/api/auth/v1';
  private authTokenKey = 'authToken';

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    const loginUrl = `${this.apiUrl}/login`;

    const payload = {
      userLogin: username,
      password: password
    };

    return this.http.post(loginUrl, payload);
  }

  setAuthToken(token: string) {
    sessionStorage.setItem(this.authTokenKey, token);
  }

  getAuthToken(): string | null {
    return sessionStorage.getItem(this.authTokenKey);
  }

  removeAuthToken() {
    sessionStorage.removeItem(this.authTokenKey);
  }

  getRequestHeaders() {
    const authToken = this.getAuthToken();

    if (authToken) {
      return {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      };
    }

    return {};
  }

  getUserData() {
    const userDataUrl = `${this.apiUrl}/user-data`;
    const headers = this.getRequestHeaders();

    return this.http.get(userDataUrl, headers);
  }

}

import { Injectable } from '@angular/core';
import { Credenciais } from '../models/credenciais';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../config/api.config';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtService: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  authenticate(creds: Credenciais){
    return this.http.post(`${API_CONFIG.baseUrl}/auth/login`, creds, {
      observe: 'response',
      responseType: 'text'
    })
  }

  sucessfullLogin(authToken: string) {
    localStorage.setItem('token', authToken);
  }

  isAuthenticated(){
    let token = localStorage.getItem('token');
    if(token != null) {
      return !this.jwtService.isTokenExpired(token);
    }
    return false;
  }

  changePassword(oldPassword: string, newPassword: string): Observable<void> {
    const data = {
      oldPassword,
      newPassword
    };
    return this.http.post<void>(`${API_CONFIG.baseUrl}/auth/change-password`, data);
  }

  logout(){
    localStorage.clear();
  }
}

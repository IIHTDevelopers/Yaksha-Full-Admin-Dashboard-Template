import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly tokenKey = 'jwtToken';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.isTokenValid());

  constructor() { }

  // Save JWT token to localStorage
  saveToken(token: string): void {
  }

  // Get JWT token from localStorage
  getToken(): string | null {
    return null;
  }

  // Remove JWT token from localStorage
  removeToken(): void {
  }

  // Check if the token is valid (not expired)
  isTokenValid(): boolean {
    return false;
  }

  // Decode JWT token
  decodeToken(token: string): any {
  }

  // Authentication status observable
  get isAuthenticated(): Observable<boolean> {
    return of(false);
  }

  // Simulate login action (using the mock credentials and JWT generation)
  login(username: string, password: string): Observable<any> {
    return of(false);
  }

  // Perform logout action
  logout(): void {
  }
}

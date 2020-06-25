import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isAuthenticated(): boolean {
    // temporary solution
    const token = localStorage.getItem('session');
    if (token) {
      return true;
    }
    return false;
  }
}

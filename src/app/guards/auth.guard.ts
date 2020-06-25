import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../services/backend/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}

  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['signin']);
    }
    return true;
  }
}

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CachingService } from '../services/caching.service';

@Injectable({
  providedIn: 'root'
})
export class SorGuard implements CanActivate {
  constructor(public cachingService: CachingService, public router: Router) {}

  canActivate(): boolean {
    if (!this.cachingService.getSorAccount()) {
      this.router.navigate(['signin']);
    }
    return true;
  }
}

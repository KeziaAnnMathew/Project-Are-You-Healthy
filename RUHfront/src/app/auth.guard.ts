import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RuhserviceService } from './ruhservice.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private serv:RuhserviceService,private router:Router){}
  canActivate():boolean{
    if(this.serv.loggedIn())
    {
      return true;
    }
    else{
      this.router.navigate(['/login']);
      return false
    }
  }
  
}

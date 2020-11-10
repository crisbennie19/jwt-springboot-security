import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from '../data.service';

@Injectable({
  providedIn: 'root'
})
export class AccessGuard implements CanActivate {
  constructor(private data:DataService){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        
    var allowedRoles = next.data.allowedRoles
    var hasAccess = this.hasAccess(allowedRoles)

    if(!hasAccess){
      this.data.logout()
    }

    return hasAccess;
  }

  
  hasAccess(allowedRoles:string[]):boolean{
    if (allowedRoles == null || allowedRoles.length === 0) {
      return true;
    }

    let activeUser = JSON.parse(localStorage.getItem('adminUser') )
    
    
    return allowedRoles.some( r => activeUser.data.roles.includes(r) )
  } 
  
}

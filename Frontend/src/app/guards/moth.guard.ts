import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class MothGuard implements CanActivate {
  constructor(private mothService: UserService, private router:Router){}
  canActivate(){
    if(this.mothService.getCurrentUser()){
      return true;
    }else{
      this.router.navigate(["/login"]);
      return false;
    }

  }
  
}

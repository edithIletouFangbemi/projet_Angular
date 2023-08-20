import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild,Router, RouterStateSnapshot,UrlTree
 } from '@angular/router';

@Injectable()
export class AuthGard implements CanActivate , CanActivateChild {

  constructor(private router:Router) { }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    return this.verifyLogin(url);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    let url: string = state.url;
    return this.verifyLogin(url);
  }

  verifyLogin(url: string) : boolean {
    if(!this.isLogged()){
      this.router.navigate(['/']);
      return false;
    }
    else if(this.isLogged()){
      return true;
    }
    else{
      return false;
    }
  }

  public isLogged():boolean{
    let status = false;
    if(localStorage.getItem('isLogged') == "true"){
      status = true;
    }
    else{
      status = false;
    }

    return status;
  }

}

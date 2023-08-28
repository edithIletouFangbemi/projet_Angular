import { Injectable } from '@angular/core';
import { TokenServiceService } from '../../tokenService/token-service.service';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenExpirationGuardService implements CanActivate{

  constructor(
    private tokenService: TokenServiceService,
    private router: Router
  ) { }
  token!: any;

  canActivate(): boolean {
    let access_token = localStorage.getItem('token')
    if(access_token !== null && access_token !== undefined && access_token !== "") {
      this.token = access_token
    } // Vous devrez obtenir le token ici
    if (this.tokenService.isTokenExpired(this.token)) {
      console.log('Le token a expiré, redirection vers la page de connexion');
      this.router.navigate(['/']); // Redirection vers la page de connexion
      return false; // Empêche l'accès à la route actuelle
    }
    return true; // Autorise l'accès à la route actuelle
  }
}

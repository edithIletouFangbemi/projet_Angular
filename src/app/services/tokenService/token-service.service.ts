import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenServiceService {

  constructor(
    private jwtHelper: JwtHelperService,
    private router: Router
  ) { }

  isTokenExpired(token: string): boolean {
    const decodedToken = this.jwtHelper.decodeToken(token);
    const expirationDate = new Date(decodedToken.exp * 1000); // Convertir en millisecondes
    const currentDate = new Date();
    return expirationDate <= currentDate;
  }

  redirectToLoginIfTokenExpired(token: string) {
    if (this.isTokenExpired(token)) {
      console.log('Le token a expiré, redirection vers la page de connexion');
      this.router.navigate(['/login']); // Redirection vers la page de connexion
    }
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable, map, of } from 'rxjs';
import { apiConfig } from 'src/app/config';
import { Utilisateur } from 'src/app/model/utilisateur';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  constructor(private http: HttpClient, private cookie : CookieService, private _route : Router) { }
  apiUrl: string = apiConfig.host + '/api/v1/auth';
  public token = this.cookie.get('jwtToken');

 /* public utilisateurRegister(data): Observable<any> {
    if(!this.token ){
      localStorage.setItem("isLogged","false");
      this._route.navigate(["/"]);
    }
    else{
      let tokenStr = "Bearer "+this.token;
      const headers = new HttpHeaders().set("Authorization", tokenStr) ;
    return this.http.post<any>(`${this.apiUrl}`
      , data, {headers,responseType: "text" as "json"});


    }

  }*/
 /* register(data: Utilisateur): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/${'register'}`, data, {responseType: "text" as "json" });
  }
*/
 register(data: Utilisateur): Observable<any> {
    if (!this.token) {
      localStorage.setItem("isLogged", "false");
      return of();
    } else {
      let tokenStr = "Bearer " + this.token;
      const headers = new HttpHeaders().set("Authorization", tokenStr);
      return this.http.post<any>(`${this.apiUrl}/${'register'}`, data, { headers, responseType: "text" as "json" });
    }
  }
}

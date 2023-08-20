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

  constructor(private http: HttpClient) { }
  apiUrl: string = apiConfig.host + '/utilisateur';


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
/*
 register(data: Utilisateur): Observable<any> {
    if (!this.token) {
      localStorage.setItem("isLogged", "false");
      return of();
    } else {
      let tokenStr = "Bearer " + this.token;
      const headers = new HttpHeaders().set("Authorization", tokenStr);
      return this.http.post<any>(`${this.apiUrl}/${'register'}`, data, { headers, responseType: "text" as "json" });
    }
  }*/

 /* getAll(): Observable<Utilisateur[]>{
    if (!this.token) {
      localStorage.setItem("isLogged", "false");
      return of();
    } else {
      let tokenStr = "Bearer " + this.token;
      const headers = new HttpHeaders().set("Authorization", tokenStr);
      return this.http.get<any>(`${this.apiUrl}/${'register'}`, { headers, responseType: "text" as "json" });
    }
  }*/

  register(data: Utilisateur): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/${'register'}`, data, {responseType: "text" as "json" });
  }

  getAll(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/${'all'}`);
  }

  getOne(code : string): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/${code}`, {responseType: "text" as "json" });
  }

  update(code: string, data: Utilisateur) : Observable<any>{
    return this.http.put<any>(`${this.apiUrl}/${code}`, data, {responseType: "text" as "json" });
  }

  delete(code: String) : Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/${code}`);
  }

  activer(code: String): Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}${"/activer/"+code}`);
  }
}

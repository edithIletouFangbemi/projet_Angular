import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of, pipe, switchMap } from 'rxjs';
import { ForgotPassword } from 'src/app/model/forgot';
import { Login } from 'src/app/model/login';
import { ResetPasswordRequest } from 'src/app/model/resetPasswordRequest';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiUrl = 'http://localhost:8080/utilisateur';
  isLogged$ = new BehaviorSubject(false);
  isLogged: any;
  userData: any;
  router:any;

  constructor(private http : HttpClient) {}

  onLogin(data:Login): Observable<any>{

      return this.http.post<any>(`${this.apiUrl}/${'authentication'}`
      , data, httpOptions)

    }

  forgotPassword(data: string): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/${'forgot'}`
    , data)
  }

  reset(data: ResetPasswordRequest): Observable<any>{
    return this.http.post<string>(`${this.apiUrl}/${'reset'}`
    , data, httpOptions)
   }
   logOut(){

      this.clearData();
      this.isLogged.next(false);
      this.router.navigate(['/']);
    }

    clearData(){
      this.userData = null;
      localStorage.clear();
    }



}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of, pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:8080/api/v1/auth/authentication';
  isLogged = new BehaviorSubject(false);
  userData: any = null;

  constructor(private http : HttpClient) {}
 /*  public onLogin(email: string, password: string): Observable<boolean>{

      return this.http.post<any>(`${this.apiUrl}`
      , { email, password }, {responseType: "text" as "json"})
      .pipe(
        map(response => {
          const token = response.token;
          if (token) {
            this.storeToken(token); // Stocker le token dans les cookies
            localStorage.setItem('isLogged','true')
            return true;
          }
          return false;
        })
      );

     // localStorage.setItem('usermeta', JSON.stringify(this.userData));
      //this.isLogged.next(true);

    }*/
   /* logOut(){

      this.clearData();
      this.isLogged.next(false);
      this.router.navigate(['/']);
    }

    clearData(){
      this.userData = null;
      localStorage.clear();
    }*/
    onLogin(){
      localStorage.setItem('usermeta', JSON.stringify(this.userData));
      localStorage.setItem("isLogged","true");
      this.isLogged.next(true);
    }


    logout(): void {
      this.removeToken(); // Supprimer le token des cookies
    }

    private storeToken(token: string): void {
      // Stocker le token dans les cookies
      document.cookie = `jwtToken=${token}; path=/`;
    }

    private removeToken(): void {
      // Supprimer le token des cookies
      document.cookie = 'jwtToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

}

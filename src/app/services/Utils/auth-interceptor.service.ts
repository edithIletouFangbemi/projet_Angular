import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { apiConfig } from "src/app/config";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor  {
   constructor() {}
   token:any
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const loginUrl =  apiConfig.host + '/utilisateur/authentication'
    let access_token = localStorage.getItem('token')
    if(access_token !== null && access_token !== undefined && access_token !== "") {
      this.token = access_token
    }
    if (request.url === loginUrl) {
      request = request.clone({
        headers: request.headers.set(
          'Content-Type',
          'application/json',
        ),
      }
      );
    } else {
      if (this.token) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${this.token}`,
          }
        });
      }
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && this.token) {
          // Si la requête échoue avec une erreur 401 et que nous avons un token, essayez de le rafraîchir.
          return this.refreshTokenAndRetry(request, next);
        }
        return throwError(error);
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  private refreshTokenAndRetry(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // TODO: Appeler le serveur pour rafraîchir le token en utilisant le "refresh token".
    // Une fois que le nouveau token est obtenu, stockez-le et répétez la requête initiale.
    return throwError('La gestion du rafraîchissement du token n\'est pas encore mise en place.');
  }
}

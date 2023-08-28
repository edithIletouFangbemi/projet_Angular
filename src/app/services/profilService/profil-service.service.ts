import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiConfig } from 'src/app/config';
import { Profil } from 'src/app/model/Profil';
import { ProfilRequest } from 'src/app/model/ProfilRequest';

@Injectable({
  providedIn: 'root'
})
export class ProfilServiceService {

  constructor(private http: HttpClient) { }
  apiBaseUrl: string = apiConfig.host + '/profil';

  save(data: ProfilRequest) : Observable<any>{
    return this.http.post<any>(`${this.apiBaseUrl}/${"creer"}`, data)
  }

  getAll(): Observable<any>{
    return this.http.get<any>(`${this.apiBaseUrl}/${"all"}`)
  }

  update(data: Profil): Observable<any>{
    return this.http.put<any>(`${this.apiBaseUrl}/${"update"}/${data.codeProfil}`, data)
  }

  activate(code: string): Observable<any>{
    return this.http.delete<any>(`${this.apiBaseUrl}/${"activer"}/${code}`)
  }

  deactivate(code: string): Observable<any>{
    return this.http.delete<any>(`${this.apiBaseUrl}/${"desactiver"}/${code}`)
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiConfig } from 'src/app/config';
import { LicenceServeur } from 'src/app/model/licenceServeur';
import { LicenceServeurReturn } from 'src/app/model/licenceServeurReturn';

@Injectable({
  providedIn: 'root'
})
export class LicenceServeurService {

  constructor(private http: HttpClient) { }

  apiBaseUrl: string = apiConfig.host +"/licenceServeur";

  save(data: LicenceServeur): Observable<LicenceServeurReturn>{
    return this.http.post<LicenceServeurReturn>(`${this.apiBaseUrl}/${"creer"}`, data);
  }
  all(): Observable<LicenceServeurReturn[]>{
    return this.http.get<LicenceServeurReturn[]>(`${this.apiBaseUrl}/${"liste"}`);
  }

  institutions() : Observable<any>{
    return this.http.get<any>(`${this.apiBaseUrl}/${"liste-institution"}`);
  }

  agences(code: string): Observable<any>{
    return this.http.get<any>(`${this.apiBaseUrl}/${"liste-agence"}/${code}`);
  }
}

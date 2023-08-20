import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiConfig } from 'src/app/config';
import { LicenceRecapRequest } from 'src/app/model/licenceRecapRequest';

@Injectable({
  providedIn: 'root'
})
export class LicenceClienteServiceService {

  constructor(private http: HttpClient) { }

  apiBaseUrl: string = apiConfig.host +"/licence";

  institutions() : Observable<any>{
    return this.http.get<any>(`${this.apiBaseUrl}/${'institutions'}`)
  }

  agences(codeinst : string) : Observable<any>{
    return this.http.get<any>(`${this.apiBaseUrl}/${'agences'}/${codeinst}`)
  }

  produits(codeinst : string) : Observable<any>{
    return this.http.get<any>(`${this.apiBaseUrl}/${'produits'}/${codeinst}`)
  }

  modules(codeagence : string, codeproduit: string) : Observable<any>{
    return this.http.get<any>(`${this.apiBaseUrl}/${'modules'}/${codeagence}/${codeproduit}`)
  }

  generateLicence(data: any): Observable<any>{
    return this.http.post<any>(`${this.apiBaseUrl}/${'generer'}`, data)
  }

  recap(): Observable<LicenceRecapRequest[]>{
    return this.http.get<LicenceRecapRequest[]>(`${this.apiBaseUrl}/${'recapLicence'}`)
  }

  getAll(): Observable<number>{
    return this.http.get<number>(`${this.apiBaseUrl}/${'all-active'}`)
  }
}

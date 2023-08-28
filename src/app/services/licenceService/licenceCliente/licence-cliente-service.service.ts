import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiConfig } from 'src/app/config';
import { PosteDetailRequest } from 'src/app/model/PosteDetailRequest';
import { LicenceRecapRequest } from 'src/app/model/licenceRecapRequest';
import { RecapAgence } from 'src/app/model/reapAgence';

@Injectable({
  providedIn: 'root'
})
export class LicenceClienteServiceService {

  constructor(private http: HttpClient) { }

  apiBaseUrl: string = apiConfig.host +"/licence";

  institutions() : Observable<any>{
    return this.http.get<any>(`${this.apiBaseUrl}/${'institutions'}`)
  }

  agences(codeinst : string, codeproduit: string) : Observable<any>{
    return this.http.get<any>(`${this.apiBaseUrl}/${'agences'}/${codeinst}/${codeproduit}`)
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

  getLicence(codeLicence : string):Observable<any>{
    return this.http.get<number>(`${this.apiBaseUrl}/${'uneLicence'}/${codeLicence}`)
  }

  getRecapAgence(codeinst: string): Observable<RecapAgence[]>{
    return this.http.get<RecapAgence[]>(`${this.apiBaseUrl}/${'recap-agence'}/${codeinst}`)
  }

  getRecapPoste(codeagence: string ): Observable<PosteDetailRequest[]>{
    return this.http.get<PosteDetailRequest[]>(`${this.apiBaseUrl}/${'recap-poste'}/${codeagence}`)
  }
}

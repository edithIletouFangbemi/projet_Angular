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
  allByInst(codeinst: string): Observable<LicenceServeurReturn[]>{
    return this.http.get<LicenceServeurReturn[]>(`${this.apiBaseUrl}/${"listeByInst"}/${codeinst}`);
  }
  institutions() : Observable<any>{
    return this.http.get<any>(`${this.apiBaseUrl}/${"liste-institution"}`);
  }

  agences(code: string): Observable<any>{
    return this.http.get<any>(`${this.apiBaseUrl}/${"liste-agence"}/${code}`);
  }

  download(liste: LicenceServeur): Observable<any>{
    const httpOption = {
      responseType : 'arraybuffer' as 'json',
    }
    return this.http.post<any>(`${this.apiBaseUrl}/${"telecharger"}`, liste, httpOption)
  }

  getProduit(codeInst: string): Observable<any>{
    return this.http.get<any>(`${this.apiBaseUrl}/${"produits"}/${codeInst}`);
  }

  getModule(codeProduit: string, codeAgence: string): Observable<any>{
    return this.http.get<any>(`${this.apiBaseUrl}/${"modules"}/${codeProduit}/${codeAgence}`);
  }

 /* fiche(demande:Demande): Observable<any>{
    const httpOption = {
      responseType : 'arraybuffer' as 'json',
    }
    return this.http.post<any>(`${this.baseUrl}/${'fiche'}`, demande,httpOption)
  }*/
}

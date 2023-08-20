import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiConfig } from 'src/app/config';
import { ActivationRequest } from 'src/app/model/activationRequest';
import { Agence } from 'src/app/model/agence';
import { Institution } from 'src/app/model/institution';

@Injectable({
  providedIn: 'root'
})
export class InstitutionServiceService {
  constructor(private http: HttpClient) { }

  apiBaseUrl : string = apiConfig.host +'/institution';
  apiAgenceBaseUrl : string = apiConfig.host +'/agence';

  /*------------Institution-----------*/

  save(data: Institution):Observable<any>{
    return this.http.post<any>(`${this.apiBaseUrl}/${"creer"}`, data);
  }

  getOne(codeInst: string):Observable<any>{
    return this.http.get<any>(`${this.apiBaseUrl}/${"update/"+ codeInst}`);
  }

  getAll(): Observable<any>{
    return this.http.get<any>(`${this.apiBaseUrl}/`);
  }

  getAllInstitution(): Observable<any>{
    return this.http.get<any>(`${this.apiBaseUrl}/${'all'}`);
  }

  update(data:Institution): Observable<any>{
    return this.http.put<any>(`${this.apiBaseUrl}/${"update/"+ data.codeInst}`,data);
  }

  delete(codeInst: string): Observable<any>{
    return this.http.delete<any>(`${this.apiBaseUrl}/${"supprime/"+ codeInst}`);

  }

  /*-----------------Agence--------------------*/


  saveAgence(data: Agence):Observable<any>{
    return this.http.post<any>(`${this.apiAgenceBaseUrl}/${"creer"}`, data);
  }

  getOneAgence(codeAgence: string):Observable<any>{
    return this.http.get<any>(`${this.apiAgenceBaseUrl}/${"getOne/"+ codeAgence}`);
  }

  getAllAgence(): Observable<any>{
    return this.http.get<any>(`${this.apiAgenceBaseUrl}/`);
  }

  updateAgence(data:Agence): Observable<any>{
    return this.http.put<any>(`${this.apiAgenceBaseUrl}/${"update/"}${data.codeAgence}`,data);
  }

  deleteAgence(codeAgence: string): Observable<any>{
    return this.http.delete<any>(`${this.apiAgenceBaseUrl}/${"supprime/"}${codeAgence}`);

  }

  getAgenceByInstitution(codeInst:string): Observable<any>{
    return this.http.get<any>(`${this.apiAgenceBaseUrl}/${"agenceByInstitution/"+codeInst}`);
  }

  getModule(codeagence: string, codeproduit: string) : Observable<any>{
    return this.http.get<any>(`${this.apiAgenceBaseUrl}/${"modules"}/${codeagence}/${codeproduit}`);
  }

  activateModule(data: ActivationRequest): Observable<any>{
    return this.http.post<any>(`${this.apiAgenceBaseUrl}/${"activation"}`, data);
  }
}

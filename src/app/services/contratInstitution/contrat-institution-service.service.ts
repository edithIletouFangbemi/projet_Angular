import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiConfig } from 'src/app/config';
import { Contrat } from 'src/app/model/Contrat';
import { ContratUnit } from 'src/app/model/ContratUnit';
import { AgenceDetail } from 'src/app/model/agenceDetail';
import { ContratInstitution } from 'src/app/model/contratInstitution';
import { Institution } from 'src/app/model/institution';
import { Module } from 'src/app/model/module';
import { Produit } from 'src/app/model/produit';

@Injectable({
  providedIn: 'root'
})
export class ContratInstitutionServiceService {

  constructor(private http: HttpClient) { }

  apiBaseUrl : string = apiConfig.host +'/contrat';

  save(data: Contrat): Observable<any>{
    return this.http.post<any>(`${this.apiBaseUrl}/${"creer"}`, data)
  }
  getAll(): Observable<any>{
    return this.http.get<any>(`${this.apiBaseUrl}/`)
  }

  All(codeinst: string): Observable<any>{
    return this.http.get<any>(`${this.apiBaseUrl}/${'all'}/${codeinst}`)
  }

  getOne(code: string): Observable<any>{
    return this.http.get<any>(`${this.apiBaseUrl}/${"getOne"}/${code}`)
  }

  ActiverModule(data : string): Observable<any>{
    return this.http.post<any>(`${this.apiBaseUrl}/${"activerModule"}`, data)
  }

  getInstitution(): Observable<any>{
    return this.http.get<any>(`${this.apiBaseUrl}/${"liste"}`)
  }

 

  getByInstitution(data: Institution): Observable<any>{
    return this.http.post<any>(`${this.apiBaseUrl}/${"getByInstitution"}`, data)
  }

  institutions(): Observable<Institution[]>{
    return this.http.get<Institution[]>(`${this.apiBaseUrl}/${"institutions"}`)
  }

  getProduit(code: string): Observable<Produit[]>{
    return this.http.get<Produit[]>(`${this.apiBaseUrl}/${"produit"}/${code}`)
  }
  produits(codeinst: string): Observable<Produit[]>{
    return this.http.get<Produit[]>(`${this.apiBaseUrl}/${"produitPourContrat"}/${codeinst}`)
  }

  ajoutAvenant(data: ContratUnit): Observable<any>{
    return this.http.post<any>(`${this.apiBaseUrl}/${"ajoutAvenant"}`, data)
  }

  getModule(codeProduit: string): Observable<Module[]>{
    return this.http.get<Module[]>(`${this.apiBaseUrl}/${"listeModule"}/${codeProduit}`)
  }

  getDetail(codeinst: string, codeagence: string): Observable<AgenceDetail>{
    return this.http.get<AgenceDetail>(`${this.apiBaseUrl}/${"detailAgence"}/${codeinst}/${codeagence}`)
  }
}

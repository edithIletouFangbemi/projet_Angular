import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiConfig } from 'src/app/config';
import { Module } from 'src/app/model/module';
import { Produit } from 'src/app/model/produit';

@Injectable({
  providedIn: 'root'
})
export class ProduitServiceService {

  constructor(private http: HttpClient) { }

  apiBaseUrl : string = apiConfig.host +'/produits';
  apiModuleBaseUrl : string = apiConfig.host +'/module';

  save(data: Produit): Observable<any>{
    return this.http.post<any>(`${this.apiBaseUrl}/${"create"}`, data,{responseType: "text" as "json" });
  }

  getAll() : Observable<any>{
    return this.http.get<any>(`${this.apiBaseUrl}/${"all"}`);
  }

  getOne(code: string) :Observable<any>{
    return this.http.get<any>(`${this.apiBaseUrl}/${code}`);
  }

  update(code: string, data: Produit): Observable<any>{
    return this.http.put<any>(`${this.apiBaseUrl}/${"update/"+code}`, data);
  }

  delete(code: string) : Observable<any>{
    return this.http.delete<any>(`${this.apiBaseUrl}/${"supprimer/"+code}`);
  }

  addModule(data: Module): Observable<any>{
    return this.http.post<any>(`${this.apiModuleBaseUrl}/${'creer'}`, data);
  }

  updateModule(codeModule: string, data: Module): Observable<any>{
    return this.http.put<any>(`${this.apiModuleBaseUrl}/${"update/"+codeModule}`, data);
  }

  modulesByProduit(codeProduit: string): Observable<any>{
    return this.http.get<any>(`${this.apiModuleBaseUrl}/${"module_by_produit/"+codeProduit}`);
  }

  oneModule(codeModule: string): Observable<any>{
      return this.http.get<any>(`${this.apiModuleBaseUrl}/${codeModule}`);
  }

  deleteModule(codeModule: string): Observable<any>{
    return this.http.delete<any>(`${this.apiModuleBaseUrl}/${"supprimer/"+codeModule}`);
  }

  getAllBycounting(): Observable<any>{
    return this.http.get<any>(`${this.apiBaseUrl}/${"all_and_count"}`);
  }


}

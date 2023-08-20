import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiConfig } from 'src/app/config';
import { Parametre } from 'src/app/model/parametre';
import { ParametreRequest } from 'src/app/model/parametreRequest';


@Injectable({
  providedIn: 'root'
})
export class ParametreServiceService {

  constructor(private http: HttpClient) { }

  apiBaseUrl : string = apiConfig.host +'/parametre';

  save(data: ParametreRequest):Observable<any>{
    return this.http.post<any>(`${this.apiBaseUrl}/${'creer'}`, data)
  }

  getAll(): Observable<any>{
    return this.http.get<any>(`${this.apiBaseUrl}/${"all"}`)
  }

  getOne(codeParametre: string): Observable<Parametre>{
    return this.http.get<any>(`${this.apiBaseUrl}/${codeParametre}`)
  }

  update(code: string, data:ParametreRequest): Observable<any>{
    return this.http.put<any>(`${this.apiBaseUrl}/${"update"}/${code}`, data)
  }

  delete(code: string): Observable<any>{
    return this.http.delete<any>(`${this.apiBaseUrl}/${"supprime"}/${code}`)
  }


}

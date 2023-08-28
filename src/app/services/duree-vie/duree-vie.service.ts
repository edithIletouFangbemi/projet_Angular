import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiConfig } from 'src/app/config';
import { ParametreVie } from 'src/app/model/Parametre-vie';

@Injectable({
  providedIn: 'root'
})
export class DureeVieService {
  constructor(private http: HttpClient){}

  apiBaseUrl : string = apiConfig.host +'/parametre-vie';

  save(data: ParametreVie): Observable<any>{
    return this.http.post<any>(`${this.apiBaseUrl}/${"create"}`, data)
  }

  read(id: number): Observable<any>{
    return this.http.get<any>(`${this.apiBaseUrl}/${"read"}/${id}`);
  }

  all(): Observable<any>{
    return this.http.get<any>(`${this.apiBaseUrl}/${"all"}`);
  }

  update(data: ParametreVie): Observable<any>{
    return this.http.put<any>(`${this.apiBaseUrl}/${"update"}/${data.id}`, data);
  }
  deactivate(id: number): Observable<any>{
    return this.http.delete<any>(`${this.apiBaseUrl}/${"deactivate"}/${id}`);
  }
  activate(id: number): Observable<any>{
    return this.http.delete<any>(`${this.apiBaseUrl}/${"activate"}/${id}`);
  }
}

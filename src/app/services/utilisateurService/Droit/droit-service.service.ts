import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiConfig } from 'src/app/config';
import { Habilitation } from 'src/app/model/habilitation';

@Injectable({
  providedIn: 'root'
})
export class DroitServiceService {

  constructor(private http: HttpClient) { }
  apiUrl: string = apiConfig.host + '/habilitation';

  getAll(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/`);
  }

  update(data: Habilitation): Observable<any>{
    return this.http.put<any>(`${this.apiUrl}/${"update"}/${data.codeHabilitation}`, data);
  }

  deactivate(code: string): Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/${"delete"}/${code}`);
  }
  
  activate(code: string): Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/${"activer"}/${code}`);
  }


}

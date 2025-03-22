import { Aerolineas } from './../models/aerolinea.models';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AerolineasService {

  private apiUrl: string = environment.apiUrl + 'aerolineas/';
  constructor(private http: HttpClient) { }
  getAerolineas(): Observable<Aerolineas[]>{
    return this.http.get<Aerolineas[]>(this.apiUrl);
  }

  createAerolinea(aerolinea: Aerolineas): Observable<Aerolineas>{
    return this.http.post<Aerolineas>(`${this.apiUrl}`, aerolinea);
  }

  updateAerolinea(aerolinea:Aerolineas): Observable<Aerolineas>{
    return this.http.put<Aerolineas>(`${this.apiUrl}${aerolinea.id}`,aerolinea);
  }

  delteAerolinea(idAerolinea:number):Observable<Aerolineas>{
    return this.http.delete<Aerolineas>(`${this.apiUrl}${idAerolinea}`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { Observable } from 'rxjs';
import { Aeropuerto } from '../models/aeropuerto.models';

@Injectable({
  providedIn: 'root'
})
export class AeropuertosService {
  private apiUrl: string = environment.apiUrl + 'aeropuerto/'
  constructor(private http: HttpClient) { }

  getAeropuerto():Observable<Aeropuerto[]>{
    return this.http.get<Aeropuerto[]>(this.apiUrl);
  }

   createAeropuerto(aeropuerto: Aeropuerto): Observable<Aeropuerto>{
      return this.http.post<Aeropuerto>(`${this.apiUrl}avion-dto`, aeropuerto);
    }

    updateAeropuerto(aeropuerto:Aeropuerto): Observable<Aeropuerto>{
      return this.http.put<Aeropuerto>(`${this.apiUrl}${aeropuerto.id}`,aeropuerto);
    }

    delteAeropuerto(idAeropuerto:number):Observable<Aeropuerto>{
      return this.http.delete<Aeropuerto>(`${this.apiUrl}${idAeropuerto}`);
    }

}

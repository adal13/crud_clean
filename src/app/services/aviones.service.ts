import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { HttpClient } from '@angular/common/http';;
import { Observable } from 'rxjs';
import { Aeropuerto } from '../models/aeropuerto.models';
import { Avion } from '../models/avion.models';
import { AvionDTO } from '../models/avionDTO.models';

@Injectable({
  providedIn: 'root'
})
export class AvionesService {
  private apiUrl: string = environment.apiUrl + 'aviones/';
  constructor(private http: HttpClient) { }

  getAvion():Observable<Avion[]>{
    return this.http.get<Avion[]>(this.apiUrl);
  }

  createAvion(avionDTO: AvionDTO): Observable<Avion>{
    return this.http.post<Avion>(`${this.apiUrl}avion-dto`, avionDTO);
  }

  updateAvion(avion:Avion): Observable<Avion>{
    return this.http.put<Avion>(`${this.apiUrl}${avion.id}`,avion);
  }

  delteAvion(idAvion:number):Observable<Avion>{
    return this.http.delete<Avion>(`${this.apiUrl}${idAvion}`);
  }


}

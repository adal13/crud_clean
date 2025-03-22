import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vuelo } from '../models/vuelo.models';
import { VueloDTO } from '../models/vueloDTO.models';

@Injectable({
  providedIn: 'root'
})
export class VuelosService {
  private apiUrl: string = environment.apiUrl + 'vuelo/';

  constructor(private http: HttpClient) { }

  getVuelo():Observable<Vuelo[]>{
    return this.http.get<Vuelo[]>(this.apiUrl);
  }

    createVuelo(vueloDTO: VueloDTO): Observable<VueloDTO>{
      return this.http.post<VueloDTO>(`${this.apiUrl}vuelo-dto`, vueloDTO);
    }

    updateVuelo(vueloDTO:VueloDTO): Observable<VueloDTO>{
      return this.http.put<VueloDTO>(`${this.apiUrl}${vueloDTO.id}`,vueloDTO);
    }

    deleteVuelo(idVuelo:number):Observable<Vuelo>{
      return this.http.delete<Vuelo>(`${this.apiUrl}${idVuelo}`);
    }

}

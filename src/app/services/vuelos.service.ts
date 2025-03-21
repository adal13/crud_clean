import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vuelo } from '../models/vuelo.models';

@Injectable({
  providedIn: 'root'
})
export class VuelosService {
  private apiUrl: string = environment.apiUrl + 'vuelo/';

  constructor(private http: HttpClient) { }

  getVuelo():Observable<Vuelo[]>{
    return this.http.get<Vuelo[]>(this.apiUrl);
  }

    createVuelo(vuelo: Vuelo): Observable<Vuelo>{
      return this.http.post<Vuelo>(`${this.apiUrl}avion-dto`, vuelo);
    }

    updateVuelo(vuelo:Vuelo): Observable<Vuelo>{
      return this.http.put<Vuelo>(`${this.apiUrl}${vuelo.id}`,vuelo);
    }

    deleteVuelo(idVuelo:number):Observable<Vuelo>{
      return this.http.delete<Vuelo>(`${this.apiUrl}${idVuelo}`);
    }

}

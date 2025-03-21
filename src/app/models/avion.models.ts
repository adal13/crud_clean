import { Aerolineas } from "./aerolinea.models";

export interface Avion{
  id: number|null;
  numeroRegistro:number;
  tipo:string;
  codigoModelo:string;
  capacidad:number;
  fechaPrimerVuelo:string;
  idEstatus:number;
  aerolinea:Aerolineas;
}

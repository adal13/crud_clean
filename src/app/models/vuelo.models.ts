import { Aeropuerto } from "./aeropuerto.models";
import { Avion } from "./avion.models";

export interface Vuelo{
  id:number|null;
  codigoVuelo:string;
  avion:Avion;
  origen:Aeropuerto;
  destino:Aeropuerto;
  fechaSalida:string;
  idEstatus:number;
}

export interface AvionDTO{
  id: number|null;
  numeroRegistro:number;
  tipo:string;
  codigoModelo:string;
  capacidad:number;
  fechaPrimerVuelo:string;
  idEstatus:number;
  idAerolinea:number | null
}

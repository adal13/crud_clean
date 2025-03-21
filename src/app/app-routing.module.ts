import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AerolineasComponent } from './components/aerolineas/aerolineas.component';
import { AeropuertoComponent } from './components/aeropuerto/aeropuerto.component';
import { AvionComponent } from './components/avion/avion.component';
import { VuelosComponent } from './components/vuelos/vuelos.component';

const routes: Routes = [
  {path: 'aerolineas', component: AerolineasComponent},
  {path: 'aeropuertos', component: AeropuertoComponent},
  {path: 'aviones', component: AvionComponent},
  {path: 'vuelos', component: VuelosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

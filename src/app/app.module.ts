import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AerolineasComponent } from './components/aerolineas/aerolineas.component';
import { AvionComponent } from './components/avion/avion.component';
import { VuelosComponent } from './components/vuelos/vuelos.component';
import { AeropuertoComponent } from './components/aeropuerto/aeropuerto.component';
import { NavbarComponent } from './components/common/navbar/navbar.component';
import { provideHttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AerolineasComponent,
    AvionComponent,
    VuelosComponent,
    AeropuertoComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }

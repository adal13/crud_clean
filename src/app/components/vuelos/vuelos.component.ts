import { Component } from '@angular/core';
import { VuelosService } from '../../services/vuelos.service';
import { Vuelo } from '../../models/vuelo.models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vuelos',
  standalone: false,
  templateUrl: './vuelos.component.html',
  styleUrl: './vuelos.component.css',
})
export class VuelosComponent {
  vuelos: Vuelo[] = [];
  vueloForm: FormGroup;
  showForm: boolean = false;
  textoModal: string = 'Nuevo Vuelo';
  isEditMode: boolean = false;
  selectedVuelo: Vuelo | null = null;

  constructor(
    private vueloService: VuelosService,
    private formBuilder: FormBuilder
  ) {
    this.vueloForm = formBuilder.group({
      id: [null],
      codigoVuelo: ['', [Validators.required]],
      idAvion: ['', [Validators.required, Validators.maxLength(50)]],
      idOrigen: ['', [Validators.required, Validators.maxLength(50)]],
      idDestino: ['', [Validators.required]],
      fechaSalida: ['', [Validators.required]],
      idEstatus: [1, [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.loadVuelo();
  }

  loadVuelo(): void {
    this.vueloService.getVuelo().subscribe({
      next: (vuelo) => {
        console.log('Esto es vuelo', vuelo);
        this.vuelos = vuelo;
      },
    });
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    this.textoModal = 'Nuevo Avion';
    this.isEditMode = false;
    this.selectedVuelo = null;
    this.vueloForm.reset();
  }
  onSubmit(): void {
    if (this.vueloForm.invalid) {
      return;
    }

    //const avionData: Avion = this.avionForm.value;

    const vueloData: Vuelo = {
      ...this.vueloForm.value,
      aerolinea: this.vueloForm.value.aerolinea, // Asegurar que solo envíe el ID
    };

    if (this.isEditMode) {
      this.vueloService.updateVuelo(vueloData).subscribe({
        next: (updateVuelo) => {
          const index = this.vuelos.findIndex((a) => a.id === vueloData.id);
          if (index !== -1) {
            this.vuelos[index] = updateVuelo;
          }
          Swal.fire({
            title: 'Avion ' + updateVuelo.codigoVuelo + ' Actualizada',
            text: 'El avion fue actualizada exitosamente',
            icon: 'success',
          });
        },
        error: (error) => {
          this.mostrarErrores(error);
        },
      });
    } else {
      this.vueloService.createVuelo(vueloData).subscribe({
        next: (newAvion) => {
          Swal.fire({
            title: 'Avion ' + newAvion.codigoVuelo + ' creada',
            text: 'El Avion fue creada exitosamente',
            icon: 'success',
          });
          this.vuelos.push(newAvion);
        },
        error: (error) => {
          this.mostrarErrores(error);
        },
      });
    }
    this.showForm = false;
    this.vueloForm.reset();
  }

  mostrarErrores(errorResponse: any): void {
    if (errorResponse && errorResponse.error) {
      let errores = errorResponse.error;
      let mensajeErrores = '';
      for (let campo in errores) {
        if (errores.hasOwnProperty(campo)) {
          mensajeErrores += errores[campo];
        }
      }
      Swal.fire({
        title: 'Errores encontrados',
        text: mensajeErrores.trim(),
        icon: 'error',
      });
    }
  }

  editarVuelo(vuelo: Vuelo) {
    this.selectedVuelo = vuelo;
    this.textoModal = 'Editando Avion ' + vuelo.codigoVuelo;
    this.isEditMode = true;
    this.showForm = true;

    this.vueloForm.patchValue({
      id: vuelo.id,
      codigoVuelo: vuelo.codigoVuelo,
      idAvion: vuelo.avion,
      idOrigen: vuelo.origen,
      idDestino: vuelo.destino,
      fechaSalida: vuelo.fechaSalida,
      idEstatus: vuelo.idEstatus,
    });
  }

  eliminarVuelo(codigo_vuelo: number) {
    Swal.fire({
      title: 'Eliminar Avion',
      text: '¿Estas seguro que deseas elminar Avion?',
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
    }).then((resp) => {
      if (resp.isConfirmed) {
        this.vueloService.deleteVuelo(codigo_vuelo).subscribe({
          next: (deleteAeropuerto) => {
            this.vuelos = this.vuelos.filter((a) => a.id !== codigo_vuelo);
            Swal.fire({
              title: 'Avion Eliminada',
              text: 'El Avion fue eliminada exitosamente',
              icon: 'success',
            });
          },
          error: (error) => {
            this.mostrarErrores(error);
          },
        });
      }
    });
  }
}

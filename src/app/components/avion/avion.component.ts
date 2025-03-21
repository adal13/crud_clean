import { Aerolineas } from './../../models/aerolinea.models';
import { Component } from '@angular/core';
import { Avion } from '../../models/avion.models';
import { AvionesService } from '../../services/aviones.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-avion',
  standalone: false,
  templateUrl: './avion.component.html',
  styleUrl: './avion.component.css'
})
export class AvionComponent {
  avion:Avion[] = [];
  avionForm:FormGroup;
  showForm:boolean = false;
  textoModal:string="Nuevo Avion";
  isEditMode:boolean=false;
  selectedAvion:Avion | null = null;

  constructor(private avionService: AvionesService,
    private formBuilder:FormBuilder
  ){
    this.avionForm = formBuilder.group({
      id: [null],
      numeroRegistro:['',[Validators.required]],
      tipo:['',[Validators.required, Validators.maxLength(50)]],
      codigoModelo:['',[Validators.required, Validators.maxLength(50)]],
      capacidad:['',[Validators.required]],
      fechaPrimerVuelo:['',[Validators.required]],
      idEstatus:[1,[Validators.required]],
      //aerolinea:Aerolineas,
      aerolinea:['',[Validators.required]],

    })
  };
  ngOnInit():void{
    this.loadAvion();

  }

  loadAvion():void{
    this.avionService.getAvion().subscribe({
      next: avion=>{
        console.log(avion)
        this.avion = avion;
      }
    })
  }

  toggleForm():void{
    this.showForm = !this.showForm;
    this.textoModal = "Nuevo Avion";
    this.isEditMode = false;
    this.selectedAvion = null;
    this.avionForm.reset();
  }

  onSubmit():void{
        if(this.avionForm.invalid){
          return;
        }

        //const avionData: Avion = this.avionForm.value;


        const avionData: Avion = {
          ...this.avionForm.value,
          aerolinea: this.avionForm.value.aerolinea // Asegurar que solo envíe el ID
        };

        if (this.isEditMode) {
          this.avionService.updateAvion(avionData).subscribe({
            next: (updateAvion) => {
              const index = this.avion.findIndex((a) => a.id === avionData.id);
              if (index !== -1) {
                this.avion[index] = updateAvion;
              }
              Swal.fire({
                title: 'Avion ' + updateAvion.numeroRegistro + ' Actualizada',
                text: 'El avion fue actualizada exitosamente',
                icon: 'success',
              });
            },
            error: (error) => {
              this.mostrarErrores(error);
            },
          });
        } else {
          this.avionService.createAvion(avionData).subscribe({
            next: (newAvion) => {
              Swal.fire({
                title: 'Avion ' + newAvion.numeroRegistro + ' creada',
                text: 'El Avion fue creada exitosamente',
                icon: 'success',
              });
              this.avion.push(newAvion);
            },
            error: (error) => {
              this.mostrarErrores(error);
            },
          });
        }
        this.showForm=false;
        this.avionForm.reset();
    }

    mostrarErrores(errorResponse: any):void{
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


  editarAvion(avion: Avion) {
    this.selectedAvion = avion;
    this.textoModal = "Editando Avion " + avion.numeroRegistro;
    this.isEditMode = true;
    this.showForm = true;

    this.avionForm.patchValue({
      id: avion.id,
      numeroRegistro:avion.numeroRegistro,
      tipo:avion.tipo,
      codigoModelo:avion.codigoModelo,
      capacidad:avion.capacidad,
      fechaPrimerVuelo:avion.fechaPrimerVuelo,
      idEstatus:avion.idEstatus,
      //aerolinea:Aerolineas,
      //aerolinea:{id: avion.aerolinea.id},
      aerolinea: avion.aerolinea ? avion.aerolinea.id : null,
    })
  }

  eliminarAvion(id_avion: number) {

    Swal.fire({
      title: 'Eliminar Avion',
      text: '¿Estas seguro que deseas elminar Avion?',
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
    }).then((resp) => {
      if (resp.isConfirmed) {
        this.avionService.delteAvion(id_avion).subscribe({
          next: (deleteAeropuerto) => {
            this.avion = this.avion.filter((a) => a.id !== id_avion);
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

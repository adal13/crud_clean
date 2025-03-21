import { AeropuertosService } from './../../services/aeropuertos.service';
import { Component } from '@angular/core';
import { Aeropuerto } from '../../models/aeropuerto.models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-aeropuerto',
  standalone: false,
  templateUrl: './aeropuerto.component.html',
  styleUrl: './aeropuerto.component.css'
})
export class AeropuertoComponent {
  aeropuertos: Aeropuerto[] = [];
  aeropuertoForm:FormGroup;
  showForm:boolean = false;
  textoModal:string="Nueva Aerolinea";
  isEditMode:boolean=false;
  selectedAeropuerto:Aeropuerto | null = null;

  constructor(private aeropuertosService: AeropuertosService,
    private formBuilder:FormBuilder
  ){

    this.aeropuertoForm = formBuilder.group({
      id:[null],
      nombre:['',[Validators.required, Validators.maxLength(50)]],
      codigo:['',[Validators.required, Validators.maxLength(50)]],
      latitud:['',[Validators.required, Validators.maxLength(50)]],
      longitud:['',[Validators.required, Validators.maxLength(50)]],
      pais:['',[Validators.required, Validators.maxLength(50)]],
      estatus:[1,[Validators.required]],
    })
  }
  ngOnInit():void{
    this.loadAeropuerto();
  }

  loadAeropuerto():void{
    this.aeropuertosService.getAeropuerto().subscribe({
      next: aeropuerto=>{
        console.log(aeropuerto)
        this.aeropuertos = aeropuerto;
      }
    })
  }

  toggleForm():void{
    this.showForm = !this.showForm;
    this.textoModal = "Nuevo Aeropuerto";
    this.isEditMode = false;
    this.selectedAeropuerto = null;
    this.aeropuertoForm.reset();
  }

  onSubmit():void{
        if(this.aeropuertoForm.invalid){
          return;
        }
        const aeropuertoData: Aeropuerto = this.aeropuertoForm.value;
        if(this.isEditMode){
          this.aeropuertosService.updateAeropuerto(aeropuertoData).subscribe({
            next:(updateAeropuerto) =>{
              const index = this.aeropuertos.findIndex(a => a.id === aeropuertoData.id);
              if(index !== -1){
                this.aeropuertos[index] = updateAeropuerto;
              }
              Swal.fire({
                title: "Aerolinea" + updateAeropuerto.nombre + " Actualizada",
                text: "La aerolinea fue actualizada exitosamente",
                icon: "success"
              });
            },
            error:(error)=>{
              this.mostrarErrores(error);
            }
          })
        }else{
          this.aeropuertosService.createAeropuerto(aeropuertoData).subscribe({
            next:(newAerolinea)=>{
              Swal.fire({
                title: "Aerolinea" + newAerolinea.nombre + " creada",
                text: "La aerolinea fue creada exitosamente",
                icon: "success"
              });
              this.aeropuertos.push(newAerolinea);
            },
            error:(error) =>{
              this.mostrarErrores(error);
            }
          })
        }
        this.showForm=false;
        this.aeropuertoForm.reset();
    }


      mostrarErrores(errorResponse: any):void{
        if(errorResponse && errorResponse.error){
          let errores = errorResponse.error;
          let mensajeErrores = "";
          for(let campo in errores){
            if(errores.hasOwnProperty(campo)){
              mensajeErrores += errores[campo];
            }
          }
          Swal.fire({
            title: "Errores encontrados",
            text: mensajeErrores.trim(),
            icon: "error"
          });
        }

      }



  editarAeropuerto(aeropuerto: Aeropuerto) {
    // Lógica para editar el aeropuerto
    console.log('Editar aeropuerto:', aeropuerto);
    // Aquí podrías abrir un formulario o realizar la lógica necesaria para editar el aeropuerto.
    this.selectedAeropuerto = aeropuerto;
    this.textoModal = "Editando Aeropuerto " + aeropuerto.nombre;
    this.isEditMode = true;
    this.showForm = true;

    this.aeropuertoForm.patchValue({
      id:aeropuerto.id,
      nombre:aeropuerto.nombre,
      codigo:aeropuerto.codigo,
      latitud:aeropuerto.latitud,
      longitud:aeropuerto.longitud,
      pais:aeropuerto.pais,
      estatus:aeropuerto.id_estatus,
    })


  }

  eliminarAeropuerto(idAeropuerto: number) {
    // Lógica para eliminar el aeropuerto
    // this.aeropuertos = this.aeropuertos.filter(aeropuerto => aeropuerto.codigo !== codigo);
    // console.log('Aeropuerto eliminado:', codigo);

    Swal.fire({
          title: "Eliminar Aeropuerto",
          text: "¿Estas seguro que deseas elminar aeropuerto?",
          icon: "question",
          showConfirmButton:true,
          showCancelButton:true
        }).then(resp=>{
          if(resp.isConfirmed){
            this.aeropuertosService.delteAeropuerto(idAeropuerto).subscribe({
              next:(deleteAeropuerto) =>{
                this.aeropuertos = this.aeropuertos.filter(a => a.id !== idAeropuerto);
                Swal.fire({
                  title: "Aerolinea Eliminada",
                  text: "El aeropuerto fue eliminada exitosamente",
                  icon: "success"
                });
              },
              error:(error)=>{
                this.mostrarErrores(error);
              }
            });
          }
        })
  }
}

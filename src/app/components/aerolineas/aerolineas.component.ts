import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Aerolineas } from '../../models/aerolinea.models';
import { AerolineasService } from './../../services/aerolineas.service';
import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-aerolineas',
  standalone: false,
  templateUrl: './aerolineas.component.html',
  styleUrl: './aerolineas.component.css'
})
export class AerolineasComponent {

  aerolineas: Aerolineas[] = []
  aerolineaForm:FormGroup;
  showForm:boolean = false;
  textoModal:string="Nueva Aerolinea";
  isEditMode:boolean=false;
  selectedAerolinea:Aerolineas | null = null;

  constructor(private aerolineaService: AerolineasService,
    private formBuilder: FormBuilder
  ){
    this.aerolineaForm = formBuilder.group({
      id:[null],
      nombre:['',[Validators.required, Validators.maxLength(50)]],
      iata:['',[Validators.required, Validators.maxLength(50)]],
      estatus: [1,[Validators.required]],
      pais:['',[Validators.required, Validators.maxLength(50)]],
      fechaFundacion:['',[Validators.required]],
    })
  }

  ngOnInit(): void{
    this.loadAerolinea();
  }

  loadAerolinea():void{
    this.aerolineaService.getAerolineas().subscribe({
      next: data =>{
        console.log(data)
        this.aerolineas = data;
      }
    })
  }

  toggleForm():void{
    this.showForm = !this.showForm;
    this.textoModal = "Nueva Aerolinea";
    this.isEditMode = false;
    this.selectedAerolinea = null;
    this.aerolineaForm.reset();
  }

  onSubmit():void{
      if(this.aerolineaForm.invalid){
        return;
      }
      const aerolineaData: Aerolineas = this.aerolineaForm.value;
      if(this.isEditMode){
        this.aerolineaService.updateAerolinea(aerolineaData).subscribe({
          next:(updateAerolinea) =>{
            const index = this.aerolineas.findIndex(a => a.id === aerolineaData.id);
            if(index !== -1){
              this.aerolineas[index] = updateAerolinea;
            }
            Swal.fire({
              title: "Aerolinea " + updateAerolinea.nombre + " Actualizada",
              text: "La aerolinea fue actualizada exitosamente",
              icon: "success"
            });
          },
          error:(error)=>{
            this.mostrarErrores(error);
          }
        })
      }else{
        this.aerolineaService.createAerolinea(aerolineaData).subscribe({
          next:(newAerolinea)=>{
            Swal.fire({
              title: "Aerolinea " + newAerolinea.nombre + " creada",
              text: "La aerolinea fue creada exitosamente",
              icon: "success"
            });
            this.aerolineas.push(newAerolinea);
          },
          error:(error) =>{
            this.mostrarErrores(error);
          }
        })
      }
      this.showForm=false;
      this.aerolineaForm.reset();
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



  editarAerolinea(aerolinea: Aerolineas) {
    // Lógica para editar la aerolínea
    console.log('Editar aerolínea: ', aerolinea);
    // Aquí podrías abrir un formulario o realizar la lógica necesaria para editar la aerolínea.
    this.selectedAerolinea = aerolinea;
    this.textoModal = "Editando Aerolinea " + aerolinea.nombre;
    this.isEditMode = true;
    this.showForm = true;

    this.aerolineaForm.patchValue({
      id:aerolinea.id,
      nombre:aerolinea.nombre,
      iata:aerolinea.iata,
      estatus:aerolinea.estatus,
      pais:aerolinea.pais,
      fechaFundacion:aerolinea.fechaFundacion,
    })

  }

  eliminarAerolinea(idAerolinea: number) {
    // this.aerolineas = this.aerolineas.filter(aerolinea => aerolinea.id !== idAerolinea);
    // console.log('Aerolínea eliminada:', idAerolinea);

    Swal.fire({
      title: "Eliminar Aerolinea",
      text: "¿Estas seguro que deseas elminar la aerolinea?",
      icon: "question",
      showConfirmButton:true,
      showCancelButton:true
    }).then(resp=>{
      if(resp.isConfirmed){
        this.aerolineaService.delteAerolinea(idAerolinea).subscribe({
          next:(deleteAerolinea) =>{
            this.aerolineas = this.aerolineas.filter(a => a.id !== idAerolinea);
            Swal.fire({
              title: "Aerolinea Eliminada",
              text: "La aerolinea fue eliminada exitosamente",
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

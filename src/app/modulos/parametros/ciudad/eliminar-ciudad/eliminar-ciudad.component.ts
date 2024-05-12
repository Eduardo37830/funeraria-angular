import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CiudadService } from '../../../../servicios/parametros/ciudad.service';
import { CiudadModel } from '../../../../modelos/ciudad.model';

@Component({
  selector: 'app-eliminar-ciudad',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './eliminar-ciudad.component.html',
  styleUrl: './eliminar-ciudad.component.css'
})
export class EliminarCiudadComponent {
  recordId: number = 0;
  nombre: string = '';
  departamentoId: number = 0;

  constructor(
    private servicio: CiudadService,
    private router: Router,
    private route: ActivatedRoute
  ){
    this.route.params.subscribe(params => {
      this.departamentoId = +params['ids']; 
      this.recordId = +params['id'];
    });
  }

  ngOnInit(): void {
    this.BuscarRegistro();
  }

  BuscarRegistro() {
    this.servicio.BuscarRegistro(this.recordId).subscribe({
      next: (data: CiudadModel) => {
        this.recordId = data.id!;
        this.nombre = data.nombre!;
      },
      error: (error: any) => {
        alert('Registro no encontrado');
      }
    });  
  }

  EliminarRegistro() {
    this.servicio.EliminarRegistro(this.recordId).subscribe({
      next: (data: CiudadModel) => {
        alert('Registro eliminado correctamente');
        this.router.navigate(['/parametros/departamentos', this.departamentoId, 'ciudads']);
      },
      error: (error: any) => {
        alert('Error al eliminar el registro');
      }
    });
  }
}


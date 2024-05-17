import { Component } from '@angular/core';
import { SedeService } from '../../../../servicios/parametros/sede.service';
import { SedeModel } from '../../../../modelos/sede.model';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-eliminar-sede',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './eliminar-sede.component.html',
  styleUrl: './eliminar-sede.component.css'
})
export class EliminarSedeComponent {
  recordId: number = 0;
  nombre: string = '';
  direccion: string = '';
  ciudadId: number = 0;

  constructor(
    private servicio: SedeService,
    private router: Router,
    private route: ActivatedRoute
  ){
    this.route.params.subscribe(params => {
      this.ciudadId = +params['ids']; 
      this.recordId = +params['id'];
    });
  }

  ngOnInit(): void {
    this.BuscarRegistro();
  }

  BuscarRegistro() {
    this.servicio.BuscarRegistro(this.recordId).subscribe({
      next: (data: SedeModel) => {
        this.recordId = data.id!;
        this.nombre = data.nombre!;
        this.direccion = data.direccion!;
      },
      error: (error: any) => {
        alert('Registro no encontrado');
      }
    });  
  }

  EliminarRegistro() {
    this.servicio.EliminarRegistro(this.recordId).subscribe({
      next: (data: SedeModel) => {
        alert('Registro eliminado correctamente');
        this.router.navigate(['/parametros/ciudads', this.ciudadId, 'sede-listar']);
      },
      error: (error: any) => {
        alert('Error al eliminar el registro');
      }
    });
  }
}


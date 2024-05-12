import { Component } from '@angular/core';
import { DepartamentoModel } from '../../../../modelos/departamento.model';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { DepartamentoService } from '../../../../servicios/parametros/departamento.service';

@Component({
  selector: 'app-eliminar-departamento',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './eliminar-departamento.component.html',
  styleUrl: './eliminar-departamento.component.css'
})
export class EliminarDepartamentoComponent {
  recordId: number = 0;
  nombre: string = '';
  detalles: string = '';
  mensualidad: number = 0;
  cantidadBeneficiarios: number = 0;

  constructor(
    private servicio: DepartamentoService,
    private router: Router,
    private route: ActivatedRoute
  ){
    this.recordId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.BuscarRegistro();
  }

  BuscarRegistro() {
    this.servicio.BuscarRegistro(this.recordId).subscribe({
      next: (data: DepartamentoModel) => {
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
      next: (data: DepartamentoModel) => {
        alert('Registro eliminado correctamente');
        this.router.navigate(['/parametros/plan-listar']);
      },
      error: (error: any) => {
        alert('Error al eliminar el registro');
      }
    });
  }
}

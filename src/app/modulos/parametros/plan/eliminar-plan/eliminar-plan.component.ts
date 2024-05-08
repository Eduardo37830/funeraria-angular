import { Component } from '@angular/core';
import { PlanModel } from '../../../../modelos/plan.model';
import { PlanService } from '../../../../servicios/parametros/plan.service';
import { ConfiguracionRutasBackend } from '../../../../config/configuracion.rutas.backend';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-eliminar-plan',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './eliminar-plan.component.html',
  styleUrl: './eliminar-plan.component.css'
})
export class EliminarPlanComponent {
  recordId: number = 0;
  nombre: string = '';
  detalles: string = '';
  mensualidad: number = 0;
  cantidadBeneficiarios: number = 0;

  constructor(
    private servicio: PlanService,
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
      next: (data: PlanModel) => {
        this.recordId = data.id!;
        this.nombre = data.nombre!;
        this.detalles = data.detalles!;
        this.mensualidad = data.mensualidad!;
        this.cantidadBeneficiarios = data.cantidadBeneficiarios!;
        alert('Registro encontrado');
      },
      error: (error: any) => {
        alert('Registro no encontrado');
      }
    });  
  }

  EliminarRegistro() {
    this.servicio.EliminarRegistro(this.recordId).subscribe({
      next: (data: PlanModel) => {
        alert('Registro eliminado correctamente');
        this.router.navigate(['/parametros/plan-listar']);
      },
      error: (error: any) => {
        alert('Error al eliminar el registro');
      }
    });
  }
}

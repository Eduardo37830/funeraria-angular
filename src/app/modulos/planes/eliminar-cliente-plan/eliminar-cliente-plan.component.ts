import { Component } from '@angular/core';
import { ClientePlanService } from '../../../servicios/parametros/cliente-plan.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ClientePlanModel } from '../../../modelos/clientePlan.model';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-eliminar-cliente-plan',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './eliminar-cliente-plan.component.html',
  styleUrl: './eliminar-cliente-plan.component.css'
})
export class EliminarClientePlanComponent {
  recordId: number = 0;
  clienteId: number = 0;
  nombre: string = '';
  detalles: string = '';
  tarifa: number = 0;
  fechaAdquisicion: Date = new Date();
  fechaVencimiento: Date = new Date();
  cantidadBeneficiarios: number = 0;
  activo: boolean = false;

  constructor(
    private servicio: ClientePlanService,
    private router: Router,
    private route: ActivatedRoute
  ){
    this.route.params.subscribe(params => {
      this.clienteId = +params['ids']; 
      this.recordId = +params['id'];
    });
  }

  ngOnInit(): void {
    this.BuscarRegistro();
    console.log(this.BuscarRegistro());
  }

  BuscarRegistro() {
    this.servicio.BuscarRegistro(this.recordId).subscribe({
      next: (data: ClientePlanModel) => {
        this.nombre = data.nombre!;
        this.detalles = data.detalles!;
        this.tarifa = data.tarifa!;
        this.fechaAdquisicion = data.fechaAdquisicion!;
        this.fechaVencimiento = data.fechaVencimiento!;
        this.cantidadBeneficiarios = data.cantidadBeneficiarios!;
        this.activo = data.activo!;
        console.log(data);
      },
      error: (error: any) => {
        alert('Registro no encontrado');
      }
    });  
  }

  EliminarRegistro() {
    this.servicio.EliminarRegistro(this.recordId).subscribe({
      next: (data: ClientePlanModel) => {
        alert('Registro eliminado correctamente');
        this.router.navigate(['/parametros/plan-listar']);
      },
      error: (error: any) => {
        alert('Error al eliminar el registro');
      }
    });
  }
}

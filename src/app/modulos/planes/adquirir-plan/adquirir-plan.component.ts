import { Component } from '@angular/core';
import { PlanModel } from '../../../modelos/plan.model';
import { PlanService } from '../../../servicios/parametros/plan.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-adquirir-plan',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './adquirir-plan.component.html',
  styleUrl: './adquirir-plan.component.css'
})
export class AdquirirPlanComponent {
  planes: PlanModel[] = [];
  clienteId: number | null = null;
  // Otras propiedades necesarias para el formulario

  constructor(
    private planService: PlanService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.obtenerPlanes();
    this.clienteId = Number(this.route.snapshot.paramMap.get('id'));
    // Otras inicializaciones necesarias
  }

  obtenerPlanes(): void {
    this.planService.listarRegistros().
    subscribe(
      (planes) => {
        this.planes = planes;
      },
      (error) => {
        console.error('Error al obtener los planes:', error);
      }
    );
  }
}

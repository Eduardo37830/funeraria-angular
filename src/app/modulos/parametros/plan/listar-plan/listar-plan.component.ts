import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ConfiguracionPaginacion } from '../../../../config/configuracion.paginacion';
import { ConfiguracionRutasBackend } from '../../../../config/configuracion.rutas.backend';
import { PlanModel } from '../../../../modelos/plan.model';
import { PlanService } from '../../../../servicios/parametros/plan.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { SeguridadService } from '../../../../servicios/seguridad.service';
import { UsuarioValidadoModel } from '../../../../modelos/usuario.validado.model';

@Component({
  selector: 'app-listar-plan',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    NgxPaginationModule
  ],
  templateUrl: './listar-plan.component.html',
  styleUrl: './listar-plan.component.css'
})
export class ListarPlanComponent {
  listaRegistros: PlanModel[] = [];
  pag = 1;
  total = 0;
  registrosPorPagina = ConfiguracionPaginacion.registroPorPagina;      
  BASE_URL: string = ConfiguracionRutasBackend.urlNegocio;    
  
  SesionActiva: boolean = false;

  constructor(
    private servicioPlanes: PlanService,
    private servicioSeguridad: SeguridadService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.ListarRegistros();
    this.ValidarSesion();
  }

  /**
   * Listar registros
   */
  ListarRegistros() {
    this.servicioPlanes.listarRegistrosPaginados(this.pag).subscribe({
      next: (datos) => {
          this.listaRegistros = datos.registros;
          this.total = datos.totalRegistros;
      },
      error: (error) => {
        alert('Error leyendo la información de la base de datos');
      }
    });
  }

  ValidarSesion() {
    this.servicioSeguridad.ObtenerDatosSesion().subscribe({
      next: (data: UsuarioValidadoModel | null) => {
        if (data && data.token) {
          this.SesionActiva = true;
          // Verificar si el usuario es un administrador
          if (data.user && data.user.rolId === '6619aa9177e8f21a1c6f600c') {
            // Redirigir al administrador a la página deseada
            this.router.navigate(['/parametros/admin-inicio']);
          }
        } else {
          this.SesionActiva = false;
        }
        console.log(this.SesionActiva);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }
}

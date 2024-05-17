import { Component } from '@angular/core';
import { ConductorModel } from '../../../../modelos/conductor.model';
import { ConfiguracionPaginacion } from '../../../../config/configuracion.paginacion';
import { ConfiguracionRutasBackend } from '../../../../config/configuracion.rutas.backend';
import { ConductorService } from '../../../../servicios/parametros/conductor.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SedeModel } from '../../../../modelos/sede.model';

@Component({
  selector: 'app-listar-conductor',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    NgxPaginationModule,
    FormsModule
  ],
  templateUrl: './listar-conductor.component.html',
  styleUrl: './listar-conductor.component.css'
})
export class ListarConductorComponent {
  sedeId: number | null = null;
  listaRegistros: ConductorModel[] = [];
  pag = 1;
  total = 0;
  registrosPorPagina = ConfiguracionPaginacion.registroPorPagina;      
  BASE_URL: string = ConfiguracionRutasBackend.urlNegocio;

  constructor(
    private servicioSedes: ConductorService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.ListarRegistros();
    this.sedeId = Number(this.route.snapshot.paramMap.get('id'));
    this.obtenerSedesPorCiudad();
  }

  /**
   * Listar registros
   */
  ListarRegistros() {
    this.servicioSedes.listarRegistrosPaginados(this.pag).subscribe({
      next: (datos) => {
          this.listaRegistros = datos.registros;
          this.total = datos.totalRegistros;
      },
      error: (error) => {
        alert('Error leyendo la información de la base de datos');
      }
    });
  }

  obtenerSedesPorCiudad(): void {
    if (this.sedeId !== null) {
      this.http.get<SedeModel[]>(`${this.BASE_URL}ciudads/${this.sedeId}/sedes`)
        .subscribe(
          (sedes) => {
            this.listaRegistros = sedes;
          },
          (error) => {
            console.error('Error al obtener las Sedes:', error);
          }
        );
    }
  }
}
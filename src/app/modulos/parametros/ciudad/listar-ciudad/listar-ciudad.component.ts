import { Component } from '@angular/core';
import { CiudadModel } from '../../../../modelos/ciudad.model';
import { ConfiguracionPaginacion } from '../../../../config/configuracion.paginacion';
import { ConfiguracionRutasBackend } from '../../../../config/configuracion.rutas.backend';
import { CiudadService } from '../../../../servicios/parametros/ciudad.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { SedeModel } from '../../../../modelos/sede.model';
import { HttpClient } from '@angular/common/http';
import { debounceTime, distinctUntilChanged, Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-listar-ciudad',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    NgxPaginationModule,
    FormsModule
  ],
  templateUrl: './listar-ciudad.component.html',
  styleUrl: './listar-ciudad.component.css'
})
export class ListarCiudadComponent {
  departamentoId: number | null = null;
  ciudades: CiudadModel[] = [];
  sedes: SedeModel[] = [];
  listaRegistros: CiudadModel[] = [];
  pag = 1;
  total = 0;
  registrosPorPagina = ConfiguracionPaginacion.registroPorPagina; 
  BASE_URL: string = ConfiguracionRutasBackend.urlNegocio;

  constructor(
    private servicioCiudades: CiudadService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.ListarRegistros();
    this.departamentoId = Number(this.route.snapshot.paramMap.get('id'));
    this.obtenerCiudadesPorDepartamento();
  }

  /**
   * Listar registros
   */
  ListarRegistros() {
    this.servicioCiudades.listarRegistrosPaginados(this.pag).subscribe({
      next: (datos) => {
          this.listaRegistros = datos.registros;
          this.total = datos.totalRegistros;
      },
      error: (error) => {
        alert('Error leyendo la información de la base de datos');
      }
    });
  }

  obtenerCiudadesPorDepartamento(): void {
    if (this.departamentoId !== null) {
      this.http.get<CiudadModel[]>(`${this.BASE_URL}departamentos/${this.departamentoId}/ciudads`)
        .subscribe(
          (ciudades) => {
            this.ciudades = ciudades;
          },
          (error) => {
            console.error('Error al obtener las ciudades:', error);
          }
        );
    }
  }
}

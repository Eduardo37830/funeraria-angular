import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { SedeModel } from '../../../../modelos/sede.model';
import { ConfiguracionPaginacion } from '../../../../config/configuracion.paginacion';
import { ConfiguracionRutasBackend } from '../../../../config/configuracion.rutas.backend';
import { SedeService } from '../../../../servicios/parametros/sede.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-listar-sede',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    NgxPaginationModule,
    FormsModule
  ],
  templateUrl: './listar-sede.component.html',
  styleUrls: ['./listar-sede.component.css']
})
export class ListarSedeComponent implements OnInit {
  ciudadId: number | null = null;
  listaRegistros: SedeModel[] = [];
  pag = 1;
  total = 0;
  registrosPorPagina = ConfiguracionPaginacion.registroPorPagina;      
  BASE_URL: string = ConfiguracionRutasBackend.urlNegocio;

  constructor(
    private servicioSedes: SedeService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.ListarRegistros();
    this.ciudadId = Number(this.route.snapshot.paramMap.get('id'));
    this.obtenerSedesPorCiudad();
  }

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
    if (this.ciudadId !== null) {
      this.http.get<SedeModel[]>(`${this.BASE_URL}ciudads/${this.ciudadId}/sedes`)
        .subscribe(
          (sedes) => {
            this.listaRegistros= sedes;
          },
          (error) => {
            console.error('Error al obtener las Sedes:', error);
          }
        );
    }
  }
}

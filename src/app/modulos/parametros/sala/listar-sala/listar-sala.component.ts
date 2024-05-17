import { Component } from '@angular/core';
import { SalaModel } from '../../../../modelos/sala.model';
import { ConfiguracionPaginacion } from '../../../../config/configuracion.paginacion';
import { ConfiguracionRutasBackend } from '../../../../config/configuracion.rutas.backend';
import { SalaService } from '../../../../servicios/parametros/sala.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-listar-sala',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    NgxPaginationModule,
    FormsModule
  ],
  templateUrl: './listar-sala.component.html',
  styleUrl: './listar-sala.component.css'
})
export class ListarSalaComponent {
  sedeId: number | null = null;
  listaRegistros: SalaModel[] = [];
  salas: SalaModel[] = [];
  pag = 1;
  total = 0;
  registrosPorPagina = ConfiguracionPaginacion.registroPorPagina;      
  BASE_URL: string = ConfiguracionRutasBackend.urlNegocio;                   

  constructor(
    private servicioSalas: SalaService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.ListarRegistros();
    this.sedeId = Number(this.route.snapshot.paramMap.get('id'));
    this.obtenerSalasPorSede();
  }

  /**
   * Listar registros
   */
  ListarRegistros() {
    this.servicioSalas.listarRegistrosPaginados(this.pag).subscribe({
      next: (datos) => {
          this.listaRegistros = datos.registros;
          this.total = datos.totalRegistros;
      },
      error: (error) => {
        alert('Error leyendo la información de la base de datos');
      }
    });
  }

  obtenerSalasPorSede(): void {
    if (this.sedeId !== null) {
      this.http.get<SalaModel[]>(`${this.BASE_URL}sedes/${this.sedeId}/salas`)
        .subscribe(
          (salas) => {
            this.salas = salas;
          },
          (error) => {
            console.error('Error al obtener las salas:', error);
          }
        );
    }
  }
}

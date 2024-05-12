import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { ConfiguracionPaginacion } from '../../../../config/configuracion.paginacion';
import { ConfiguracionRutasBackend } from '../../../../config/configuracion.rutas.backend';
import { DepartamentoService } from '../../../../servicios/parametros/departamento.service';
import { DepartamentoModel } from '../../../../modelos/departamento.model';
import { CiudadModel } from '../../../../modelos/ciudad.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-listar-departamento',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    NgxPaginationModule,
    FormsModule
  ],
  templateUrl: './listar-departamento.component.html',
  styleUrl: './listar-departamento.component.css'
})
export class ListarDepartamentoComponent {
  ciudades: CiudadModel[] = [];
  listaRegistros: DepartamentoModel[] = [];
  pag = 1;
  total = 0;
  registrosPorPagina = ConfiguracionPaginacion.registroPorPagina; 
  BASE_URL: string = ConfiguracionRutasBackend.urlNegocio;

  constructor(
    private servicioDepartamentos: DepartamentoService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.ListarRegistros();
  }

   /**
   * Listar registros
   */
   ListarRegistros() {
    this.servicioDepartamentos.listarRegistrosPaginados(this.pag).subscribe({
      next: (datos) => {
          this.listaRegistros = datos.registros;
          this.total = datos.totalRegistros;
      },
      error: (error) => {
        alert('Error leyendo la información de la base de datos');
      }
    });
  }
}

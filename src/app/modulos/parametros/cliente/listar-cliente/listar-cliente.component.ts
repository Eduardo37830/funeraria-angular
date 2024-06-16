import { Component } from '@angular/core';
import { ClienteModel } from '../../../../modelos/cliente.model';
import { ConfiguracionPaginacion } from '../../../../config/configuracion.paginacion';
import { ConfiguracionRutasBackend } from '../../../../config/configuracion.rutas.backend';
import { ClienteService } from '../../../../servicios/parametros/cliente.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-listar-cliente',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    NgxPaginationModule
  ],
  templateUrl: './listar-cliente.component.html',
  styleUrl: './listar-cliente.component.css'
})
export class ListarClienteComponent {
  listaRegistros:ClienteModel[] = [];
  pag = 1;
  total = 0;
  registrosPorPagina = ConfiguracionPaginacion.registroPorPagina;      
  BASE_URL: string = ConfiguracionRutasBackend.urlNegocio;   

  constructor(
    private servicioClientes: ClienteService,
  ) {}

  ngOnInit() {
    this.ListarRegistros();
  }

  /**
   * Listar registros
   */
  ListarRegistros() {
    this.servicioClientes.listarRegistrosPaginados(this.pag).subscribe({
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

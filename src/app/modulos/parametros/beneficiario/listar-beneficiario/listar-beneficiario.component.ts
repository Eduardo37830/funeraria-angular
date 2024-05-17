import { Component, OnInit } from '@angular/core';
import { BeneficiarioService } from '../../../../servicios/parametros/beneficiario.service';
import { BeneficiarioModel } from '../../../../modelos/beneficiario.model';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { ConfiguracionPaginacion } from '../../../../config/configuracion.paginacion';
import { ConfiguracionRutasBackend } from '../../../../config/configuracion.rutas.backend';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listar-beneficiario',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    NgxPaginationModule,
    FormsModule
  ],
  templateUrl: './listar-beneficiario.component.html',
  styleUrl: './listar-beneficiario.component.css'
})
export class ListarBeneficiarioComponent implements OnInit{
  clienteId: number | null = null;
  listaRegistros: BeneficiarioModel[] = [];
  beneficiarios: BeneficiarioModel[] = [];
  pag = 1;
  total = 0;
  registrosPorPagina = ConfiguracionPaginacion.registroPorPagina;      
  BASE_URL: string = ConfiguracionRutasBackend.urlNegocio;

  constructor(
    private servicio: BeneficiarioService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.ListarRegistros();
    this.clienteId = Number(this.route.snapshot.paramMap.get('id'));
    this.obtenerBeneficiarios();
  }

  ListarRegistros() {
    this.servicio.listarRegistrosPaginados(this.pag).subscribe({
      next: (datos) => {
        this.listaRegistros = datos.registros;
        this.total = datos.totalRegistros;
      },
      error: (error) => {
        alert('Error leyendo la información de la base de datos');
      }
    });
  }

  obtenerBeneficiarios(): void {
    if (this.clienteId !== null) {
      this.http.get<BeneficiarioModel[]>(`${this.BASE_URL}clientes/${this.clienteId}/beneficiarios`)
        .subscribe(
          (beneficiarios) => {
            this.beneficiarios = beneficiarios;
          },
          (error) => {
            console.error('Error al obtener las Sedes:', error);
          }
        );
    }
  }
}

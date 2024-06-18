import { Component } from '@angular/core';
import { solicitudModel } from '../../../modelos/solicitudServicioFunerario.model';
import { ConfiguracionRutasBackend } from '../../../config/configuracion.rutas.backend';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SolicitudService } from '../../../servicios/parametros/solicitud.service';
import { ConfiguracionPaginacion } from '../../../config/configuracion.paginacion';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-aceptar-solicitud',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    RouterModule,
  ],
  templateUrl: './aceptar-solicitud.component.html',
  styleUrl: './aceptar-solicitud.component.css'
})
export class AceptarSolicitudComponent {
  listaRegistros: solicitudModel[] = [];
  recordId: number = 0;
  pag = 1;
  total = 0;
  registrosPorPagina = ConfiguracionPaginacion.registroPorPagina;
  BASE_URL: string = ConfiguracionRutasBackend.urlNegocio;


  constructor(
    private route: ActivatedRoute,
    private servicio: SolicitudService,
    private router: Router,
    )
    {}

  ngOnInit(): void {
    this.recordId = Number(this.route.snapshot.paramMap.get('id'));
    this.ListarRegistros();
  }

  ListarRegistros() {
    this.servicio.listarRegistros(this.recordId).subscribe({
      next: (datos) => {
        this.listaRegistros = datos;
        console.log('Registros obtenidos:', this.listaRegistros);
      },
      error: () => {
        alert('Error leyendo la información de la base de datos');
      }
    });
  }

}
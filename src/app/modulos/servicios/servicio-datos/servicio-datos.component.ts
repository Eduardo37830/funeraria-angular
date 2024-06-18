import { Component } from '@angular/core';
import { ServicioFunerarioModel } from '../../../modelos/ServicoFunerario.model';
import { ServicioFunerarioService } from '../../../servicios/parametros/servicio-funerario.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClient } from '@angular/common/http';
import { SeguridadService } from '../../../servicios/seguridad.service';

@Component({
  selector: 'app-servicio-datos',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    NgxPaginationModule,
    FormsModule
  ],
  templateUrl: './servicio-datos.component.html',
  styleUrl: './servicio-datos.component.css'
})
export class ServicioDatosComponent {
  serviciosFunerarios: ServicioFunerarioModel[] = [];
  clienteId: number | null = null;

  constructor(
    private servicioFunerarioService: ServicioFunerarioService,
  ) { }

  ngOnInit(): void {
    this.listarServicios();
  }

  listarServicios(): void {
    this.servicioFunerarioService.listarRegistro()
      .subscribe(
        (servicios) => {
          this.serviciosFunerarios = servicios;
        },
        (error) => {
          console.error('Error al listar los servicios funerarios:', error);
        }
      );
  }
}
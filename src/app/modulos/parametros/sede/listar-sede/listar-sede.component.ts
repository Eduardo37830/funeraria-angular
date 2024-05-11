import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { SedeModel } from '../../../../modelos/sede.model';
import { ConfiguracionPaginacion } from '../../../../config/configuracion.paginacion';
import { ConfiguracionRutasBackend } from '../../../../config/configuracion.rutas.backend';
import { SedeService } from '../../../../servicios/parametros/sede.service';
import { HttpClient } from '@angular/common/http';
import { SalaModel } from '../../../../modelos/sala.model';

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
  styleUrl: './listar-sede.component.css'
})
export class ListarSedeComponent {
  sedes: SedeModel[] = [];
  salas: SalaModel[] = [];
  sedeSeleccionada: number | null = null;
  BASE_URL: string = ConfiguracionRutasBackend.urlNegocio;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.listarSedes();
  }

  listarSedes(): void {
    // Llama a tu endpoint para obtener la lista de sedes desde tu API
    this.http.get<SedeModel[]>('http://localhost:3001/sede')
      .subscribe(
        sedes => {
          this.sedes = sedes;
        },
        error => {
          console.error('Error al obtener las sedes:', error);
        }
      );
  }

  getSalasPorSede(sedeId: number): void {
    this.http.get<SalaModel[]>(`${this.BASE_URL}/sedes/${sedeId}/salas`)
      .subscribe(
        salas => {
          this.salas = salas;
        },
        error => {
          console.error('Error al obtener las salas:', error);
        }
      );
  }
}
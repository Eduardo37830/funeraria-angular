import { Component } from '@angular/core';
import { ConfiguracionRutasBackend } from '../../../../config/configuracion.rutas.backend';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { solicitudModel } from '../../../../modelos/solicitudServicioFunerario.model';
import { solicitudModel1 } from '../../../../modelos/solicitud.model';
import { BaseChartDirective } from 'ng2-charts';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-listar-solicitud',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    BaseChartDirective,
  ],
  templateUrl: './listar-solicitud.component.html',
  styleUrl: './listar-solicitud.component.css'
})
export class ListarSolicitudComponent {
  clienteConMasSolicitudes: any;
  solicitudes: solicitudModel[] = [];
  listaRegistros: solicitudModel1[] = [];
  clientesConMasServicios: any[] = [];
  BASE_URL: string = ConfiguracionRutasBackend.urlNegocio;
  chart: any;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.obtenerClienteConMasSolicitudes();
    this.obtenerClientesConMasServicios();
  }

  obtenerClienteConMasSolicitudes() {
    this.http.get<any>(`${this.BASE_URL}clientes-con-mas-solicitudes`).subscribe(
      response => {
        this.clienteConMasSolicitudes = response;
      },
      error => {
        console.error('Error al obtener el cliente con más solicitudes:', error);
      }
    );
  }

  obtenerClientesConMasServicios() {
    this.http.get<any[]>(`${this.BASE_URL}clientes-mas-servicios`).subscribe(data => {
      const clientes = data.map(item => item.nombre_cliente);
      const servicios = data.map(item => item.cantidad_servicios);
      this.clientesConMasServicios = data;
  
      // Eliminar gráfico anterior si existe
      if (this.chart) {
        this.chart.destroy();
      }
  
      // Crear nuevo gráfico
      this.chart = new Chart('canvas', {
        type: 'bar',
        data: {
          labels: clientes,
          datasets: [{
            label: 'Cantidad de servicios',
            data: servicios,
            backgroundColor: 'rgba(75, 192, 192, 0.3)', // Cambia la opacidad del color de fondo
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2, // Aumenta el ancho del borde
            hoverBackgroundColor: 'rgba(75, 192, 192, 0.8)', // Color al pasar el cursor
            hoverBorderColor: 'rgba(75, 192, 192, 1)',
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              grid: { // Agrega líneas de la cuadrícula
                display: true, // Muestra las líneas de la cuadrícula
                color: 'rgba(0, 0, 0, 0.1)', // Color de las líneas de la cuadrícula 
              }
            },
          },
          plugins: {
            legend: {
              display: false, // Oculta la leyenda del gráfico (título)  
            }
          },
          responsive: true, // Hace el gráfico receptivo al tamaño de la pantalla
          maintainAspectRatio: true, // Permite que el gráfico se ajuste al contenedor del gráfico 
          aspectRatio: 3, // Define la relación de aspecto del gráfico (ancho:alto)
        },
      });
    });
  }  
}

import { Component } from '@angular/core';
import { ConfiguracionRutasBackend } from '../../../../config/configuracion.rutas.backend';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { BaseChartDirective } from 'ng2-charts';
import { Chart } from 'chart.js/auto';
import { NativeDateModule } from '@angular/material/core';
import { Subscription } from 'rxjs';

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
    NativeDateModule
  ],
  templateUrl: './listar-solicitud.component.html',
  styleUrl: './listar-solicitud.component.css'
})
export class ListarSolicitudComponent {
  clienteConMasSolicitudes: any;
  clientesConMasServicios: any[] = [];
  BASE_URL: string = ConfiguracionRutasBackend.urlNegocio;
  chart: any;
  intervaloActualizacion: any;
  datosActualizados: Subscription | undefined;


  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.obtenerClienteConMasSolicitudes();
    this.obtenerClientesConMasServicios();
    // Establecer un intervalo para actualizar los datos cada 10 segundos
    this.intervaloActualizacion = setInterval(() => {
      this.actualizarDatos();
    }, 10000); // 10000 milisegundos = 10 segundos
  }

  ngOnDestroy(): void {
    // Limpiar el intervalo al destruir el componente para evitar fugas de memoria
    clearInterval(this.intervaloActualizacion);
    if (this.datosActualizados) {
      this.datosActualizados.unsubscribe();
    }
  }

  actualizarDatos() {
    // Llamar a las funciones para obtener los datos actualizados
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
  
      // Crear nuevo gráfico con animación activada al tocar
      this.chart = new Chart('canvas', {
        type: 'bar',
        data: {
          labels: clientes,
          datasets: [{
            label: 'Cantidad de servicios por Cliente',
            data: servicios,
            backgroundColor: 'rgba(75, 192, 192, 0.3)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            hoverBackgroundColor: 'rgba(75, 192, 192, 0.8)',
            hoverBorderColor: 'rgba(75, 192, 192, 1)',
          }]
        },
        options: {
          animation: {
            duration: 2500, // Duración de la animación en milisegundos (más lenta)
            easing: 'linear', // Tipo de animación
            loop: false, // Repetir la animación continuamente
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                display: true,
                color: 'rgba(0, 0, 0, 0.1)',
              }
            },
          },
          plugins: {
            legend: {
              display: true,
            }
          },
          responsive: true,
          maintainAspectRatio: true, 
          aspectRatio: 3,
        },
      });
    });
  }  
}

import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ConfiguracionRutasBackend } from '../../../../config/configuracion.rutas.backend';
import { Chart } from 'chart.js';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NativeDateModule } from '@angular/material/core';
import { RouterModule } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { NgxPaginationModule } from 'ngx-pagination';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-registros-por-fechas',
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
  templateUrl: './registros-por-fechas.component.html',
  styleUrl: './registros-por-fechas.component.css'
})
export class RegistrosPorFechasComponent {
  BASE_URL: string = ConfiguracionRutasBackend.urlNegocio;
  chartRegistros: any;
  chartServicios: any;
  fechaInicio: string | undefined;
  fechaFin: string | undefined;
  clienteConMasSolicitudes: any;
  clientesConMasServicios: any[] = [];
  intervaloActualizacion: any;
  datosActualizados: Subscription | undefined;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.obtenerRegistros();
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
    this.obtenerClienteConMasSolicitudes();
    this.obtenerClientesConMasServicios();
  }

  obtenerRegistros() {
    let params: any = {};

    if (this.fechaInicio) {
      params.fechaInicio = this.fechaInicio;
    }

    if (this.fechaFin) {
      params.fechaFin = this.fechaFin;
    }

    this.http.get<any[]>(`${this.BASE_URL}cliente`, { params }).subscribe(data => {
      const registrosFiltrados = data.filter(item => {
        const fechaRegistro = new Date(item.fechaRegistro);
        return (!this.fechaInicio || fechaRegistro >= new Date(this.fechaInicio)) &&
               (!this.fechaFin || fechaRegistro <= new Date(this.fechaFin));
      });

      const fechasRegistro = registrosFiltrados.map(item => new Date(item.fechaRegistro).getMonth() + 1);

      const counts: { [key: number]: number } = {};
      fechasRegistro.forEach(month => {
        counts[month] = (counts[month] || 0) + 1;
      });

      const sortedMonths = Object.keys(counts).map(month => parseInt(month)).sort((a, b) => a - b);
      const labels = sortedMonths.map(month => this.obtenerMes(month));
      const dataCounts = sortedMonths.map(month => counts[month]);

      if (this.chartRegistros) {
        this.chartRegistros.destroy();
      }

      this.chartRegistros = new Chart('canvasRegistros', {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Frecuencia de registros por mes',
            data: dataCounts,
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(75, 192, 192, 1)',
            pointRadius: 5,
            pointHoverRadius: 7,
            fill: false
          }]
        },
        options: {
          scales: {
            x: {
              type: 'category'
            },
            y: {
              type: 'linear',
            }
          },
          animation: {
            tension: {
              duration: 1000,
              easing: 'linear',
              from: 1,
              to: 0,
              loop: true
            }
          } as any
        }
      });
    }, error => {
      console.error('Error al obtener los registros:', error);
    });
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

      if (this.chartServicios) {
        this.chartServicios.destroy();
      }

      this.chartServicios = new Chart('canvasServicios', {
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
            duration: 2500,
            easing: 'linear',
            loop: false,
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

  obtenerMes(month: number): string {
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return meses[month - 1];
  }
}
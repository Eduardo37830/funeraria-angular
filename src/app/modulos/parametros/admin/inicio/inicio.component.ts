import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';
import 'chartjs-adapter-luxon';
import { ConfiguracionRutasBackend } from '../../../../config/configuracion.rutas.backend';
import { UsuarioValidadoModel } from '../../../../modelos/usuario.validado.model';
import { SeguridadService } from '../../../../servicios/seguridad.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  BASE_URL: string = ConfiguracionRutasBackend.urlNegocio;
  chart: any;
  clientes: any[] = [];
  Permiso: boolean = false;

  constructor(
    private http: HttpClient,
    private servicioSeguridad: SeguridadService,
  ) { }

  ngOnInit(): void {
    this.obtenerRegistros();
    this.ValidarPermisos();
  }

  obtenerRegistros() {
    this.http.get<any[]>(`${this.BASE_URL}cliente`).subscribe(data => {
      // Mapear solo los meses a partir de las fechas de registro
      const fechasRegistro = data.map(item => new Date(item.fechaRegistro).getMonth() + 1);
  
      // Contar la frecuencia de cada mes
      const counts: { [key: number]: number } = {};
      fechasRegistro.forEach(month => {
        if (typeof month === 'number') { // Verificar si month es un número
          const monthKey = month.toString(); // Convertir el mes a string
          counts[month] = (counts[month] || 0) + 1;
        }
      });
  
      // Crear arreglos separados para los meses y sus respectivas frecuencias
      const sortedMonths = Object.keys(counts).map(month => parseInt(month)).sort((a, b) => a - b);
      const labels = sortedMonths.map(month => this.obtenerMes(month));
      const dataCounts = sortedMonths.map(month => counts[month]);
  
      // Eliminar gráfico anterior si existe
      if (this.chart) {
        this.chart.destroy();
      }
  
      // Crear nuevo gráfico
      this.chart = new Chart('canvas', {
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
    });
  }

  // Función para obtener el nombre del mes a partir de su número
  obtenerMes(month: number): string {
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return meses[month - 1];
  }

  ValidarPermisos() {
    this.servicioSeguridad.ObtenerDatosSesion().subscribe({
      next: (data: UsuarioValidadoModel | null) => {
        if (data && data.token) {
          // Verificar si el usuario es un administrador
          if (data.user && data.user.rolId === '6619aa9177e8f21a1c6f600c') {
            // Redirigir al administrador a la página deseada
            this.Permiso= true;
          } 
        }
        console.log(this.Permiso);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }
}

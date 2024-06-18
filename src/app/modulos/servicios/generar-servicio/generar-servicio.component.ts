import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServicioFunerarioService } from '../../../servicios/parametros/servicio-funerario.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ServicioFunerarioModel } from '../../../modelos/ServicoFunerario.model';
import { CommonModule } from '@angular/common';
import { ConfiguracionPaginacion } from '../../../config/configuracion.paginacion';
import { ConfiguracionRutasBackend } from '../../../config/configuracion.rutas.backend';
import { HttpClient } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { solicitudModel } from '../../../modelos/solicitudServicioFunerario.model';
import { SolicitudService } from '../../../servicios/parametros/solicitud.service';
import { SalaModel } from '../../../modelos/sala.model';
import { SalaService } from '../../../servicios/parametros/sala.service';

@Component({
  selector: 'app-generar-servicio',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    NgxPaginationModule,
    FormsModule
  ],
  templateUrl: './generar-servicio.component.html',
  styleUrl: './generar-servicio.component.css'
})
export class GenerarServicioComponent {
  listarRegistros: solicitudModel[] = [];
  fGroup: FormGroup = new FormGroup({});
  solicitudId: number = 0;
  recordId: number = 0;
  servicioFunerario: ServicioFunerarioModel[] = [];
  salasDisponibles: SalaModel[] = [];
  solicitud: solicitudModel[] = [];
  salas: SalaModel[] = [];
  clienteId: number = 0;
  BASE_URL: string = ConfiguracionRutasBackend.urlNegocio;
  sedeId = 1;
  servicios: any;

  constructor(
    private fb: FormBuilder,
    private servicio: ServicioFunerarioService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
  ){
    this.recordId = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.ConstruirFormularioDatos();
    this.obtenerSalas();
  }

  ListarRegistros(): void {
    if (this.recordId !== null) {
      this.http.get<solicitudModel[]>(`${this.BASE_URL}solicitud-servicio-funerario/${this.recordId}`)
        .subscribe(
          (servicio) => {
            this.servicioFunerario = servicio;
          },
          (error) => {
            console.error('Error al obtener el plan:', error);
          }
        );
    }
  }

  ConstruirFormularioDatos(): void {
    this.fGroup = this.fb.group({
      traslado: [false],
      fecha: [new Date()],
      tipo: ['velación', [Validators.required]],
      codigoUnicoServicio: ['1', [Validators.required]],
      salaId: ['', [Validators.required]],
      solicitudServicioFunerarioId: [this.recordId, [Validators.required]]
    });
  }

  GuardarRegistro() {
    if (this.fGroup.invalid) {
      alert('Debe diligenciar todo el formulario');
    } else {
      let modelo = this.obtenerRegistro();
      console.log('El modelo es:', modelo);
      this.servicio.AgregarRegistro(modelo).subscribe({
        next: (data: ServicioFunerarioModel) => {
          alert('Registro guardado correctamente');
          this.router.navigate(['/servicios/','datos-servicio']);
        },
        error: (error: any) => {
          alert('Error al guardar el registro');
        }
      });
    }
  }

  ListarRegistrosSolicitud(): void {
    if (this.recordId !== null) {
      this.http.get<solicitudModel[]>(`${this.BASE_URL}solicitud-servicio-funerario/${this.recordId}`)
        .subscribe(
          (solicitud) => {
            this.solicitud = solicitud; // Asignar la solicitud obtenida al arreglo de solicitudes
          },
          (error) => {
            console.error('Error al obtener la solicitud:', error);
          }
        );
    }
  }

  obtenerRegistro(): ServicioFunerarioModel {
    let model = new ServicioFunerarioModel();
    model.fecha = new Date();
    model.traslado = this.obtenerFgDatos['traslado'].value;
    model.tipo = this.obtenerFgDatos['tipo'].value;
    model.codigoUnicoServicio = this.obtenerFgDatos['codigoUnicoServicio'].value; 
    model.solicitudServicioFunerarioId = this.recordId;
    model.salaId = this.obtenerFgDatos['salaId'].value;
    return model;
  }
  

  get obtenerFgDatos() {
    return this.fGroup.controls;
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.fGroup.invalid) {
      alert('Debe diligenciar todo el formulario');
      console.log(this.fGroup);
    } else if (!this.recordId) {
      alert('Por favor, seleccione un plan antes de confirmar.');
    } else {
      this.GuardarRegistro();
    }
  }

  obtenerSalas() {
    this.http.get<SalaModel[]>(`${this.BASE_URL}salas-disponibles`).subscribe({
      next: (data) => {
        console.log("Las salas son:", data);
        this.salas = data;
        for (let i = 0; i < this.salas.length; i++) {
          if (this.salas[i].disponible) {
            this.fGroup.controls['salaId'].setValue(this.salas[i].id);
          }
        }
      },
      error: (error) => {
        console.error('Error al cargar las salas disponibles', error);
      }
    });
  }

  obtenerSalasPorSede(): void {
    if (this.sedeId !== null) {
      this.http.get<SalaModel[]>(`${this.BASE_URL}sedes/${this.sedeId}/salas`)
        .subscribe(
          (salas) => {
            this.salas = salas;
          },
          (error) => {
            console.error('Error al obtener las salas:', error);
          }
        );
    }
  }
}
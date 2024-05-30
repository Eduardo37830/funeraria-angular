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
  fGroup: FormGroup = new FormGroup({});
  solicitudId: number = 0;
  recordId: number = 0;
  servicioFunerario: solicitudModel[] = [];
  BASE_URL: string = ConfiguracionRutasBackend.urlNegocio;

  constructor(
    private fb: FormBuilder,
    private servicio: ServicioFunerarioService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    ){
    this.recordId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.ConstruirFormularioDatos();
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
      tipo: ['velación', [Validators.required]],
      fecha: [new Date(), [Validators.required]],
      traslado: ['' ],
      codigoServicio: [''],
      salaId: [''],
      solicitudId: [this.recordId, [Validators.required]]
    });
  }

  GuardarRegistro() {
    if (this.fGroup.invalid) {
      alert('Debe diligenciar todo el formulario');
    } else {
      let modelo = this.obtenerRegistro();
      this.servicio.AgregarRegistro(modelo).subscribe({
        next: (data: ServicioFunerarioModel) => {
          alert('Registro guardado correctamente');
          this.router.navigate(['/parametros/departamentos',, 'ciudad-listar']);
        },
        error: (error: any) => {
          alert('Error al guardar el registro');
        }
      });
    }
  }

  obtenerRegistro(): ServicioFunerarioModel {
    let model = new ServicioFunerarioModel();
    model.tipo = this.obtenerFgDatos['tipo'].value;
    model.fecha = this.obtenerFgDatos['fecha'].value;
    model.traslado = this.obtenerFgDatos['traslado'].value;
    model.codigoServicio = this.obtenerFgDatos['codigoServicio'].value;
    model.solicitudId = this.solicitudId;
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
}


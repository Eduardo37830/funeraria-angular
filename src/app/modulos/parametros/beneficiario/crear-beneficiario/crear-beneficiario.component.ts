import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BeneficiarioService } from '../../../../servicios/parametros/beneficiario.service';
import { BeneficiarioModel } from '../../../../modelos/beneficiario.model';
import { ConfiguracionRutasBackend } from '../../../../config/configuracion.rutas.backend';

@Component({
  selector: 'app-crear-beneficiario',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './crear-beneficiario.component.html',
  styleUrl: './crear-beneficiario.component.css'
})
export class CrearBeneficiarioComponent {
  fGroup: FormGroup = new FormGroup({});
  clienteId: number = 0;
  BASE_URL: string = ConfiguracionRutasBackend.urlNegocio;

  constructor(
    private fb: FormBuilder,
    private servicio: BeneficiarioService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.clienteId = Number(this.route.snapshot.paramMap.get('id'));
    this.ContruirFormularioDatos();
  }

  ContruirFormularioDatos(): void {
    this.fGroup = this.fb.group({
      primerNombre: ['', [Validators.required]],
      segundoNombre: ['', [Validators.required]],
      primerApellido: ['', [Validators.required]],
      segundoApellido: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      celular: ['', [Validators.required]],
      foto: ['', [Validators.required]],
      ciudadResidencia: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      fechaRegistro: ['', [Validators.required]],
      activo: ['', [Validators.required]],
      clienteId: [this.clienteId, [Validators.required]]
    });
  }

  GuardarRegistro() {
    if (this.fGroup.invalid) {
      alert('Debe diligenciar todo el formulario');
    } else {
      let modelo = this.obtenerRegistro();
      this.servicio.AgregarRegistro(modelo).subscribe({
        next: (data: BeneficiarioModel) => {
          alert('Registro guardado correctamente');
          this.router.navigate(['/parametros/cliente-listar']);
        },
        error: (error: any) => {
          alert('Error al guardar el registro');
        }
      })
    }
  }

  obtenerRegistro(): BeneficiarioModel {
    let model = new BeneficiarioModel();
    model.primerNombre = this.obtenerFgDatos['primerNombre'].value;
    model.segundoNombre = this.obtenerFgDatos['segundoNombre'].value;
    model.primerApellido = this.obtenerFgDatos['primerApellido'].value;
    model.segundoApellido = this.obtenerFgDatos['segundoApellido'].value;
    model.correo = this.obtenerFgDatos['correo'].value;
    model.celular = this.obtenerFgDatos['celular'].value;
    model.foto = this.obtenerFgDatos['foto'].value;
    model.ciudadResidencia = this.obtenerFgDatos['ciudadResidencia'].value;
    model.direccion = this.obtenerFgDatos['direccion'].value;
    model.fechaRegistro = this.obtenerFgDatos['fechaRegistro'].value;
    model.activo = this.obtenerFgDatos['activo'].value;
    model.clienteId = parseInt(this.obtenerFgDatos['clienteId'].value);
    return model;
  }

  get obtenerFgDatos() {
    return this.fGroup.controls;
  }
}


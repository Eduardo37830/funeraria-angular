import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { UsuarioModel } from '../../../modelos/usuario.model';
import { NgxCaptchaModule } from 'ngx-captcha';

@Component({
  selector: 'app-registro-usuario',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgxCaptchaModule
  ],
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css'] // Cambié styleUrl a styleUrls
})
export class RegistroUsuarioComponent implements OnInit {
  fGroup: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private servicioSeguridad: SeguridadService
  ) { }

  captchaSiteKey= this.servicioSeguridad.captchaSiteKey;

  ngOnInit() {
    this.ConstruirFormulario();
  }

  /**
   * Construcción del formulario con los controles
   */
  ConstruirFormulario() {
    this.fGroup = this.fb.group({
      primerNombre: ['', [Validators.required, Validators.minLength(2)]],
      segundoNombre: ['', [Validators.minLength(2)]],
      primerApellido: ['', [Validators.required, Validators.minLength(2)]],
      segundoApellido: ['', [Validators.minLength(2)]],
      correo: ['', [Validators.required, Validators.email]], // Añadido Validators.email
      telefono: ['', [Validators.required, Validators.minLength(10)]], // Ajustado minlength a 10
      ciudadResidencia: ['', [Validators.required, Validators.minLength(2)]], // Añadido campo ciudadResidencia
      direccion: ['', [Validators.required, Validators.minLength(5)]], // Añadido campo direccion,
      recaptcha: ['', Validators.required]
    });
  }

  /**
   * Función de registro público
   */
  Registrarse() {
    if (this.fGroup.invalid) {
      alert('Debe completar todos los campos requeridos.');
      return;
    }

    let campos = this.ObtenerFormGroup;
    let datosSeguridad = {
      primerNombre: campos["primerNombre"].value,
      segundoNombre: campos["segundoNombre"].value,
      primerApellido: campos["primerApellido"].value,
      segundoApellido: campos["segundoApellido"].value,
      correo: campos["correo"].value,
      celular: campos["telefono"].value,
      ciudadResidencia: campos["ciudadResidencia"].value,
      direccion: campos["direccion"].value,
      rolId: "661dcc702a5f4843508e6740" // Puede que necesites ajustar esto dependiendo de la lógica de negocio
    };

    // Registrar en la base de datos de seguridad
    this.servicioSeguridad.RegistrarUsuarioPublico(datosSeguridad).subscribe({
      next: (respuestaSeguridad: UsuarioModel) => {
        console.log('Usuario registrado en la base de datos de seguridad.');

        // Preparar los datos para registrar en la base de datos de lógica de negocio
        let datosLogicaNegocio = {
          primerNombre: datosSeguridad.primerNombre,
          segundoNombre: datosSeguridad.segundoNombre,
          primerApellido: datosSeguridad.primerApellido,
          segundoApellido: datosSeguridad.segundoApellido,
          correo: datosSeguridad.correo,
          celular: datosSeguridad.celular,
          ciudadResidencia: datosSeguridad.ciudadResidencia,
          direccion: datosSeguridad.direccion,
          activo: true,
          _idSeguridad: respuestaSeguridad._id // Usar el ID del usuario de seguridad
        };

        // Registrar en la base de datos de lógica de negocio
        this.servicioSeguridad.RegistrarUsuarioPublicoLogicaNegocio(datosLogicaNegocio).subscribe({
          next: (respuestaLogica: UsuarioModel) => {
            alert("Registro correcto, se ha enviado un mensaje para validar su dirección de correo electrónico.");
          },
          error: (errLogica) => {
            alert("Se ha producido un error en el registro en la base de datos de lógica de negocio." + JSON.stringify(errLogica.error));
          }
        });
      },
      error: (errSeguridad) => {
        alert("Se ha producido un error en el registro en la base de datos de seguridad." + JSON.stringify(errSeguridad.error));
      }
    });
  }

  get ObtenerFormGroup() {
    return this.fGroup.controls;
  }

  handleReset() {
    console.log('reCAPTCHA reset');
  }

  handleExpire() {
    console.log('reCAPTCHA expired');
  }

  handleLoad() {
    console.log('reCAPTCHA loaded');
  }

  handleSuccess(token: string) {
    this.fGroup.get('recaptcha')!.setValue(token);
  }
}

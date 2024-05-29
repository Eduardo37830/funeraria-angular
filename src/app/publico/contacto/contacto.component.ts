import { Component, OnInit } from '@angular/core';
import { SeguridadService } from '../../servicios/seguridad.service';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PqrsModel } from '../../modelos/pqrs.model';
import { CommonModule } from '@angular/common';
import { NgxCaptchaModule } from 'ngx-captcha';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [    
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgxCaptchaModule
  ],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent implements OnInit{
  fGroup: FormGroup = new FormGroup({});
  constructor(
    private servicioSeguridad: SeguridadService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.ConstruirFormulario();
  }

  captchaSiteKey = this.servicioSeguridad.captchaSiteKey;

  /**
   * Construcción del formulario con los controles
   */
  ConstruirFormulario() {
    this.fGroup = this.fb.group({
      tipo: ['', [Validators.required]],
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      correo: ['', [Validators.required, Validators.email]],
      mensaje: ['', [Validators.required, Validators.minLength(10)]],
      recaptcha: ['', Validators.required]
    });
  }

  enviarPQRS() {
    if (this.fGroup.invalid) {
      alert('Debe completar todos los campos requeridos.');
      return;
    }

    const datospqrs = {
      tipo: this.fGroup.get('tipo')!.value,
      nombre: this.fGroup.get('nombre')!.value,
      correo: this.fGroup.get('correo')!.value,
      pqrs: this.fGroup.get('mensaje')!.value
    };

    console.log(datospqrs);
    

    this.servicioSeguridad.EnviarPQRS(datospqrs).subscribe({
      next: (respuesta: any) => {
        console.log('PQRS enviada correctamente:', respuesta);
        alert('PQRS enviada con éxito');
        this.limpiarFormulario();
      },
      error: (error: any) => {
        console.error('Error al enviar PQRS:', error);
        if (error.status === 400) {
          alert('Solicitud inválida. Por favor, verifique los datos ingresados.');
        } else if (error.status === 500) {
          alert('Error del servidor. Por favor, intente nuevamente más tarde.');
        } else {
          alert('Error al enviar PQRS. Por favor, intente nuevamente.');
        }
      }
    });
  }

  limpiarFormulario() {
    this.fGroup.reset();
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

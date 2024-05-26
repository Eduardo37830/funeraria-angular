import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { UsuarioModel } from '../../../modelos/usuario.model';
import { NgxCaptchaModule } from 'ngx-captcha';

@Component({
  selector: 'app-cambio-clave',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCaptchaModule
  ],
  templateUrl: './cambio-clave.component.html',
  styleUrls: ['./cambio-clave.component.css']
})
export class CambioClaveComponent implements OnInit {
  fGroup: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private servicioSeguridad: SeguridadService
  ) {}

  captchaSiteKey= this.servicioSeguridad.captchaSiteKey;

  ngOnInit() {
    this.fGroup = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      clave: ['', [Validators.required, Validators.minLength(5)]],
      claveNueva: ['', [Validators.required, Validators.minLength(5)]],
      recaptcha: ['', Validators.required]
    });
  }

  ActualizarClave() {
    if (this.fGroup.invalid) {
      alert('Debe ingresar los datos del usuario correctamente.');
    } else {
      const datos = {
        correo: this.fGroup.get('correo')!.value,
        clave: this.fGroup.get('clave')!.value,
        nuevaClave: this.fGroup.get('claveNueva')!.value,
      };
      this.servicioSeguridad.CambiarClave(datos).subscribe({
        next: (response: any) => {
          console.log(response);
          if (response) {
            alert(response.message);
          } else {
            alert('Clave actualizada correctamente.');
          }
        },
        error: (err) => {
          alert('Ha ocurrido un error enviando la nueva contraseña.' + JSON.stringify(err));
          console.error('Error:', err);
        },
      });
    }
  }

  get obtenerFormGroup() {
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

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { UsuarioModel } from '../../../modelos/usuario.model';
import {MD5} from 'crypto-js';
import { NgxCaptchaModule } from 'ngx-captcha';

@Component({
  selector: 'app-identificacion-usuario',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgxCaptchaModule
  ],
  templateUrl: './identificacion-usuario.component.html',
  styleUrl: './identificacion-usuario.component.css'
})
export class IdentificacionUsuarioComponent {
  fGroup: FormGroup = new FormGroup({});
  
  constructor(
    private fb: FormBuilder,
    private servicioSeguridad: SeguridadService,
    private router: Router,
  ) { 
    
  }

  captchaSiteKey = this.servicioSeguridad.captchaSiteKey;

  ngOnInit() {
    this.ContruirFormulario();
  }

  ContruirFormulario() {
    this.fGroup = this.fb.group({
      usuario: ['', [Validators.required, Validators.email]],
      clave: ['', [Validators.required]],
      recaptcha: ['', Validators.required]
    });
  }

  IdentificarUsuario() {
    if (this.fGroup.invalid) {
      alert('Debe ingresar los campos requeridos');
      return;
    } else {
      let usuario = this.obtenerFormGroup['usuario'].value;
      let clave = this.obtenerFormGroup['clave'].value;
      let claveCifrada = MD5(clave).toString();
      console.log("La clave cifrada es: " + claveCifrada);
      
      this.servicioSeguridad.IndentificarUsuario(usuario, claveCifrada).subscribe({
        next: (data: UsuarioModel) => {
          if (data._id == undefined || data._id == null) {
            alert("Credenciales incorrectas o falta la validación del correo electrónico.");
          } else {
            console.log(data);
            if (this.servicioSeguridad.AlmacenarDatosUsuarioIdentificado(data)) {
              this.router.navigate(["/seguridad/2fa"]);
            }
          }
        },
        error: (error) => {
          console.log(error);
        }
      })
        
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

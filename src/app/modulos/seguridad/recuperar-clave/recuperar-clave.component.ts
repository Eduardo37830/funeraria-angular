import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { UsuarioModel } from '../../../modelos/usuario.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recuperar-clave',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './recuperar-clave.component.html',
  styleUrl: './recuperar-clave.component.css',
})
export class RecuperarClaveComponent {
  fGroup: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private servicioSeguridad: SeguridadService
  ) {}

  ngOnInit() {
    this.fGroup = this.fb.group({
      usuario: ['', [Validators.required, Validators.email]],
    });
  }

  RecuperarClave() {
    if (this.fGroup.invalid) {
      alert('Debe ingresar los datos del usuario');
    } else {
      let usuario = this.obtenerFormGroup['usuario'].value;
      this.servicioSeguridad.RecuperarClavePorUsuario(usuario).subscribe({
        next: (datos: UsuarioModel) => {
          alert(
            'Se ha enviado una nueva contraseña como mensaje de texto al número ' +
              datos.celular
          );
        },
        error: (err) => {
          alert('Ha ocurrido un error enviando la nueva contraseña.');
        },
      });
    }
  }

  get obtenerFormGroup() {
    return this.fGroup.controls;
  }
}

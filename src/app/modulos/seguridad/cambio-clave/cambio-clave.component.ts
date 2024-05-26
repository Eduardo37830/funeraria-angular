import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { UsuarioModel } from '../../../modelos/usuario.model';

@Component({
  selector: 'app-cambio-clave',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
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

  ngOnInit() {
    this.fGroup = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      clave: ['', [Validators.required, Validators.minLength(5)]],
      claveNueva: ['', [Validators.required, Validators.minLength(5)]],
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
}

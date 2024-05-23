import { Component } from '@angular/core';
import { UsuarioModel } from '../../../modelos/usuario.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-registro-usuario',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css'] // Cambié styleUrl a styleUrls
})
export class RegistroUsuarioComponent {
  fGroup: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private servicioSeguridad: SeguridadService
  ) { }

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
      telefono: ['', [Validators.required, Validators.minLength(12)]],
      ciudadResidencia: ['', [Validators.required, Validators.minLength(2)]], // Añadido campo ciudadResidencia
      direccion: ['', [Validators.required, Validators.minLength(5)]], // Añadido campo direccion
    });
  }

  /**
   * Función de registro público
   */
  Registrarse() {
    let campos = this.ObtenerFormGroup;
    let datos = {
      primerNombre: campos["primerNombre"].value,
      segundoNombre: campos["segundoNombre"].value,
      primerApellido: campos["primerApellido"].value,
      segundoApellido: campos["segundoApellido"].value,
      correo: campos["correo"].value,
      celular: campos["telefono"].value,
      ciudadResidencia: campos["ciudadResidencia"].value, // Añadido campo ciudadResidencia
      direccion: campos["direccion"].value, // Añadido campo direccion
      rolId: "661dcc702a5f4843508e6740" //Falta corregir esto
    };

    this.servicioSeguridad.RegistrarUsuarioPublico(datos).subscribe({
      next: (respuesta: UsuarioModel) => {
        alert("Registro correcto, se ha enviado un mensaje para validar su dirección de correo electrónico.");
      },
      error: (err) => {
        alert("Se ha producido un error en el registro." + JSON.stringify(err.error));
      }
    });
  }

  get ObtenerFormGroup() {
    return this.fGroup.controls;
  }
}

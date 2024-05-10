import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-identificacion-usuario',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './identificacion-usuario.component.html',
  styleUrl: './identificacion-usuario.component.css'
})
export class IdentificacionUsuarioComponent {
  fGroup: FormGroup = new FormGroup({});
  constructor(
    private fb: FormBuilder
  ) { 
    
  }

  ngOnInit() {
    this.ContruirFormulario();
  }

  ContruirFormulario() {
    this.fGroup = this.fb.group({
      usuario: ['', [Validators.required, Validators.email]],
      clave: ['', [Validators.required]]
    });
  }

  IdentificarUsuario() {
    if (this.fGroup.invalid) {
      alert('Debe ingresar los campos requeridos');
      return;
    } else {
      alert('Ingresando al sistema');
    }
  }

  get obtenerFormGroup() {
    return this.fGroup.controls;
  }
}

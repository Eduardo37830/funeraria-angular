import { Component } from '@angular/core';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-identificacion-twofa',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './identificacion-twofa.component.html',
  styleUrl: './identificacion-twofa.component.css'
})
export class IdentificacionTwofaComponent {

  usuarioId: string = "";
  fGroup: FormGroup = new FormGroup({});

  constructor(
    private servicioSeguridad: SeguridadService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    let datos = this.servicioSeguridad.ObtenerDatosUsuarioLS();
    if (datos != null) {
      this.usuarioId = datos._id!;
      this.ConstruirFormulario();
    }
  }

  ConstruirFormulario() {
    this.fGroup = this.fb.group({
      codigo: ['', Validators.required]
    });
  }

  ValidarCodigo2fa() {
    if (this.fGroup.invalid) {
      alert('Debe ingresar el código 2FA');
    } else {
    let codigo2fa = this.obtenerFormGroup['codigo'].value;
    this.servicioSeguridad.ValidarCodigo2FA(this.usuarioId, codigo2fa).subscribe({
      next: (data:object) => {
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      }
    });
    }
  }

  get obtenerFormGroup() {
    return this.fGroup.controls;
  }
}

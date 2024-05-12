import { Component } from '@angular/core';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { UsuarioValidadoModel } from '../../../modelos/usuario.validado.model';

@Component({
  selector: 'app-identificacion-twofa',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './identificacion-twofa.component.html',
  styleUrl: './identificacion-twofa.component.css'
})
export class IdentificacionTwofaComponent {

  usuarioId: string = "";
  fGroup: FormGroup = new FormGroup({});

  constructor(
    private servicioSeguridad: SeguridadService,
    private fb: FormBuilder,
    private router: Router

  ) { }

  ngOnInit() {
    let datos = this.servicioSeguridad.ObtenerDatosUsuarioLS();
    if (datos != null) {
      this.usuarioId = datos._id!;
      this.ConstruirFormulario();
    } else {
      this.router.navigate(['/seguridad/identificacion-usuario']);
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
      next: (data:UsuarioValidadoModel) => {
        console.log(data);
        this.servicioSeguridad.AlmacenarDatosUsuarioValidado(data);
        this.router.navigate([""]);
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

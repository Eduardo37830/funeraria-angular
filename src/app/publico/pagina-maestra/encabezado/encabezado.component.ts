import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { MenuLateralComponent } from "../menu-lateral/menu-lateral.component";
import { SeguridadService } from '../../../servicios/seguridad.service';
import { UsuarioValidadoModel } from '../../../modelos/usuario.validado.model';

@Component({
    selector: 'app-encabezado',
    standalone: true,
    templateUrl: './encabezado.component.html',
    styleUrl: './encabezado.component.css',
    imports: [
        RouterModule,
        ReactiveFormsModule,
        CommonModule,
        RouterLink,
        MenuLateralComponent
    ]
})
export class EncabezadoComponent {

  constructor(
    private servicioSeguridad: SeguridadService,
  ) { }

  SesionActiva: boolean = false;

  ngOnInit(): void {
    this.ValidarSesion();
  }

  ValidarSesion() {
    this.servicioSeguridad.ObtenerDatosSesion().subscribe({
      next: (data:UsuarioValidadoModel) => {
        if (data.token != "") {
          this.SesionActiva = true;
        } else {
          this.SesionActiva = false;
        }
      },
      error: (error:any) => {
        console.log(error);
      }
    });
  }

}

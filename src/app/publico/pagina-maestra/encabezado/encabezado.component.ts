import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { MenuLateralComponent } from "../menu-lateral/menu-lateral.component";
import { SeguridadService } from '../../../servicios/seguridad.service';
import { UsuarioValidadoModel } from '../../../modelos/usuario.validado.model';

@Component({
    selector: 'app-encabezado',
    standalone: true,
    templateUrl: './encabezado.component.html',
    styleUrls: ['./encabezado.component.css'],
    imports: [
        RouterModule,
        ReactiveFormsModule,
        CommonModule,
        RouterLink,
        MenuLateralComponent
    ]
})
export class EncabezadoComponent implements OnInit {

  SesionActiva: boolean = false;

  constructor(
    private servicioSeguridad: SeguridadService,
  ) { }

  ngOnInit(): void {
    this.ValidarSesion();
  }

  ValidarSesion() {
    this.servicioSeguridad.ObtenerDatosSesion().subscribe({
      next: (data: UsuarioValidadoModel | null) => {
        if (data && data.token) {
          this.SesionActiva = true;
        } else {
          this.SesionActiva = false;
        }
        console.log(this.SesionActiva);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }
}

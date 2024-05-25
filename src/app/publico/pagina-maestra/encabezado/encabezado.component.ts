import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
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
  esAdministrador: boolean = false;

  constructor(
    private servicioSeguridad: SeguridadService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.ValidarSesion();
  }

  ValidarSesion() {
    this.servicioSeguridad.ObtenerDatosSesion().subscribe({
      next: (data: UsuarioValidadoModel | null) => {
        if (data && data.token && data.user) {
          this.SesionActiva = true;
          // Verificar si el usuario es un administrador
          console.log(data.user.rolId);
          
          if (data.user.rolId === '6619aa9177e8f21a1c6f600c') {
            this.esAdministrador = true;
          } else {
            this.esAdministrador = false;
          }
          // Redirigir al administrador a la página deseada si es necesario
          if (this.esAdministrador) {
            this.router.navigate(['/inicio']);
          }
        } else {
          this.SesionActiva = false;
          this.esAdministrador = false;
        }
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }
}

import { CommonModule } from '@angular/common';
import { Component, HostBinding, OnInit, effect, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { MenuLateralComponent } from "../menu-lateral/menu-lateral.component";
import { SeguridadService } from '../../../servicios/seguridad.service';
import { UsuarioValidadoModel } from '../../../modelos/usuario.validado.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMoon, faSun} from '@fortawesome/free-solid-svg-icons';

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
    MenuLateralComponent,
    FontAwesomeModule
  ]
})
export class EncabezadoComponent implements OnInit {

  SesionActiva: boolean = false;
  esAdministrador: boolean = false;

  faMoon = faMoon;
  faSun = faSun;

  darkMode = signal<boolean>(
    JSON.parse(window.localStorage.getItem('darkMode') ?? 'false')
  );

  constructor(
    private servicioSeguridad: SeguridadService,
    private router: Router,
  ) {
    effect(() => {
      window.localStorage.setItem('darkMode', JSON.stringify(this.darkMode()));
      this.applyTheme();
    });
  }

  ngOnInit(): void {
    this.ValidarSesion();
    this.applyTheme(); // Apply theme on initialization
  }

  ValidarSesion() {
    this.servicioSeguridad.ObtenerDatosSesion().subscribe({
      next: (data: UsuarioValidadoModel | null) => {
        if (data && data.token && data.user) {
          this.SesionActiva = true;
          console.log(data.user.rolId);

          if (data.user.rolId === '6619aa9177e8f21a1c6f600c') {
            this.esAdministrador = true;
          } else {
            this.esAdministrador = false;
          }
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

  toggleTheme() {
    this.darkMode.set(!this.darkMode());
    this.applyTheme();
  }

  private applyTheme() {
    if (this.darkMode()) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  }

  @HostBinding('class.dark') get mode() {
    return this.darkMode();
  }
}

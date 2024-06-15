import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleUser} from '@fortawesome/free-solid-svg-icons';
import { SeguridadService } from '../../../servicios/seguridad.service';


@Component({
  selector: 'app-menu-lateral',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FontAwesomeModule,
  ],
  templateUrl: './menu-lateral.component.html',
  styleUrl: './menu-lateral.component.css'
})
export class MenuLateralComponent {
  isOpen = false;
  faCircleUser = faCircleUser;

  constructor(
    private seguridadService: SeguridadService,
  ) {
    this.obtenerDatosUsuario()
  }

  nombre = ""
  image = ""

  idSeguridad: string = this.seguridadService.ObtenerDatosUsuarioLS()!._id!;

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  obtenerDatosUsuario() {
    console.log("EL id es", this.idSeguridad);
    const tmp = this.seguridadService.ObtenerDatosUsuarioCliente(this.idSeguridad).subscribe({
      next: (data) => {
        console.log("La información es:", data);
        this.nombre = data.primerNombre! + " " + data.primerApellido!
        this.image = data.foto!
        console.log(this.image);
        
        return data;
      },
    });
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.relative')) {
      this.isOpen = false;
    }
  }
}

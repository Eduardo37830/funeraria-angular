import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-validar-hash-usuario-publico',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './validar-hash-usuario-publico.component.html',
  styleUrl: './validar-hash-usuario-publico.component.css'
})
export class ValidarHashUsuarioPublicoComponent {
  validado = false;
  hash: string = "";

  constructor(
    private servicioSeguridad: SeguridadService,
    private route: ActivatedRoute
  ){

  }

  ngOnInit(){
    this.hash = this.route.snapshot.params["hash"];
    this.ValidarHash();
  }

  /**
   * Método de validación de hash
   */
  ValidarHash(){
    this.servicioSeguridad.ValidarHashUsuarioPublico(this.hash).subscribe({
      next: (respuesta:boolean) => {
        this.validado = respuesta;
      },
      error: (err) => {

      }
    });
  }
}

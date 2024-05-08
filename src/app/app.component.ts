import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EncabezadoComponent } from "./publico/pagina-maestra/encabezado/encabezado.component";
import { PiePaginaComponent } from "./publico/pagina-maestra/pie-pagina/pie-pagina.component";
import { initFlowbite } from 'flowbite';
import { HttpClientModule } from '@angular/common/http';
import { SeguridadModule } from './modulos/seguridad/seguridad.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MenuLateralComponent } from './publico/pagina-maestra/menu-lateral/menu-lateral.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [
      RouterOutlet,
      PiePaginaComponent, 
      HttpClientModule,
      SeguridadModule,
      ReactiveFormsModule,
      EncabezadoComponent,
      MenuLateralComponent
  ],
})
export class AppComponent implements OnInit {
  title = 'web-app';

  ngOnInit(): void {
    initFlowbite();
  }
}

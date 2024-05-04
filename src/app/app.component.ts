import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EncabezadoComponent } from "./publico/pagina-maestra/encabezado/encabezado.component";
import { PiePaginaComponent } from "./publico/pagina-maestra/pie-pagina/pie-pagina.component";
import { MenuLateralComponent } from "./publico/pagina-maestra/menu-lateral/menu-lateral.component";
import { initFlowbite } from 'flowbite';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, EncabezadoComponent, PiePaginaComponent, MenuLateralComponent]
})
export class AppComponent implements OnInit {
  title = 'web-app';

  ngOnInit(): void {
    initFlowbite();
  }
}

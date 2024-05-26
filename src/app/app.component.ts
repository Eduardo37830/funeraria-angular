import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EncabezadoComponent } from "./publico/pagina-maestra/encabezado/encabezado.component";
import { PiePaginaComponent } from "./publico/pagina-maestra/pie-pagina/pie-pagina.component";
import { initFlowbite } from 'flowbite';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NativeDateModule } from '@angular/material/core';
@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [
      RouterOutlet,
      PiePaginaComponent, 
      HttpClientModule,
      ReactiveFormsModule,
      EncabezadoComponent,
      NativeDateModule,
    ],
})
export class AppComponent implements OnInit {
  title = 'web-app';

  ngOnInit(): void {
    initFlowbite();
  }
}

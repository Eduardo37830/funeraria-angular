import { Component, HostBinding, OnInit, effect, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EncabezadoComponent } from "./publico/pagina-maestra/encabezado/encabezado.component";
import { PiePaginaComponent } from "./publico/pagina-maestra/pie-pagina/pie-pagina.component";
import { initFlowbite } from 'flowbite';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NativeDateModule } from '@angular/material/core';
import { NgxCaptchaModule } from 'ngx-captcha'; // Import the NgxCaptchaModule from its correct location

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
      NgxCaptchaModule
    ],
})
export class AppComponent implements OnInit {
  title = 'web-app';

  ngOnInit(): void {
    initFlowbite();
    this.applyTheme();
  }

  darkMode = signal<boolean>(
    JSON.parse(window.localStorage.getItem('darkMode') ?? 'false')
  );
  
  constructor() {
    effect(() => {
      const darkModeValue = this.darkMode();
      if (darkModeValue) {
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
      }
    });
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

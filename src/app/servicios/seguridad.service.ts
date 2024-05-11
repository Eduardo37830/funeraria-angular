import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClienteModel } from '../modelos/cliente.model';
import { HttpClient } from '@angular/common/http';
import { ConfiguracionRutasBackend } from '../config/configuracion.rutas.backend';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {
  urlSeguridad = ConfiguracionRutasBackend.urlSeguridad;
  constructor(private http: HttpClient ) { }

  IndentificarUsuario(usuario: string, clave: string): Observable<ClienteModel> {
    return this.http.post<ClienteModel>(`${this.urlSeguridad}identificar-usuario`, {
      correo: usuario, 
      clave: clave });
  }
}

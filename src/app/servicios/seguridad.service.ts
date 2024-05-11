import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ConfiguracionRutasBackend } from '../config/configuracion.rutas.backend';
import { UsuarioModel } from '../modelos/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {
  urlSeguridad = ConfiguracionRutasBackend.urlSeguridad;
  constructor(private http: HttpClient ) { }

  /**
   * Identificar usuario
   * @param usuario 
   * @param clave 
   * @returns datos del usuario validado
   */
  IndentificarUsuario(usuario: string, clave: string): Observable<UsuarioModel> {
    return this.http.post<UsuarioModel>(`${this.urlSeguridad}identificar-usuario`, {
      correo: usuario, 
      clave: clave });
  }

  /**
   * Almacenar datos del usuario identificado
   * @param datos datos del usuario
   */
  AlmacenarDatosUsuarioIdentificado(datos: UsuarioModel): boolean {
    let cadena = JSON.stringify(datos);
    let datosLS = localStorage.getItem('datos-usuario');
    if (datosLS) {
      return false;
    } else {
      localStorage.setItem('datos-usuario', cadena);
      return true;
    }
  }

  /**
   * Busca datos del usuario en el local storage
   * @returns datos del usuario
   */
  ObtenerDatosUsuarioLS(): UsuarioModel | null {
    let datos = localStorage.getItem('datos-usuario');
    if (datos) {
      return JSON.parse(datos);
    } else {
      return null;
    }
  }

  /**
   * Validar codigo 2fa
   * @param idUsuario 
   * @param codigo 
   * @returns 
   */
    ValidarCodigo2FA(idUsuario: string, codigo: string): Observable<object> {
      return this.http.post<object>(`${this.urlSeguridad}verificar-2fa`, {
        usuarioId: idUsuario, 
        codigo2fa: codigo });
    }
}

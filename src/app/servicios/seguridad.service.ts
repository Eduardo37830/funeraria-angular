import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ConfiguracionRutasBackend } from '../config/configuracion.rutas.backend';
import { UsuarioModel } from '../modelos/usuario.model';
import { UsuarioValidadoModel } from '../modelos/usuario.validado.model';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {
  urlSeguridad = ConfiguracionRutasBackend.urlSeguridad;
  constructor(private http: HttpClient ) {
    this.validacionSesion();
  }

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
    ValidarCodigo2FA(idUsuario: string, codigo: string): Observable<UsuarioValidadoModel> {
      return this.http.post<UsuarioValidadoModel>(`${this.urlSeguridad}verificar-2fa`, {
        usuarioId: idUsuario, 
        codigo2fa: codigo });
    }

    /**
     * Almacenar datos del usuario validado
     * @param datos 
     */
    AlmacenarDatosUsuarioValidado(datos: UsuarioValidadoModel): boolean {
      let datosLS = localStorage.getItem('datos-sesion');
      if (datosLS) {
        return false;
      } else {
        let cadena = JSON.stringify(datos);
        localStorage.setItem('datos-usuario-validado', cadena);
        return true;
      }
    }

    datosUsuarioValidado = new BehaviorSubject<UsuarioValidadoModel>(new UsuarioValidadoModel());

    /**
     * Administración de la sesión de usuario
     * @returns 
     */
    ObtenerDatosSesion(): Observable<UsuarioValidadoModel> {
      return this.datosUsuarioValidado.asObservable();
    }

    validacionSesion() {
      let ls = localStorage.getItem('datos-sesion');
      if (ls) {
        let objUsuario = JSON.parse(ls);
        this.ActualizarComportamientoUsuario(objUsuario);
      }
    }

    ActualizarComportamientoUsuario(datos: UsuarioValidadoModel) {
      return this.datosUsuarioValidado.next(datos);
    }
}

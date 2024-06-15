import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ConfiguracionRutasBackend } from '../config/configuracion.rutas.backend';
import { UsuarioModel } from '../modelos/usuario.model';
import { UsuarioValidadoModel } from '../modelos/usuario.validado.model';
import { PqrsModel } from '../modelos/pqrs.model';
import { ClienteModel } from '../modelos/cliente.model';

@Injectable({
  providedIn: 'root'
  
})
export class SeguridadService {
  private baseUrl = 'http://localhost:3010';
  urlSeguridad = ConfiguracionRutasBackend.urlSeguridad;
  urlLogicaNegocio = ConfiguracionRutasBackend.urlNegocio;
  captchaSiteKey = ConfiguracionRutasBackend.cllaveCaptcha;
  private datosUsuarioValidado = new BehaviorSubject<UsuarioValidadoModel | null>(null);

  constructor(private http: HttpClient) {
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
      clave: clave 
    });
  }

  /**
   * Almacenar datos del usuario identificado
   * @param datos datos del usuario
   */
  AlmacenarDatosUsuarioIdentificado(datos: UsuarioModel): boolean {
    try {
      let cadena = JSON.stringify(datos);
      localStorage.setItem('datos-usuario', cadena);
      return true;
    } catch (e) {
      console.error("Error al almacenar los datos del usuario:", e);
      return false;
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
      codigo2fa: codigo 
    });
  }

  /**
   * Almacenar datos del usuario validado
   * @param datos 
   */
  AlmacenarDatosUsuarioValidado(datos: UsuarioValidadoModel): boolean {
    let datosLS = localStorage.getItem('datos-usuario-validado');
    if (datosLS) {
      return false;
    } else {
      let cadena = JSON.stringify(datos);
      localStorage.setItem('datos-usuario-validado', cadena);
      this.ActualizarComportamientoUsuario(datos); // Actualiza el BehaviorSubject
      return true;
    }
  }

  /**
   * Administración de la sesión de usuario
   * @returns 
   */
  ObtenerDatosSesion(): Observable<UsuarioValidadoModel | null> {
    return this.datosUsuarioValidado.asObservable();
  }

  private validacionSesion() {
    let ls = localStorage.getItem('datos-usuario-validado');
    if (ls) {
      let objUsuario: UsuarioValidadoModel = JSON.parse(ls);
      this.ActualizarComportamientoUsuario(objUsuario);
    }
  }

  private ActualizarComportamientoUsuario(datos: UsuarioValidadoModel) {
    this.datosUsuarioValidado.next(datos);
  }

  /**
   * Remover datos del usuario validado
   */
  RemoverDatosUsuarioValidado() {
    let datosUsuario = localStorage.getItem("datos-usuario");
    let datosSesion = localStorage.getItem("datos-usuario-validado");
    if (datosUsuario) {
      localStorage.removeItem("datos-usuario");
    }
    if (datosSesion) {
      localStorage.removeItem("datos-usuario-validado");
    }
    localStorage.removeItem("menu-lateral");
    this.ActualizarComportamientoUsuario(new UsuarioValidadoModel());
  }

  /**
   * Obtener nombre del usuario
   * @returns 
   */
  ObtenerNombreUsuario(): string {
    let datos = localStorage.getItem('datos-usuario-validado');
    if (datos) {
      let usuario: UsuarioValidadoModel = JSON.parse(datos);
      let nombre = usuario.user?.primerNombre + " " + usuario.user?.primerApellido;
      return nombre;
    } else {
      return "";
    }
  }

  /**
   * Obtener imagen del usuario
   * @returns 
   */
  ObtenerImagenUsuario(): string {
    let datos = localStorage.getItem('datos-usuario-validado');
    if (datos) {
      let usuario: UsuarioValidadoModel = JSON.parse(datos);
      return usuario.user?.foto || "";
    } else {
      return "";
    }
  }


  /**
   * Recuperar clave por usuario
   * @param usuario 
   * @returns 
   */
  RecuperarClavePorUsuario(usuario: string): Observable<UsuarioModel> {
    return this.http.post<UsuarioModel>(`${this.urlSeguridad}recuperar-clave`, {
      correo: usuario
    });
  }

  RegistrarUsuarioPublico(datos: any): Observable<UsuarioModel> {
    return this.http.post<UsuarioModel>(`${this.urlSeguridad}usuario-publico`, datos);
  }

  RegistrarUsuarioPublicoLogicaNegocio(datos: any): Observable<UsuarioModel> {
    return this.http.post<UsuarioModel>(`${this.urlLogicaNegocio}cliente-publico`, datos);
  }

  ValidarHashUsuarioPublico(hash: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.urlSeguridad}validar-hash-usuario`, {
      codigoHash: hash
    });
  }

  EnviarPQRS(datos: any): Observable<PqrsModel> {
    return this.http.post<PqrsModel>(`${this.urlLogicaNegocio}generar-pqrs`, datos);
  }

  CambiarClave(datos: any): Observable<UsuarioModel> {
    return this.http.post<UsuarioModel>(`${this.urlSeguridad}cambio-clave`, datos);
  }

  ObtenerTokenLocalStorage():string {
    let ls = localStorage.getItem("datos-sesion");
    if (ls) {
      let usuario: UsuarioValidadoModel = JSON.parse(ls);
      return usuario.token!;
    } else {
      return "";
    }
  }

  /* Obtener los datos de logica de negocio con el id de usuario model */
  ObtenerDatosUsuarioCliente(idUsuario: string): Observable<ClienteModel> {
    console.log(`${this.urlLogicaNegocio}cliente-por-idseguridad/${idUsuario}`);
    return this.http.get<ClienteModel>(`${this.urlLogicaNegocio}cliente-por-idseguridad/${idUsuario}`);
  }

/* crea una funcion que almacene los datos que se le manden en el local storage */

AlmacenarDatosChat(codigo: string, usuario: string): boolean {
  try {
    let datosChat = { codigo, usuario };
    let cadena = JSON.stringify(datosChat);
    localStorage.setItem('datos-chat', cadena);
    return true;
  } catch (e) {
    console.error("Error al almacenar los datos del chat:", e);
    return false;
  }
}

ObtenerDatosChat(): { codigo: string, usuario: string } | null {
  let datos = localStorage.getItem('datos-chat');
  if (datos) {
    return JSON.parse(datos);
  } else {
    return null;
  }
}

VerificarSalaChat(codigo: string): Observable<{ exists: boolean }> {
  console.log(this.baseUrl);
  return this.http.get<{ exists: boolean }>(`${this.baseUrl}/check-chat-room/${codigo}`);
}



}

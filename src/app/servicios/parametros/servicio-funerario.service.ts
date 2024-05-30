import { Injectable } from '@angular/core';
import { ConfiguracionRutasBackend } from '../../config/configuracion.rutas.backend';
import { HttpClient } from '@angular/common/http';
import { ServicioFunerarioModel } from '../../modelos/ServicoFunerario.model';
import { Observable } from 'rxjs';
import { ConfiguracionPaginacion } from '../../config/configuracion.paginacion';
import { solicitudModel } from '../../modelos/solicitudServicioFunerario.model';

@Injectable({
  providedIn: 'root'
})
export class ServicioFunerarioService {
  urlBase: string = ConfiguracionRutasBackend.urlNegocio;

  constructor(
    private http: HttpClient
  ) { } 

  AgregarRegistro(registro: ServicioFunerarioModel): Observable<ServicioFunerarioModel> {
    return this.http.post<ServicioFunerarioModel>(`${this.urlBase}servicio-fenerario`, registro);
  }

  /**
   * Listar registros
   * @returns lista de registros
   */
  listarRegistros(id: number): Observable<solicitudModel> {
    return this.http.get<solicitudModel>(`${this.urlBase}solicitud-servicio-funerario/${id}`);
  }
}

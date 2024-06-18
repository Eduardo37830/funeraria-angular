import { Injectable } from '@angular/core';
import { ConfiguracionRutasBackend } from '../../config/configuracion.rutas.backend';
import { HttpClient } from '@angular/common/http';
import { ServicioFunerarioModel } from '../../modelos/ServicoFunerario.model';
import { Observable } from 'rxjs';
import { ConfiguracionPaginacion } from '../../config/configuracion.paginacion';
import { solicitudModel } from '../../modelos/solicitudServicioFunerario.model';
import { SalaModel } from '../../modelos/sala.model';

@Injectable({
  providedIn: 'root'
})
export class ServicioFunerarioService {
  urlBase: string = ConfiguracionRutasBackend.urlNegocio;

  constructor(
    private http: HttpClient
  ) { } 

  AgregarRegistro(registro: ServicioFunerarioModel): Observable<ServicioFunerarioModel> {
    return this.http.post<ServicioFunerarioModel>(`${this.urlBase}servicio-funerario`, registro);
  }

  listarRegistro(): Observable<ServicioFunerarioModel[]> {
    return this.http.get<ServicioFunerarioModel[]>(`${this.urlBase}servicio-funerario?filter={"limit":1,"order":"fecha DESC"}`);
  }

  /**
   * Listar registros
   * @returns lista de registros
   */
  listarRegistros(id: number): Observable<solicitudModel> {
    return this.http.get<solicitudModel>(`${this.urlBase}solicitud-servicio-funerario/${id}`);
  }

  listarSalasDisponibles(): Observable<SalaModel[]> {
    return this.http.get<SalaModel[]>(`${this.urlBase}salas-disponibles`);
  }
}

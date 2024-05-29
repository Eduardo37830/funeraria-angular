import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginadorSolicitudModel } from '../../modelos/paginador.solicitud.model';
import { ConfiguracionPaginacion } from '../../config/configuracion.paginacion';
import { solicitudModel } from '../../modelos/solicitudServicioFunerario.model';
import { HttpClient } from '@angular/common/http';
import { ClienteModel } from '../../modelos/cliente.model';
import { ConfiguracionRutasBackend } from '../../config/configuracion.rutas.backend';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  urlBase: string = ConfiguracionRutasBackend.urlNegocio;
  clientes: ClienteModel[] = [];

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Listar registros
   * @returns lista de registros
   */
  listarRegistros(): Observable<solicitudModel[]> {
    return this.http.get<solicitudModel[]>(`${this.urlBase}sede?filter={"limit":${ConfiguracionPaginacion.registroPorPagina}}`);
  }

  /**
   * listar registros paginados
   * @param pag recibe el número de página
   * @returns lista de registros paginados
   */
  listarRegistrosPaginados(pag: number): Observable<PaginadorSolicitudModel> {
    let limit = ConfiguracionPaginacion.registroPorPagina;
    let skip = (pag - 1) * limit;
    return this.http.get<PaginadorSolicitudModel>(`${this.urlBase}sede-paginado?filter={"limit": ${limit}, "skip": ${skip}, "order": "id ASC"}`);
  }  

  AgregarRegistro(registro: solicitudModel): Observable<solicitudModel> {
    return this.http.post<solicitudModel>(`${this.urlBase}solicitud-servicios`, registro);
  }

  EditarRegistro(registro: solicitudModel): Observable<solicitudModel> {
    return this.http.put<solicitudModel>(`${this.urlBase}sede/${registro.id}`, registro);
  }

  BuscarRegistro(id: number): Observable<solicitudModel> {
    return this.http.get<solicitudModel>(`${this.urlBase}sede/${id}`);
  }

  EliminarRegistro(id: number): Observable<any> {
    return this.http.delete<any>(`${this.urlBase}sede/${id}`);
  }

  listarRegistrosPaginados2(pag: number): Observable<PaginadorSolicitudModel> {
    let id = this.BuscarRegistro(1)
    let limit = ConfiguracionPaginacion.registroPorPagina;
    let skip = (pag - 1) * limit;
    return this.http.get<PaginadorSolicitudModel>(`${this.urlBase}sedes/${id}/salas?filter={"limit": ${limit}, "skip": ${skip}, "order": "id DESC"}`);
  } 

  listarSedesSalas(sedeId: number): Observable<solicitudModel[]> {
    console.log(sedeId);
    return this.http.get<solicitudModel[]>(`${this.urlBase}/sedes/${sedeId}/salas`)
  } 

  getSalas(sedeId: number): void {
    this.http.get<solicitudModel[]>(`${this.urlBase}/sedes/${sedeId}/salas`)
      .subscribe(
        clientes => {
          this.clientes = clientes;
          console.log(this.clientes); // Puedes verificar los datos en la consola
        },
        error => {
          console.error('Error al obtener las salas:', error);
        }
      );
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginadorSolicitudModel } from '../../modelos/paginador.solicitud.model';
import { ConfiguracionPaginacion } from '../../config/configuracion.paginacion';
import { solicitudModel } from '../../modelos/solicitudServicioFunerario.model';
import { HttpClient } from '@angular/common/http';
import { ClienteModel } from '../../modelos/cliente.model';
import { ConfiguracionRutasBackend } from '../../config/configuracion.rutas.backend';
import { BeneficiarioModel } from '../../modelos/beneficiario.model';

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
  listarRegistros(id: number): Observable<solicitudModel[]> {
    return this.http.get<solicitudModel[]>(`${this.urlBase}clientes/${id}/solicitud-servicio-funerarios?filter={"limit":1,"order":"fechaSolicitud DESC"}`);
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
    return this.http.put<solicitudModel>(`${this.urlBase}solicitud-servicio-funerario/${registro.id}`, registro);
  }

  BuscarRegistro(id: number): Observable<solicitudModel> {
    return this.http.get<solicitudModel>(`${this.urlBase}solicitud-servicio-funerario/${id}`);
  }

  EliminarRegistro(id: number): Observable<any> {
    return this.http.delete<any>(`${this.urlBase}solicitud-servicio-funerario/${id}`);
  }

  listarRegistrosPaginados2(pag: number): Observable<PaginadorSolicitudModel> {
    let id = this.BuscarRegistro(1)
    let limit = ConfiguracionPaginacion.registroPorPagina;
    let skip = (pag - 1) * limit;
    return this.http.get<PaginadorSolicitudModel>(`${this.urlBase}solicitud-servicio-funerarios/${id}/salas?filter={"limit": ${limit}, "skip": ${skip}, "order": "id DESC"}`);
  } 

  listarSedesSalas(id: number): Observable<solicitudModel[]> {
    console.log(id);
    return this.http.get<solicitudModel[]>(`${this.urlBase}/solicitud-servicio-funerarios/${id}/clientes`)
  } 


  listarBeneficiariosCliente(idCliente: number): Observable<BeneficiarioModel[]> {
    return this.http.get<BeneficiarioModel[]>(`${this.urlBase}clientes/${idCliente}/beneficiarios`);
  }
}

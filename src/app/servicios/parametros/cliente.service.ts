import { Injectable } from '@angular/core';
import { ConfiguracionRutasBackend } from '../../config/configuracion.rutas.backend';
import { HttpClient } from '@angular/common/http';
import { ClienteModel } from '../../modelos/cliente.model';
import { Observable } from 'rxjs';
import { ConfiguracionPaginacion } from '../../config/configuracion.paginacion';
import { PaginadorClienteModel } from '../../modelos/paginador.cliente.model';
import { ArchivoModel } from '../../modelos/archivo.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  urlBase: string = ConfiguracionRutasBackend.urlNegocio;

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Listar registros
   * @returns lista de registros
   */
  listarRegistros(): Observable<ClienteModel[]> {
    return this.http.get<ClienteModel[]>(`${this.urlBase}cliente?filter={"limit":${ConfiguracionPaginacion.registroPorPagina}}`);
  }

  /**
   * listar registros paginados
   * @param pag recibe el número de página
   * @returns lista de registros paginados
   */
  listarRegistrosPaginados(pag: number): Observable<PaginadorClienteModel> {
    let limit = ConfiguracionPaginacion.registroPorPagina;
    let skip = (pag - 1) * limit;
    return this.http.get<PaginadorClienteModel>(`${this.urlBase}cliente-paginado?filter={"limit": ${limit}, "skip": ${skip}, "order": "id ASC"}`);
  }  

  AgregarRegistro(registro: ClienteModel): Observable<ClienteModel> {
    return this.http.post<ClienteModel>(`${this.urlBase}cliente`, registro);
  }

  EditarRegistro(registro: ClienteModel): Observable<ClienteModel> {
    return this.http.put<ClienteModel>(`${this.urlBase}cliente/${registro.id}`, registro);
  }

  BuscarRegistro(id: number): Observable<ClienteModel> {
    return this.http.get<ClienteModel>(`${this.urlBase}cliente/${id}`);
  }

  EliminarRegistro(id: number): Observable<any> {
    return this.http.delete<any>(`${this.urlBase}cliente/${id}`);
  }

  CargarArchivo(formData: FormData): Observable<ArchivoModel> {
    return this.http.post<ArchivoModel>(`${this.urlBase}cargar-archivo-cliente`, formData);
  }
}

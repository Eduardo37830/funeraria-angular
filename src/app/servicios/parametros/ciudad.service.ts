import { Injectable } from '@angular/core';
import { ConfiguracionRutasBackend } from '../../config/configuracion.rutas.backend';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CiudadModel } from '../../modelos/ciudad.model';
import { ConfiguracionPaginacion } from '../../config/configuracion.paginacion';
import { PaginadorCiudadModel } from '../../modelos/paginador.ciudad';

@Injectable({
  providedIn: 'root'
})
export class CiudadService {
  urlBase: string = ConfiguracionRutasBackend.urlNegocio;

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Listar registros
   * @returns lista de registros
   */
  listarRegistros(): Observable<CiudadModel[]> {
    return this.http.get<CiudadModel[]>(`${this.urlBase}Ciudad?filter={"limit":${ConfiguracionPaginacion.registroPorPagina}}`);
  }

  /**
   * listar registros paginados
   * @param pag recibe el número de página
   * @returns lista de registros paginados
   */
  listarRegistrosPaginados(pag: number): Observable<PaginadorCiudadModel> {
    let limit = ConfiguracionPaginacion.registroPorPagina;
    let skip = (pag - 1) * limit;
    return this.http.get<PaginadorCiudadModel>(`${this.urlBase}ciudad-paginado?filter={"limit": ${limit}, "skip": ${skip}, "order": "id ASC"}`);
  }  

  AgregarRegistro(registro: CiudadModel): Observable<CiudadModel> {
    return this.http.post<CiudadModel>(`${this.urlBase}ciudad`, registro);
  }

  EditarRegistro(registro: CiudadModel): Observable<CiudadModel> {
    return this.http.put<CiudadModel>(`${this.urlBase}ciudad/${registro.id}`, registro);
  }

  BuscarRegistro(id: number): Observable<CiudadModel> {
    return this.http.get<CiudadModel>(`${this.urlBase}ciudad/${id}`);
  }

  EliminarRegistro(id: number): Observable<any> {
    return this.http.delete<any>(`${this.urlBase}ciudad/${id}`);
  }
}
import { Injectable } from '@angular/core';
import { ConfiguracionRutasBackend } from '../../config/configuracion.rutas.backend';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfiguracionPaginacion } from '../../config/configuracion.paginacion';
import { PaginadorDepartamentoModel } from '../../modelos/paginador.departamento';
import { DepartamentoModel } from '../../modelos/departamento.model';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {
  urlBase: string = ConfiguracionRutasBackend.urlNegocio;

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Listar registros
   * @returns lista de registros
   */
  listarRegistros(): Observable<DepartamentoModel[]> {
    return this.http.get<DepartamentoModel[]>(`${this.urlBase}departamento}`);
  }

  /**
   * listar registros paginados
   * @param pag recibe el número de página
   * @returns lista de registros paginados
   */
  listarRegistrosPaginados(pag: number): Observable<PaginadorDepartamentoModel> {
    let limit = ConfiguracionPaginacion.registroPorPagina;
    let skip = (pag - 1) * limit;
    return this.http.get<PaginadorDepartamentoModel>(`${this.urlBase}departamento-paginado?filter={"limit": ${limit}, "skip": ${skip}, "order": "id ASC"}`);
  }  

  AgregarRegistro(registro: DepartamentoModel): Observable<DepartamentoModel> {
    return this.http.post<DepartamentoModel>(`${this.urlBase}departamento`, registro);
  }

  EditarRegistro(registro: DepartamentoModel): Observable<DepartamentoModel> {
    return this.http.put<DepartamentoModel>(`${this.urlBase}departamento/${registro.id}`, registro);
  }

  BuscarRegistro(id: number): Observable<DepartamentoModel> {
    return this.http.get<DepartamentoModel>(`${this.urlBase}departamento/${id}`);
  }

  EliminarRegistro(id: number): Observable<any> {
    return this.http.delete<any>(`${this.urlBase}departamento/${id}`);
  }
}

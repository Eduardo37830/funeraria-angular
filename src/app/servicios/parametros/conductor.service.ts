import { Injectable } from '@angular/core';
import { ConfiguracionRutasBackend } from '../../config/configuracion.rutas.backend';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfiguracionPaginacion } from '../../config/configuracion.paginacion';
import { ConductorModel } from '../../modelos/conductor.model';
import { PaginadorConductorModel } from '../../modelos/paginador.conductor.model';
import { ArchivoModel } from '../../modelos/archivo.model';

@Injectable({
  providedIn: 'root'
})
export class ConductorService {
  urlBase: string = ConfiguracionRutasBackend.urlNegocio;

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Listar registros
   * @returns lista de registros
   */
  listarRegistros(): Observable<ConductorModel[]> {
    return this.http.get<ConductorModel[]>(`${this.urlBase}conductor?filter={"limit":${ConfiguracionPaginacion.registroPorPagina}}`);
  }

  /**
   * listar registros paginados
   * @param pag recibe el número de página
   * @returns lista de registros paginados
   */
  listarRegistrosPaginados(pag: number): Observable<PaginadorConductorModel> {
    let limit = ConfiguracionPaginacion.registroPorPagina;
    let skip = (pag - 1) * limit;
    return this.http.get<PaginadorConductorModel>(`${this.urlBase}conductor-paginado?filter={"limit": ${limit}, "skip": ${skip}, "order": "id ASC"}`);
  }  

  AgregarRegistro(registro: ConductorModel): Observable<ConductorModel> {
    return this.http.post<ConductorModel>(`${this.urlBase}conductor`, registro);
  }

  EditarRegistro(registro: ConductorModel): Observable<ConductorModel> {
    return this.http.put<ConductorModel>(`${this.urlBase}conductor/${registro.id}`, registro);
  }

  BuscarRegistro(id: number): Observable<ConductorModel> {
    return this.http.get<ConductorModel>(`${this.urlBase}conductor/${id}`);
  }

  EliminarRegistro(id: number): Observable<any> {
    return this.http.delete<any>(`${this.urlBase}conductor/${id}`);
  }

  CargarArchivo(formData: FormData): Observable<ArchivoModel> {
    return this.http.post<ArchivoModel>(`${this.urlBase}cargar-archivo-conductor`, formData);
  }
}

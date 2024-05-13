import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfiguracionRutasBackend } from '../../config/configuracion.rutas.backend';
import { Observable } from 'rxjs';
import { PaginadorSalaModel } from '../../modelos/paginador.sala.model';
import { ConfiguracionPaginacion } from '../../config/configuracion.paginacion';
import { SalaModel } from '../../modelos/sala.model';

@Injectable({
  providedIn: 'root'
})
export class SalaService {
  urlBase: string = ConfiguracionRutasBackend.urlNegocio;

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Listar registros
   * @returns lista de registros
   */
  listarRegistros(): Observable<SalaModel[]> {
    return this.http.get<SalaModel[]>(`${this.urlBase}sala?filter={"limit":${ConfiguracionPaginacion.registroPorPagina}}`);
  }

  /**
   * listar registros paginados
   * @param pag recibe el número de página
   * @returns lista de registros paginados
   */
  listarRegistrosPaginados(pag: number): Observable<PaginadorSalaModel> {
    let limit = ConfiguracionPaginacion.registroPorPagina;
    let skip = (pag - 1) * limit;
    return this.http.get<PaginadorSalaModel>(`${this.urlBase}sala-paginado?filter={"limit": ${limit}, "skip": ${skip}, "order": "id ASC"}`);
  }  

  listarRegistrosPaginados2(sedeId: SalaModel): Observable<SalaModel> {
    return this.http.get<SalaModel>(`${this.urlBase}sedes/${sedeId}/salas?filter={"limit":${ConfiguracionPaginacion.registroPorPagina}}`);
  }  

  AgregarRegistro(registro: SalaModel): Observable<SalaModel> {
    return this.http.post<SalaModel>(`${this.urlBase}sala`, registro);
  }

  EditarRegistro(registro: SalaModel): Observable<SalaModel> {
    return this.http.put<SalaModel>(`${this.urlBase}sala/${registro.id}`, registro);
  }

  BuscarRegistro(id: number): Observable<SalaModel> {
    return this.http.get<SalaModel>(`${this.urlBase}sala/${id}`);
  }

  EliminarRegistro(id: number): Observable<any> {
    return this.http.delete<any>(`${this.urlBase}sala/${id}`);
  }
}

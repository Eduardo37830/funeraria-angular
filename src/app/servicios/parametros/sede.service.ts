import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfiguracionRutasBackend } from '../../config/configuracion.rutas.backend';
import { Observable } from 'rxjs';
import { SedeModel } from '../../modelos/sede.model';
import { ConfiguracionPaginacion } from '../../config/configuracion.paginacion';
import { PaginadorSedeModel } from '../../modelos/paginador.sede.model';
import { SalaModel } from '../../modelos/sala.model';

@Injectable({
  providedIn: 'root'
})
export class SedeService {
  urlBase: string = ConfiguracionRutasBackend.urlNegocio;
  salas: SalaModel[] = [];

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Listar registros
   * @returns lista de registros
   */
  listarRegistros(): Observable<SedeModel[]> {
    return this.http.get<SedeModel[]>(`${this.urlBase}sede?filter={"limit":${ConfiguracionPaginacion.registroPorPagina}}`);
  }

  /**
   * listar registros paginados
   * @param pag recibe el número de página
   * @returns lista de registros paginados
   */
  listarRegistrosPaginados(pag: number): Observable<PaginadorSedeModel> {
    let limit = ConfiguracionPaginacion.registroPorPagina;
    let skip = (pag - 1) * limit;
    return this.http.get<PaginadorSedeModel>(`${this.urlBase}sede-paginado?filter={"limit": ${limit}, "skip": ${skip}, "order": "id ASC"}`);
  }  

  AgregarRegistro(registro: SedeModel): Observable<SedeModel> {
    return this.http.post<SedeModel>(`${this.urlBase}sede`, registro);
  }

  EditarRegistro(registro: SedeModel): Observable<SedeModel> {
    return this.http.put<SedeModel>(`${this.urlBase}sede/${registro.id}`, registro);
  }

  BuscarRegistro(id: number): Observable<SedeModel> {
    return this.http.get<SedeModel>(`${this.urlBase}sede/${id}`);
  }

  EliminarRegistro(id: number): Observable<any> {
    return this.http.delete<any>(`${this.urlBase}sede/${id}`);
  }

  listarRegistrosPaginados2(pag: number): Observable<PaginadorSedeModel> {
    let id = this.BuscarRegistro(1)
    let limit = ConfiguracionPaginacion.registroPorPagina;
    let skip = (pag - 1) * limit;
    return this.http.get<PaginadorSedeModel>(`${this.urlBase}sedes/${id}/salas?filter={"limit": ${limit}, "skip": ${skip}, "order": "id DESC"}`);
  } 

  listarSedesSalas(sedeId: number): Observable<SedeModel[]> {
    console.log(sedeId);
    return this.http.get<SedeModel[]>(`${this.urlBase}/sedes/${sedeId}/salas`)
  } 

  getSalas(sedeId: number): void {
    this.http.get<SedeModel[]>(`${this.urlBase}/sedes/${sedeId}/salas`)
      .subscribe(
        salas => {
          this.salas = salas;
          console.log(this.salas); // Puedes verificar los datos en la consola
        },
        error => {
          console.error('Error al obtener las salas:', error);
        }
      );
  }
}

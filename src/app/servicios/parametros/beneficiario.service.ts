import { Injectable } from '@angular/core';
import { BeneficiarioModel } from '../../modelos/beneficiario.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ConfiguracionRutasBackend } from '../../config/configuracion.rutas.backend';
import { ConfiguracionPaginacion } from '../../config/configuracion.paginacion';
import { ArchivoModel } from '../../modelos/archivo.model';
import { PaginadorBeneficiarioModel } from '../../modelos/paginador.beneficiario.model';

@Injectable({
  providedIn: 'root'
})
export class BeneficiarioService {
  urlBase: string = ConfiguracionRutasBackend.urlNegocio;

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Listar registros
   * @returns lista de registros
   */
  listarRegistros(): Observable<BeneficiarioModel[]> {
    return this.http.get<BeneficiarioModel[]>(`${this.urlBase}beneficiario?filter={"limit":${ConfiguracionPaginacion.registroPorPagina}}`);
  }

  /**
   * listar registros paginados
   * @param pag recibe el número de página
   * @returns lista de registros paginados
   */
  listarRegistrosPaginados(pag: number): Observable<PaginadorBeneficiarioModel> {
    let limit = ConfiguracionPaginacion.registroPorPagina;
    let skip = (pag - 1) * limit;
    return this.http.get<PaginadorBeneficiarioModel>(`${this.urlBase}beneficiario-paginado?filter={"limit": ${limit}, "skip": ${skip}, "order": "id ASC"}`);
  }  

  AgregarRegistro(registro: BeneficiarioModel): Observable<BeneficiarioModel> {
    return this.http.post<BeneficiarioModel>(`${this.urlBase}beneficiario`, registro);
  }

  EditarRegistro(registro: BeneficiarioModel): Observable<BeneficiarioModel> {
    return this.http.put<BeneficiarioModel>(`${this.urlBase}beneficiario/${registro.id}`, registro);
  }

  BuscarRegistro(id: number): Observable<BeneficiarioModel> {
    return this.http.get<BeneficiarioModel>(`${this.urlBase}beneficiario/${id}`);
  }

  EliminarRegistro(id: number): Observable<any> {
    return this.http.delete<any>(`${this.urlBase}beneficiario/${id}`);
  }

  CargarArchivo(formData: FormData): Observable<ArchivoModel> {
    return this.http.post<ArchivoModel>(`${this.urlBase}cargar-archivo-beneficiario`, formData);
  }
}

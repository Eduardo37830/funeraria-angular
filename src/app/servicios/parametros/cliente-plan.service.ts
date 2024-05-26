import { Injectable } from '@angular/core';
import { ClientePlanModel } from '../../modelos/clientePlan.model';
import { Observable } from 'rxjs';
import { PaginadorClientePlanModel } from '../../modelos/paginador.clientePlan.model';
import { ConfiguracionPaginacion } from '../../config/configuracion.paginacion';
import { HttpClient } from '@angular/common/http';
import { ConfiguracionRutasBackend } from '../../config/configuracion.rutas.backend';

@Injectable({
  providedIn: 'root'
})
export class ClientePlanService {
  urlBase: string = ConfiguracionRutasBackend.urlNegocio;

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Listar registros
   * @returns lista de registros
   */
  listarRegistros(): Observable<ClientePlanModel[]> {
    return this.http.get<ClientePlanModel[]>(`${this.urlBase}plan`);
  }

  /**
   * listar registros paginados
   * @param pag recibe el número de página
   * @returns lista de registros paginados
   */
  listarRegistrosPaginados(pag: number): Observable<PaginadorClientePlanModel> {
    let limit = ConfiguracionPaginacion.registroPorPagina;
    let skip = (pag - 1) * limit;
    return this.http.get<PaginadorClientePlanModel>(`${this.urlBase}plan-paginado?filter={"limit": ${limit}, "skip": ${skip}, "order": "id DESC"}`);
  }  

  listarPlanCliente(pag: number): Observable<PaginadorClientePlanModel> {
    let limit = ConfiguracionPaginacion.registroPorPagina;
    let skip = (pag - 1) * limit;
    return this.http.get<PaginadorClientePlanModel>(`${this.urlBase}cliente-plan-paginado?filter={"limit": ${limit}, "skip": ${skip}, "order": "id DESC"}`);
  }

  AgregarRegistro(registro: ClientePlanModel): Observable<ClientePlanModel> {
    return this.http.post<ClientePlanModel>(`${this.urlBase}adquirir-plan`, registro);
  }

  EditarRegistro(registro: ClientePlanModel): Observable<ClientePlanModel> {
    return this.http.put<ClientePlanModel>(`${this.urlBase}clientes/${registro.id}/plans`, registro);
  }

  BuscarRegistro(id: number): Observable<ClientePlanModel> {
    return this.http.get<ClientePlanModel>(`${this.urlBase}obtener-plan/${id}`);
  }

  EliminarRegistro(id: number): Observable<any> {
    return this.http.delete<any>(`${this.urlBase}eliminar-plan/${id}`);
  }

  AgregarPlan(registro: ClientePlanModel): Observable<ClientePlanModel> {
    return this.http.post<ClientePlanModel>(`${this.urlBase}adquirir-plan`, registro);
  }


  listarRegistrosPagina(id: number): Observable<any> {
    return this.http.get<ClientePlanModel>(`${this.urlBase}clientes/${id}/plans`);
  }  
}
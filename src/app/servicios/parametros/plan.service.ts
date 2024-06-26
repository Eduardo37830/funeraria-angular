import { Injectable } from '@angular/core';
import { ConfiguracionRutasBackend } from '../../config/configuracion.rutas.backend';
import { HttpClient } from '@angular/common/http';
import { PlanModel } from '../../modelos/plan.model';
import { Observable } from 'rxjs';
import { ConfiguracionPaginacion } from '../../config/configuracion.paginacion';
import { PaginadorPlanModel } from '../../modelos/paginador.plan.model';
import { ClientePlanModel } from '../../modelos/clientePlan.model';
import { PaginadorClientePlanModel } from '../../modelos/paginador.clientePlan.model';
import { ClienteModel } from '../../modelos/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class PlanService {
  urlBase: string = ConfiguracionRutasBackend.urlNegocio;

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Listar registros
   * @returns lista de registros
   */
  listarRegistros(): Observable<PlanModel[]> {
    return this.http.get<PlanModel[]>(`${this.urlBase}plan`);
  }

  /**
   * listar registros paginados
   * @param pag recibe el número de página
   * @returns lista de registros paginados
   */
  listarRegistrosPaginados(pag: number): Observable<PaginadorPlanModel> {
    let limit = ConfiguracionPaginacion.registroPorPagina;
    let skip = (pag - 1) * limit;
    return this.http.get<PaginadorPlanModel>(`${this.urlBase}plan-paginado?filter={"limit": ${limit}, "skip": ${skip}, "order": "id DESC"}`);
  }  

  listarPlanCliente(pag: number): Observable<PaginadorClientePlanModel> {
    let limit = ConfiguracionPaginacion.registroPorPagina;
    let skip = (pag - 1) * limit;
    return this.http.get<PaginadorPlanModel>(`${this.urlBase}cliente-plan-paginado`);
  }

  AgregarRegistro(registro: PlanModel): Observable<PlanModel> {
    return this.http.post<PlanModel>(`${this.urlBase}plan`, registro);
  }

  EditarRegistro(registro: PlanModel): Observable<PlanModel> {
    return this.http.put<PlanModel>(`${this.urlBase}plan/${registro.id}`, registro);
  }

  BuscarRegistro(id: number): Observable<PlanModel> {
    return this.http.get<PlanModel>(`${this.urlBase}plan/${id}`);
  }

  EliminarRegistro(id: number): Observable<any> {
    return this.http.delete<any>(`${this.urlBase}plan/${id}`);
  }

  AgregarPlan(registro: ClientePlanModel): Observable<ClientePlanModel> {
    return this.http.post<ClientePlanModel>(`${this.urlBase}adquirir-plan`, registro);
  }


  listarRegistrosPagina(id: number): Observable<any> {
    return this.http.get<any>(`${this.urlBase}plans/${id}/clientes`);
  }  
}
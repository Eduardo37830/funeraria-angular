import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfiguracionRutasBackend } from '../../config/configuracion.rutas.backend';
import { Observable } from 'rxjs';
import { ClientePlanModel } from '../../modelos/clientePlan.model';

@Injectable({
  providedIn: 'root'
})
export class PagoEpaycoService {

  BASE_URL: string = ConfiguracionRutasBackend.urlNegocio;

  private apiUrl = `${this.BASE_URL}pago-epaycos`;

  constructor(private http: HttpClient) {}

  

  createToken(): Promise<any> {
    return this.http.post<any>(`${this.BASE_URL}pago-epaycos`, {}).toPromise();
  }

  sendPaymentRequest(paymentData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'v1/payment/create', paymentData);
  }

  getOrderById(id: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}plan/${id}`);
  }

  createSession(params: any): Observable<any> {
    return this.http.post<any>(`${this.BASE_URL}pago-epayco`, params);
  }

  AgregarPlan(registro: ClientePlanModel): Observable<ClientePlanModel> {
    return this.http.post<ClientePlanModel>(`${this.BASE_URL}adquirir-plan`, registro);
  }

  EditarRegistro(registro: ClientePlanModel): Observable<ClientePlanModel> {
    return this.http.put<ClientePlanModel>(`${this.BASE_URL}modificar-plan/${registro.id}`, registro);
  }

  BuscarRegistro(id: number): Observable<ClientePlanModel> {
    return this.http.get<ClientePlanModel>(`${this.BASE_URL}obtener-plan/${id}`);
  }

  crearPago(registro: ClientePlanModel): Observable<ClientePlanModel> {
    return this.http.post<ClientePlanModel>(`${this.BASE_URL}pago-epayco`, registro);
  }

}

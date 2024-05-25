import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfiguracionRutasBackend } from '../../config/configuracion.rutas.backend';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PagoEpaycoService {

  BASE_URL: string = ConfiguracionRutasBackend.urlNegocio;

  private apiUrl = `${this.BASE_URL}pago-epaycos`;

  constructor(private http: HttpClient) {}

  crearPago(monto: number, moneda: string): Observable<any> {
    let estado = 'pendiente';
    console.log('Creando pago', monto, moneda, estado);
    return this.http.post(this.apiUrl, { monto, moneda, estado });
  }

  createToken(): Promise<any> {
    return this.http.post<any>(`${this.BASE_URL}pago-epaycos`, {}).toPromise();
  }

  sendPaymentRequest(paymentData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'v1/payment/create', paymentData);
  }
}

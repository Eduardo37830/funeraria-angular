import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { PagoEpaycoService } from '../../servicios/parametros/pago-epayco.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EpaycoModel } from '../../modelos/epayco.model';

@Component({
  selector: 'app-pago-epayco',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './pago-epayco.component.html',
  styleUrl: './pago-epayco.component.css'
})
export class PagoEpaycoComponent {
  monto: number = 0;
  moneda: string = 'COP';
  pagos: EpaycoModel[] = [];
  ePayco: any;


  constructor(
    private pagoService: PagoEpaycoService,
    private renderer: Renderer2
  ){

  }

  crearPago() {
    this.pagoService.crearPago(this.monto, this.moneda).subscribe(
      respuesta => {
        console.log('Pago exitoso', respuesta);
      },
      error => {
        console.error('Pago fallido', error);
      }
    );
  }

  @ViewChild('checkoutButton') checkoutButton!: ElementRef;

  openCheckout() {
    const date = new Date().getTime();
    const data = {
      name: "Vestido Mujer Primavera",
      description: "Vestidó Mujer Prímaverá",
      invoice: date + 126351321,
      currency: "cop",
      amount: "10",
      tax_base: "0",
      tax: "0",
      country: "co",
      lang: "es",
      split_app_id: "30085",
      split_merchant_id: "30085",
      split_type: "01",
      split_primary_receiver: "30085",
      split_primary_receiver_fee: "0",
      splitpayment: "true",
      split_rule: "multiple",
      split_receivers: [
        { "id": "19786", "total": "7", "iva": "", "base_iva": "", "fee": "3" },
        { "id": "93006", "total": "3", "iva": "", "base_iva": "", "fee": "1" }
      ],
      external: "false",
      extra1: "extra1",
      extra2: "extra2",
      extra3: "extra3",
      extra9: "test| pipe|revisar|",
      confirmation: "http://secure2.payco.co/prueba_curl.php",
      response: "http://secure2.payco.co/prueba_curl.php",
      name_billing: "Andres Perez",
      address_billing: "Carrera 19 numero 14 91",
      type_doc_billing: "cc",
      mobilephone_billing: "3050000000",
      number_doc_billing: "100000000"
    };
  }

  iniciarPago() {
    const params_transaction = {
      amount: 100,
      currency: 'COP',
      description: 'Test Payment',
      // Agrega más parámetros según sea necesario
    };

    this.pagoService.createSession(params_transaction).subscribe(
      response => {
        const sessionId = response.sessionId;
        const handler = this.ePayco.checkout.configure({
          sessionId: sessionId,
          external: false, // external: true -> para checkout externo ó External: false => para iframe onePage
        });
        //open checkout
        handler.openNew();
      },
      error => {
        console.error('Error al crear la sesión:', error);
      }
    );
  }
}

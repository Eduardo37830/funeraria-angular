import { Component, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientePlanModel } from '../../modelos/clientePlan.model';
import { PagoEpaycoService } from '../../servicios/parametros/pago-epayco.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { ConfiguracionRutasBackend } from '../../config/configuracion.rutas.backend';

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
  fGroup: FormGroup = new FormGroup({});
  planId: number | null = null;
  clienteId: number | null = null;
  recordId: number = 0;
  clientePlan: ClientePlanModel[] = [];
  Plan: ClientePlanModel | null = null;
  


  customer = {
    token_card: "toke_id",
      name: '',
      last_name: '',
      email: 'cliente.correo',
      default: true,
      //Optional parameters: These parameters are important when validating the credit card transaction
      city: '',
      address:'',
      phone: '',
      cell_phone: "3010000001"
  };

  creditCard = {
    "card[number]": "4575623182290326",
  "card[exp_year]": "2025",
  "card[exp_month]": "12",
  "card[cvc]": "123",
  "hasCvv": true
  };

  constructor(
    private servicio: PagoEpaycoService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private renderer: Renderer2
  ) { 
    this.route.params.subscribe(params => {
      this.clienteId = +params['ids'];
      this.recordId = +params['id'];
    });
  }

  ngOnInit() {
    this.ContruirFormularioDatos();
    console.log(this.ContruirFormularioDatos())
    this.BuscarRegistro();
    this.loadEpaycoScript();
  }

  loadEpaycoScript() {
    const script = this.renderer.createElement('script');
    script.src = 'https://checkout.epayco.co/checkout.js';
    script.type = 'text/javascript';
    script.async = true;
    script.defer = true;
    this.renderer.setAttribute(script, 'data-epayco-key', ConfiguracionRutasBackend.next_public_epayco!.toString());
    this.renderer.setAttribute(script, 'class', 'epayco-button');
    this.renderer.setAttribute(script, 'data-epayco-amount', '5950');
    this.renderer.setAttribute(script, 'data-epayco-tax', '950');
    this.renderer.setAttribute(script, 'data-epayco-tax-base', '5000');
    this.renderer.setAttribute(script, 'data-epayco-name', 'Plan');
    this.renderer.setAttribute(script, 'data-epayco-description', 'Plan');
    this.renderer.setAttribute(script, 'data-epayco-currency', 'cop');
    this.renderer.setAttribute(script, 'data-epayco-country', 'co');
    this.renderer.setAttribute(script, 'data-epayco-test', 'true');
    this.renderer.setAttribute(script, 'data-epayco-external', 'true');
    this.renderer.setAttribute(script, 'data-epayco-button', 'https://multimedia.epayco.co/dashboard/btns/btn1.png');

    this.renderer.appendChild(document.body, script);
  }

  BuscarRegistro() {
    this.servicio.BuscarRegistro(this.recordId).subscribe({
      next: (data: ClientePlanModel) => {
        this.Plan = data;
        this.fGroup.patchValue(data);
      },
      error: (error: any) => {
        alert('Registro no encontrado');
      }
    });  
  }

  ContruirFormularioDatos(): void {
    this.fGroup = this.fb.group({
      id: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      detalles: ['', [Validators.required]],
      tarifa: ['', [Validators.required]],
      cantidadBeneficiarios: ['', [Validators.required]],
      fechaAdquisicion: [new Date(), [Validators.required]],
      fechaVencimiento: [''],
      activo: [],
      planId: [],
      clienteId: [this.clienteId, [Validators.required]],
      mesesAPagar: [1, [Validators.required]],
      metodoPago: [''],
    });
  }

  GuardarRegistro() {
    if (this.fGroup.invalid) {
      alert('Debe diligenciar todo el formulario');
    } else {
      let modelo = this.obtenerRegistro();

      let fechaVencimiento = new Date();
      let mesActual = fechaVencimiento.getMonth();
      let mesesAPagar = this.obtenerFgDatos['mesesAPagar'].value;
      fechaVencimiento.setMonth(mesActual + mesesAPagar);

      modelo.tarifa = parseFloat(this.obtenerFgDatos['tarifa'].value) * mesesAPagar;
      modelo.fechaVencimiento = fechaVencimiento;
      console.log(modelo);
      this.servicio.EditarRegistro(modelo).subscribe({
        next: (data: ClientePlanModel) => {
          alert('Registro guardado correctamente');
          console.log('Procesando pago...');
          setTimeout(() => {
            this.mostrarModalPagoExitoso();
            setTimeout(() => {
              this.cerrarModal();
              this.router.navigate(['planes/cliente', this.clienteId, 'mis-planes']);
            }, 3000);
          }, 2000);
        },
        error: (error) => {
          alert('Error al guardar el registro');
        }
      });
    }
  }

  obtenerRegistro(): ClientePlanModel {
    let model = new ClientePlanModel();
    model.id = parseInt(this.obtenerFgDatos['id'].value);
    model.nombre = this.obtenerFgDatos['nombre'].value;
    model.detalles = this.obtenerFgDatos['detalles'].value;
    model.tarifa = parseFloat(this.obtenerFgDatos['tarifa'].value);
    model.fechaAdquisicion = new Date();
    model.cantidadBeneficiarios = parseInt(this.obtenerFgDatos['cantidadBeneficiarios'].value);
    model.activo = true;
    model.planId = this.obtenerFgDatos['planId'].value;
    model.clienteId = this.clienteId!;
    return model;
  }

  mostrarModalPagoExitoso() {
    const modal = document.getElementById('modalPagoExitoso');
    if (modal) {
      modal.classList.remove('hidden');
    }
  }

  cerrarModal() {
    const modal = document.getElementById('modalPagoExitoso');
    if (modal) {
      modal.classList.add('hidden');
    }
  }

  get obtenerFgDatos() {
    return this.fGroup.controls;
  }

  onSubmit() {
    // Crear Cliente
    this.http.post('/api/create-customer', this.customer)
      .subscribe(customer => {
        // Generar Token de Tarjeta
        this.http.post('/api/create-token', this.creditCard)
          .subscribe(token => {
            // Crear Suscripción
            const subscriptionInfo = {
              id_plan: 'coursereact',
              customer: customer,
              token_card: token,
              doc_type: 'CC',
              doc_number: '1234567890'
            };
            this.http.post('/api/create-subscription', subscriptionInfo)
              .subscribe(subscription => {
                console.log('Suscripción creada:', subscription);
              });
          });
      });
  }

  // conectar con el servicio de pago epayco
  // https://docs.epayco.co/payments/checkout

  pagar() {
    // Implementa la lógica de pagar aquí
    console.log("pagar llamado");
    this.initEpaycoButton();
  }
  
  initEpaycoButton() {
    // Crea el contenedor del botón de ePayco
  const container = this.renderer.createElement('div');
  this.renderer.setAttribute(container, 'id', 'epaycoButtonContainer');

    let cliente1 = this.recordId;
    // Carga el script de ePayco
    const script = this.renderer.createElement('script');
    script.src = 'https://checkout.epayco.co/checkout.js';
    script.type = 'text/javascript';
    script.async = true;
    script.defer = true;
    this.renderer.setAttribute(script,'data-epayco-key', ConfiguracionRutasBackend.next_public_epayco!.toString()),
    this.renderer.setAttribute(script,'data-epayco-private-key', ConfiguracionRutasBackend.next_private_epayco!.toString()),
    this.renderer.setAttribute(script,'class','epayco-button'),
    this.renderer.setAttribute(script,'data-epayco-invoice','2100'),
    this.renderer.setAttribute(script,'data-epayco-amount', '5000'),
    this.renderer.setAttribute(script,'data-epayco-tax','0.00'),  
    this.renderer.setAttribute(script,'data-epayco-tax-ico','0.00'),               
    this.renderer.setAttribute(script,'data-epayco-tax-base','0'),
    this.renderer.setAttribute(script,'data-epayco-name','Test'), 
    this.renderer.setAttribute(script,'data-epayco-description','name'),
    this.renderer.setAttribute(script,'data-epayco-currency','cop'),    
    this.renderer.setAttribute(script,'data-epayco-country','CO'),
    this.renderer.setAttribute(script,'data-epayco-test','true'),
    this.renderer.setAttribute(script,'data-epayco-external','false'),
    this.renderer.setAttribute(script,'data-epayco-response','process.env.NEXT_PUBLIC_PAYCO_RESPONSE_URL'), 
    this.renderer.setAttribute(script,'data-epayco-confirmation','process.env.NEXT_PUBLIC_PAYCO_CONFIRMATION_URL'),
    this.renderer.setAttribute(script,'data-epayco-button','https://multimedia.epayco.co/dashboard/btns/btn1.png'),
    this.renderer.setAttribute(script,'data-epayco-methodconfirmation',"get"),
    this.renderer.setAttribute(script,'data-epayco-type-doc-billing','CC'),
    this.renderer.setAttribute(script,'data-epayco-number-doc-billing','123456789'),
    this.renderer.setAttribute(script,'data-epayco-name-billing','order.firstName'),
    this.renderer.setAttribute(script,'data-epayco-mobilephone-billing','3124567891'),
      
    document.body.appendChild(script);
    // Agrega el contenedor al cuerpo del documento
  this.renderer.appendChild(document.body, container);
  }
}
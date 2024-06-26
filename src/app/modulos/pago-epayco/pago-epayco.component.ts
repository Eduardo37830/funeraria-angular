import { Component, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientePlanModel } from '../../modelos/clientePlan.model';
import { PagoEpaycoService } from '../../servicios/parametros/pago-epayco.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { ConfiguracionRutasBackend } from '../../config/configuracion.rutas.backend';
import { environment } from '../../../environments/environment';

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
  clienteId: number | null = null;
  recordId: number = 0;
  clientePlan: ClientePlanModel | null = null;
  Plan: ClientePlanModel | null = null;
  pagoRealizado: boolean = false;
  epaycoApiKey = environment.epaycoApiKey;
  epaycoPrivateKey = environment.epaycoPrivateKey;
  paymentTimeout: any; // Variable para almacenar el temporizador de cancelación

  constructor(
    private servicio: PagoEpaycoService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private renderer: Renderer2
  ) { 
    this.route.params.subscribe(params => {
      this.clienteId = +params['ids'];
      this.recordId = +params['id'];
    });
  }

  ngOnInit() {
    this.ContruirFormularioDatos();
    this.BuscarRegistro();
  }

  BuscarRegistro() {
    this.servicio.BuscarRegistro(this.recordId).subscribe({
      next: (data: ClientePlanModel) => {
        this.clientePlan = data;
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
      descuento: [0],
      activo: [],
      planId: [],
      clienteId: [this.clienteId, [Validators.required]],
      mesesAPagar: ['', [Validators.required]],
      metodoPago: [''],
    });
  }

  GuardarRegistro() {
    if (this.fGroup.invalid) {
      alert('Debe diligenciar todo el formulario');
    } else {
      let modelo = this.obtenerRegistro();

      let fechaVencimiento = new Date(this.obtenerFgDatos['fechaVencimiento'].value);
      let mesActual = fechaVencimiento.getMonth();
      let mesesAPagar = this.obtenerFgDatos['mesesAPagar'].value;
  
      fechaVencimiento.setMonth(mesActual + parseInt(mesesAPagar));
  
      modelo.tarifa = parseFloat(this.obtenerFgDatos['tarifa'].value);
      modelo.fechaVencimiento = fechaVencimiento;

      console.log(modelo);
      this.initEpaycoButton();
      
      // Damos 30 segundos para que el usuario realice el pago
      setTimeout(() => {
        if (!this.pagoRealizado) {
          alert('El pago no se realizó en el tiempo establecido');
        } else {
          this.servicio.EditarRegistro(modelo).subscribe({
            next: (data: ClientePlanModel) => {
              alert('Registro guardado correctamente');
              this.router.navigate(['planes/cliente', this.clienteId, 'mis-planes']);
            },
            error: (error) => {
              alert('Error al guardar el registro');
            }
          });
        }
      }, 30000); // 30 segundos
      
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

  pagar() {
    this.initEpaycoButton();
  }
  
  initEpaycoButton() {
    let modelo = this.obtenerRegistro();
    let mesesAPagar = this.obtenerFgDatos['mesesAPagar'].value;
    modelo.tarifa = parseFloat(this.obtenerFgDatos['tarifa'].value);
    let pago = modelo.tarifa * mesesAPagar;
  
    // Crea el contenedor del botón de ePayco
    const container = this.renderer.createElement('div');
    this.renderer.setAttribute(container, 'id', 'epaycoButtonContainer');
  
    // Carga el script de ePayco
    const script = this.renderer.createElement('script');
    script.src = 'https://checkout.epayco.co/checkout.js';
    script.type = 'text/javascript';
    script.async = true;
    script.defer = true;
  
    // Set attributes
    this.renderer.setAttribute(script, 'data-epayco-key', this.epaycoApiKey);
    this.renderer.setAttribute(script, 'class', 'epayco-button');
    this.renderer.setAttribute(script, 'data-epayco-amount', pago.toString());
    this.renderer.setAttribute(script, 'data-epayco-tax', '0.00');
    this.renderer.setAttribute(script, 'data-epayco-tax-ico', '0.00');
    this.renderer.setAttribute(script, 'data-epayco-tax-base', '0');
    this.renderer.setAttribute(script, 'data-epayco-name', 'Test');
    this.renderer.setAttribute(script, 'data-epayco-description', this.clientePlan?.nombre?.toString()!);
    this.renderer.setAttribute(script, 'data-epayco-currency', 'cop');
    this.renderer.setAttribute(script, 'data-epayco-country', 'CO');
    this.renderer.setAttribute(script, 'data-epayco-test', 'true');
    this.renderer.setAttribute(script, 'data-epayco-external', 'false');
    this.renderer.setAttribute(script, 'data-epayco-response', 'http://localhost:4200/parametros/plan-listar/' + this.clientePlan?.planId?.toString()!);
    this.renderer.setAttribute(script, 'data-epayco-confirmation', 'http://localhost:4200/inicio');
    this.renderer.setAttribute(script, 'data-epayco-methodconfirmation', 'get');
    this.renderer.setAttribute(script, 'data-epayco-type-doc-billing', 'CC');
    this.renderer.setAttribute(script, 'data-epayco-number-doc-billing', '123456789');
    this.renderer.setAttribute(script, 'data-epayco-name-billing', this.clientePlan?.nombre?.toString()!);
    this.renderer.setAttribute(script, 'data-epayco-mobilephone-billing', '3124567891');
  
    // Agregar script al contenedor
    this.renderer.appendChild(container, script);
    this.renderer.appendChild(document.body, container);

    // Verificar pago epayco
    const epaycoButton = document.getElementById('epaycoButtonContainer');
    if (epaycoButton) {
      epaycoButton.addEventListener('click', () => {
        this.pagoRealizado = true;
        this.mostrarModalPagoExitoso();
        clearTimeout(this.paymentTimeout); // Limpiar temporizador si se ejecuta manualmente
      });
    }
  }

  ngOnDestroy() {
    clearTimeout(this.paymentTimeout); // Limpiar temporizador al destruir el componente
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.fGroup.invalid) {
      alert('Debe diligenciar todo el formulario');
      console.log(this.fGroup);
    } else if (!this.recordId) {
      alert('Por favor, seleccione un plan antes de confirmar.');
    } else {
      this.GuardarRegistro();
    }
  }
}
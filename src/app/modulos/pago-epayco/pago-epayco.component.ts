import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ClientePlanModel } from '../../modelos/clientePlan.model';
import { PagoEpaycoService } from '../../servicios/parametros/pago-epayco.service';
import { HttpClient } from '@angular/common/http';

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
    private http: HttpClient
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
  }

  BuscarRegistro() {
    this.servicio.BuscarRegistro(this.recordId).subscribe({
      next: (data: ClientePlanModel) => {
        this.obtenerFgDatos['id'].setValue(data.id);
        this.obtenerFgDatos['nombre'].setValue(data.nombre);
        this.obtenerFgDatos['detalles'].setValue(data.detalles);
        this.obtenerFgDatos['tarifa'].setValue(data.tarifa);
        this.obtenerFgDatos['cantidadBeneficiarios'].setValue(data.cantidadBeneficiarios);
        this.obtenerFgDatos['fechaAdquisicion'].setValue(data.fechaAdquisicion);
        this.obtenerFgDatos['fechaVencimiento'].setValue(data.fechaVencimiento);
        this.obtenerFgDatos['activo'].setValue(data.activo);
        this.obtenerFgDatos['planId'].setValue(data.planId);
        this.obtenerFgDatos['clienteId'].setValue(data.clienteId);
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
              this.router.navigate(['planes/clientes', this.clienteId, 'mis-planes']);
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
}
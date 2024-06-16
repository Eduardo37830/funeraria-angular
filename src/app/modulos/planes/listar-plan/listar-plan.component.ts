import { Component } from '@angular/core';
import { ClientePlanModel } from '../../../modelos/clientePlan.model';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { ConfiguracionPaginacion } from '../../../config/configuracion.paginacion';
import { ConfiguracionRutasBackend } from '../../../config/configuracion.rutas.backend';
import { ClienteModel } from '../../../modelos/cliente.model';
import { PlanService } from '../../../servicios/parametros/plan.service';
import { PlanModel } from '../../../modelos/plan.model';
import { ClienteService } from '../../../servicios/parametros/cliente.service';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { UsuarioValidadoModel } from '../../../modelos/usuario.validado.model';
import { MatDialog } from '@angular/material/dialog';
import { PlanVencidoDialogComponent } from '../../reportes/plan-vencido-dialog/plan-vencido-dialog.component';

@Component({
  selector: 'app-listar-plan',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    NgxPaginationModule,
    FormsModule
  ],
  templateUrl: './listar-plan.component.html',
  styleUrl: './listar-plan.component.css'
})
export class ListarPlanComponent {
  listaRegistros: ClientePlanModel[] = [];
  pag = 1;
  total = 0;
  clientes: ClienteModel[] = [];
  plan: ClientePlanModel[] = [];
  clienteId: number | null = null;
  planId: number | null = null;
  registrosPorPagina = ConfiguracionPaginacion.registroPorPagina;
  BASE_URL: string = ConfiguracionRutasBackend.urlNegocio;

  Permiso: boolean = false;
  usuario: boolean = false;

  descuentoForm: FormGroup;
  descuentos: number[] = [0,10, 20, 30, 40, 50, 60, 70];

  constructor(
    private servicioPlanes: PlanService,
    private clienteService: ClienteService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private servicioSeguridad: SeguridadService,
    private dialog: MatDialog  )
    {
    this.descuentoForm = new FormGroup({
      descuento: new FormControl('')
    });
   }

  ngOnInit(): void {
    this.clienteId = Number(this.route.snapshot.paramMap.get('id'));
    this.planId = Number(this.route.snapshot.paramMap.get('planId'));
    this.ListarRegistrosPlan();
    this.ValidarPermisos();
    if(this.clienteId == 2) {
      this.obtenerPlanCliente();
    }
    //this.obtenerPlanCliente();
    if(this.Permiso && this.clienteId !== 2) {
      this.ListarRegistros();
    }
  }

  ObtenerClientesYValidarPermisos() {
    this.clienteService.listarRegistros().subscribe({
      next: (clientes) => {
        this.clientes = clientes;
        console.log('Clientes obtenidos:', this.clientes);
        this.ValidarPermisos();
      },
      error: (error) => {
        console.log('Error obteniendo los clientes:', error);
      }
    });
  }

  ValidarPermisos() {
    this.servicioSeguridad.ObtenerDatosSesion().subscribe({
      next: (data: UsuarioValidadoModel | null) => {
        if (data && data.token) {
          // Verificar si el usuario es un administrador
          if (data.user && data.user.rolId === '6619aa9177e8f21a1c6f600c') {
            this.Permiso = true;
          }
          if (data.user && data.user.rolId === '661dcc702a5f4843508e6740') {
            this.usuario = true;
          }
        }
        console.log('Permiso:', this.Permiso);
        console.log('Cliente ID:', this.clienteId);
        console.log('Usuario:', this.usuario);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  ListarRegistros() {
    this.servicioPlanes.listarPlanCliente(this.pag).subscribe({
      next: (datos) => {
        this.listaRegistros = datos.registros;
        this.total = datos.totalRegistros;
        console.log('Registros obtenidos:', this.listaRegistros);
      },
      error: () => {
        alert('Error leyendo la información de la base de datos');
      }
    });
  }

  ListarRegistrosPlan() {
    this.servicioPlanes.listarRegistrosPagina(this.clienteId!).subscribe({
      next: (datos) => {
        this.listaRegistros = datos.registros;
        this.total = datos.totalRegistros;
      },
      error: () => {
        alert('Error leyendo la información de la base de datos');
      }
    });
  }

  obtenerPlanCliente(): void {
    if (this.clienteId !== null && this.planId !== null) {
      this.http.get<ClientePlanModel[]>(`${this.BASE_URL}clientes/${this.clienteId}/plans`)
        .subscribe(
          (planes) => {
            this.plan = planes.filter(p => p.clienteId === this.clienteId);
            console.log('Plan obtenidos:', this.plan);
            if(this.usuario) {
              this.verificarPlanesVencidos();
            }
          },
          (error) => {
            console.error('Error al obtener el plan:', error);
          }
        );
    }
  }

  verificarPlanesVencidos(): void {
    const fechaActual = new Date();
    this.plan.forEach((p) => {
      const fechaVencimiento = new Date(p.fechaVencimiento!);
      if (fechaVencimiento < fechaActual) {
        this.dialog.open(PlanVencidoDialogComponent, {
          data: { nombre: p.nombre }
        });
      }
    });
  }

  aplicarDescuento(id: number): void {
    // Obtener el descuento del formulario
    const descuento = this.descuentoForm.value.descuento;

    // Validar si el descuento es válido (puedes añadir más validaciones según necesites)
    if (descuento < 0 || descuento > 100) {
      alert('El descuento debe estar entre 0 y 100.');
      return;
    }

    // Construir el objeto con el descuento a enviar al backend
    const descuentoActualizado = {
      descuento: descuento
    };

    // Realizar la solicitud PUT al backend para actualizar el descuento del plan del cliente
    this.http.put<any>(`/{BASE_URL}/clientes/${this.clienteId}/planes/${id}`, descuentoActualizado)
      .subscribe(
        (response) => {
          // Manejar la respuesta exitosa del servidor si es necesario
          console.log('Descuento actualizado correctamente:', response);
          // Actualizar la lista de registros si es necesario
          // this.ListarRegistrosPlan();
        },
        (error) => {
          console.error('Error al actualizar el descuento:', error);
          alert('Error al actualizar el descuento.');
        }
      );
  }
}
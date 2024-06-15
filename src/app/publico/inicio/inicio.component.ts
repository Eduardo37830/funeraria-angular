import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBriefcase, faTree, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { ClientePlanModel } from '../../modelos/clientePlan.model';
import { PlanVencidoDialogComponent } from '../../modulos/reportes/plan-vencido-dialog/plan-vencido-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ClienteModel } from '../../modelos/cliente.model';
import { ConfiguracionPaginacion } from '../../config/configuracion.paginacion';
import { ConfiguracionRutasBackend } from '../../config/configuracion.rutas.backend';
import { PlanModel } from '../../modelos/plan.model';
import { HttpClient } from '@angular/common/http';
import { ClienteService } from '../../servicios/parametros/cliente.service';
import { PlanService } from '../../servicios/parametros/plan.service';
import { SeguridadService } from '../../servicios/seguridad.service';
import { UsuarioValidadoModel } from '../../modelos/usuario.validado.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterLink, FontAwesomeModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  faBriefcase = faBriefcase;
  faTree = faTree;
  faUserTie = faUserTie;

  listaRegistros: PlanModel[] = [];
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

  constructor(
    private servicioPlanes: PlanService,
    private servicioSeguridad: SeguridadService,
    private clienteService: ClienteService,
    private dialog: MatDialog,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.ObtenerClientesYValidarPermisos();
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

  obtenerPlanCliente(): void {
    if (this.clienteId !== null) {
      this.http.get<ClientePlanModel[]>(`${this.BASE_URL}clientes/${this.clienteId}/plans`)
        .subscribe(
          (planes) => {
            this.plan = planes.filter(p => p.clienteId === this.clienteId);
            console.log('Planes obtenidos:', this.plan); // Agregado console.log para depuración
            if (this.usuario) {
              this.verificarPlanesVencidos();
            }
          },
          (error) => {
            console.error('Error al obtener el plan:', error); // Agregado console.error para capturar errores
          }
        );
    }
  }

  ObtenerClientesYValidarPermisos() {
    this.clienteService.listarRegistros().subscribe({
      next: (clientes) => {
        this.clientes = clientes;
        console.log('Clientes obtenidos:', this.clientes); // Agregado console.log para depuración
        this.ValidarPermisos();
      },
      error: (error) => {
        console.error('Error obteniendo los clientes:', error); // Agregado console.error para capturar errores
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

          // Buscar el cliente correspondiente por correo
          const clienteEncontrado = this.clientes.find(cliente => cliente.correo === data.user?.correo);
          if (clienteEncontrado) {
            this.clienteId = clienteEncontrado.id!;
            console.log('Cliente ID encontrado:', this.clienteId); // Agregado console.log para depuración
            this.obtenerPlanCliente(); // Llamar a obtenerPlanCliente después de validar permisos
          } else {
            console.log('Cliente no encontrado para el correo:', data.user?.correo); // Agregado console.log para depuración
          }
        }
        console.log('Permiso:', this.Permiso); // Agregado console.log para depuración
        console.log('Usuario:', this.usuario); // Agregado console.log para depuración
      },
      error: (error: any) => {
        console.error('Error al obtener datos de sesión:', error); // Agregado console.error para capturar errores
      }
    });
  }
}
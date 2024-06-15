import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ConfiguracionPaginacion } from '../../../../config/configuracion.paginacion';
import { ConfiguracionRutasBackend } from '../../../../config/configuracion.rutas.backend';
import { PlanModel } from '../../../../modelos/plan.model';
import { PlanService } from '../../../../servicios/parametros/plan.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { SeguridadService } from '../../../../servicios/seguridad.service';
import { UsuarioValidadoModel } from '../../../../modelos/usuario.validado.model';
import { ClienteModel } from '../../../../modelos/cliente.model';
import { ClienteService } from '../../../../servicios/parametros/cliente.service';
import { HttpClient } from '@angular/common/http';
import { ClientePlanModel } from '../../../../modelos/clientePlan.model';

@Component({
  selector: 'app-listar-plan',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    NgxPaginationModule
  ],
  templateUrl: './listar-plan.component.html',
  styleUrl: './listar-plan.component.css'
})
export class ListarPlanComponent {
  listaRegistros: PlanModel[] = [];
  pag = 1;
  total = 0;
  clientes: ClienteModel[] = [];
  clienteId: number = 0;
  registrosPorPagina = ConfiguracionPaginacion.registroPorPagina;
  BASE_URL: string = ConfiguracionRutasBackend.urlNegocio;

  Permiso: boolean = false;
  usuario: boolean = false;
  idioma = 'es';
  filtroForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private servicioPlanes: PlanService,
    private servicioSeguridad: SeguridadService,
    private clienteService: ClienteService,
   ) { 
      this.filtroForm = this.formBuilder.group({
        nombre: [''],
        mensualidad: [''],
        detalles: ['']
      });
    }

  ngOnInit(): void{
    this.ListarRegistros();
    this.ObtenerClientesYValidarPermisos();
    this.ListarRegistrosPlan();
  }

  ListarRegistros() {
    this.servicioPlanes.listarRegistrosPaginados(this.pag).subscribe({
      next: (datos) => {
        this.listaRegistros = datos.registros;
        this.total = datos.totalRegistros;
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

  ObtenerClientesYValidarPermisos() {
    this.clienteService.listarRegistros().subscribe({
      next: (clientes) => {
        this.clientes = clientes;
        console.log('Clientes obtenidos:', this.clientes); // Verifica si se obtienen clientes
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

          // Buscar el cliente correspondiente por correo
          const clienteEncontrado = this.clientes.find(cliente => cliente.correo! === data.user!.correo);
          if (clienteEncontrado) {
            this.clienteId = clienteEncontrado.id!;
            console.log('Cliente ID encontrado:', this.clienteId);
          } else {
            console.log('Cliente no encontrado para el correo:', data.user?.correo);
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

  cambiarIdioma() {
    this.idioma = this.idioma === 'es' ? 'en' : 'es';
  }
}
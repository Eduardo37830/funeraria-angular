import { Component } from '@angular/core';
import { ClienteModel } from '../../../modelos/cliente.model';
import { ClienteService } from '../../../servicios/parametros/cliente.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ArchivoModel } from '../../../modelos/archivo.model';
import { ConfiguracionRutasBackend } from '../../../config/configuracion.rutas.backend';
import { NgxPaginationModule } from 'ngx-pagination';
import { ConfiguracionPaginacion } from '../../../config/configuracion.paginacion';

@Component({
  selector: 'app-clientes-morosos',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    NgxPaginationModule
  ],
  templateUrl: './clientes-morosos.component.html',
  styleUrl: './clientes-morosos.component.css'
})
export class ClientesMorososComponent {
  clientesMorosos: ClienteModel[] = [];
  nombreArchivoCargado: string = '';
  archivoCargado: boolean = false;
  pag = 1;
  total = 0;
  registrosPorPagina = ConfiguracionPaginacion.registroPorPagina;
  BASE_URL: string = ConfiguracionRutasBackend.urlNegocio;
  recordId: number = 0;

  constructor(
    private servicio: ClienteService  ) {
  }

  ngOnInit(): void {
    this.obtenerClientesMorosos();
  }

  obtenerClientesMorosos(): void {
    this.servicio.ObternerClientesMorosos().subscribe(
      clientes => {
        this.clientesMorosos = clientes;
        this.total = clientes.length;
      },
      error => {
        console.error('Error obteniendo clientes morosos', error);
        // Manejar el error adecuadamente, por ejemplo, mostrando un mensaje al usuario
      }
    );
  }

  cambiarEstadoCliente(cliente: ClienteModel): void {
    cliente.activo = !cliente.activo; // Cambia el estado
    cliente._idSeguridad = ''; // Puedes inicializarlo aquí si no tienes el valor antes
    
    console.log('Cambiando estado del cliente', cliente);
    
    this.servicio.EditarRegistro(cliente).subscribe({
        next: (data: ClienteModel) => {
            alert('Registro guardado correctamente');
            //this.router.navigate(['/parametros/cliente-listar']);
        },
        error: (error: any) => {
            console.error('Error al editar el registro', error); // Imprimir el error completo
            if (error.error && error.error.message) {
                alert('Error al editar el registro: ' + error.error.message);
            } else {
                alert('Error al editar el registro: ' + JSON.stringify(error));
            }
        }
    });
  }
}
import { Component } from '@angular/core';
import { ClienteService } from '../../../../servicios/parametros/cliente.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ClienteModel } from '../../../../modelos/cliente.model';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-eliminar-cliente',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './eliminar-cliente.component.html',
  styleUrl: './eliminar-cliente.component.css'
})
export class EliminarClienteComponent {
  recordId: number = 0;
  primerNombre: string = '';
  segundoNombre: string = '';
  primerApellido: string = '';
  segundoApellido: string = '';
  correo: string = '';
  celular: string = '';
  foto: string = '';
  ciudadResidencia: string = '';
  direccion: string = '';
  fechaRegistro: string = '';
  activo: boolean = false;

  constructor(
    private servicio: ClienteService,
    private router: Router,
    private route: ActivatedRoute
  ){
    this.recordId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.BuscarRegistro();
  }

  BuscarRegistro() {
    this.servicio.BuscarRegistro(this.recordId).subscribe({
      next: (data: ClienteModel) => {
        this.recordId = data.id!;
        this.primerNombre = data.primerNombre!;
        this.segundoNombre = data.segundoNombre!;
        this.primerApellido = data.primerApellido!;
        this.segundoApellido = data.segundoApellido!;
        this.correo = data.correo!;
        this.celular = data.celular!;
        this.foto = data.foto!;
        this.ciudadResidencia = data.ciudadResidencia!;
        this.direccion = data.direccion!;
        this.fechaRegistro = data.fechaRegistro!.toString(); // Convert 'Date' type to string
        this.activo = data.activo!;
      },
      error: (error: any) => {
        alert('Registro no encontrado');
      }
    });  
  }

  EliminarRegistro() {
    this.servicio.EliminarRegistro(this.recordId).subscribe({
      next: (data: ClienteModel) => {
        alert('Registro eliminado correctamente');
        this.router.navigate(['/parametros/cliente-listar']);
      },
      error: (error: any) => {
        alert('Error al eliminar el registro');
      }
    });
  }
}


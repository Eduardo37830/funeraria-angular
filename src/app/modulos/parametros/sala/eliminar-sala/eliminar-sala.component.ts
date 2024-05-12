import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SalaModel } from '../../../../modelos/sala.model';
import { SalaService } from '../../../../servicios/parametros/sala.service';

@Component({
  selector: 'app-eliminar-sala',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './eliminar-sala.component.html',
  styleUrl: './eliminar-sala.component.css'
})
export class EliminarSalaComponent {
  recordId: number = 0;
  nombre: string = '';
  tipo: string = '';
  capacidad: number = 0;
  horaEntradaCuerpo: Date = new Date();
  horaSalidaCuerpo: Date = new Date();
  disponible: boolean = false;
  sedeId: number = 0;

  constructor(
    private servicio: SalaService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      this.sedeId = +params['ids']; 
      this.recordId = +params['id'];
    });
  }

  ngOnInit(): void {
    this.BuscarRegistro();
  }

  BuscarRegistro() {
    this.servicio.BuscarRegistro(this.recordId).subscribe({
      next: (data: SalaModel) => {
        this.nombre = data.nombre!;
        this.tipo = data.tipo!;
        this.capacidad = data.capacidad!;
        this.horaEntradaCuerpo = new Date(data.horaEntradaCuerpo!);
        this.horaSalidaCuerpo = new Date(data.horaSalidaCuerpo!);
      },
      error: (error: any) => {
        alert('Registro no encontrado');
      }
    });  
  }

  EliminarRegistro() {
    this.servicio.EliminarRegistro(this.recordId).subscribe({
      next: (data: SalaModel) => {
        alert('Registro eliminado correctamente');
        this.router.navigate(['/parametros/sedes', this.sedeId, 'salas']);
      },
      error: (error: any) => {
        alert('Error al eliminar el registro');
      }
    });
  }

  formatDateTime(dateTime: string): string {
    const formattedDate = new Date(dateTime).toLocaleString('es-CO', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    });
    return formattedDate;
  }
}
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SolicitudService } from '../../../servicios/parametros/solicitud.service';
import { solicitudModel } from '../../../modelos/solicitudServicioFunerario.model';

@Component({
  selector: 'app-solicitar-servicio',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './solicitar-servicio.component.html',
  styleUrls: ['./solicitar-servicio.component.css']
})
export class SolicitarServicioComponent implements OnInit {
  solicitudForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private solicitudService: SolicitudService
  ) {
    this.solicitudForm = this.fb.group({
      fechaSolicitud: ['', Validators.required],
      ubicacionDelCuerpo: ['', [Validators.required, Validators.minLength(2)]],
      tipoServicio: ['', Validators.required],
      estadoAceptado: [false],  // Asegurarse de que es un booleano
      idBeneficiario: ['', Validators.required],
      clienteId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.setFechaActual();
  }

  setFechaActual() {
    const fechaActual = new Date().toISOString(); // ISO string includes date-time
    this.solicitudForm.patchValue({
      fechaSolicitud: fechaActual
    });
  }

  onSubmit() {
    if (this.solicitudForm.invalid) {
      alert('Debe completar todos los campos requeridos.');
      return;
    }

    const nuevaSolicitud: solicitudModel = {
      ...this.solicitudForm.value,
      estadoAceptado: this.solicitudForm.value.estadoAceptado === 'true' || this.solicitudForm.value.estadoAceptado === true // Asegurar booleano
    };

    this.solicitudService.AgregarRegistro(nuevaSolicitud).subscribe({
      next: (respuesta: solicitudModel) => {
        alert('Solicitud enviada con éxito');
        this.solicitudForm.reset();
        this.setFechaActual(); // Reset form with current date
      },
      error: (error: any) => {
        console.error('Error al enviar la solicitud', error, JSON.stringify(error));
        alert('Error al enviar la solicitud');
      }
    });
  }
}

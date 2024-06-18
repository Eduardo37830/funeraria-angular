import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SolicitudService } from '../../../servicios/parametros/solicitud.service';
import { solicitudModel } from '../../../modelos/solicitudServicioFunerario.model';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-solicitar-servicio',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,

  ],
  templateUrl: './solicitar-servicio.component.html',
  styleUrls: ['./solicitar-servicio.component.css']
})
export class SolicitarServicioComponent implements OnInit {
  solicitudForm: FormGroup;
  beneficiarios: any[] = [];

  idCliente: number = 0;

  constructor(
    private fb: FormBuilder,
    private solicitudService: SolicitudService,
    private seguridadService: SeguridadService,
    private router: Router,
  ) {
    this.solicitudForm = this.fb.group({
      fechaSolicitud: ['', Validators.required],
      ubicacionDelCuerpo: ['', [Validators.required, Validators.minLength(2)]],
      tipoServicio: ['', Validators.required],
      estadoAceptado: [false],  // Asegurarse de que es un booleano
      idBeneficiario: ['', Validators.required],
    });
  }

  idSeguridad: string = this.seguridadService.ObtenerDatosUsuarioLS()!._id!;
   

  ngOnInit(): void {
    this.obtenerDatosUsuario();
  }

  obtenerDatosUsuario() {
    console.log("El id es", this.idSeguridad);
    this.seguridadService.ObtenerDatosUsuarioCliente(this.idSeguridad).subscribe({
      next: (data) => {
        this.idCliente = data.id!;
        console.log("El id del cliente que solicita servicio es", this.idCliente);
        this.cargarBeneficiarios(); 
        this.setFechaActual(); 
      },
      error: (error) => {
        console.error('Error al obtener datos del usuario', error);
      }
    });
  }

  cargarBeneficiarios() {
    this.solicitudService.listarBeneficiariosCliente(this.idCliente).subscribe({
      next: (data) => {
        console.log("Los beneficiarios son:", data);
        this.beneficiarios = data; 
      },
      error: (error) => {
        console.error('Error al cargar los beneficiarios', error);
      }
    });
  }

  setFechaActual() {
    const fechaActual = new Date().toISOString(); 
    this.solicitudForm.patchValue({
      fechaSolicitud: fechaActual,
    });
  }

  onSubmit() {
    if (this.solicitudForm.invalid) {
      alert('Debe completar todos los campos requeridos.');
      return;
    }

    // Convertir idBeneficiario a número
    const formValues = this.solicitudForm.value;
    formValues.idBeneficiario = Number(formValues.idBeneficiario);

    const nuevaSolicitud: solicitudModel = {
      ...formValues,
      estadoAceptado: formValues.estadoAceptado === 'true' || formValues.estadoAceptado === true ,
      clienteId: this.idCliente
    };

    console.log('Nueva solicitud:', nuevaSolicitud);
    

    this.solicitudService.AgregarRegistro(nuevaSolicitud).subscribe({
      next: (respuesta: solicitudModel) => {
        alert('Solicitud enviada con éxito');
        console.log('Solicitud enviada con éxito', nuevaSolicitud, respuesta);
        this.solicitudForm.reset();
        this.setFechaActual(); 
        this.router.navigate(['/servicios/cliente', this.idCliente, 'aceptar-solicitud']);
      },
      error: (error: any) => {
        console.error('Error al enviar la solicitud', error, JSON.stringify(error));
        alert('Error al enviar la solicitud');
      }
    });
  }
}

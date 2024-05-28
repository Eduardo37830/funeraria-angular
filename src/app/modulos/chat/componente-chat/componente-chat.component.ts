import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { UsuarioModel } from '../../../modelos/usuario.model';

@Component({
  selector: 'app-componente-chat',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './componente-chat.component.html',
  styleUrl: './componente-chat.component.css'
})

export class ComponenteChatComponent implements OnInit {
  fGroup: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private servicioSeguridad: SeguridadService,
    private router: Router
  ) { }

  ngOnInit() {
    this.ConstruirFormulario();
  }

  /**
   * Construcción del formulario
   */
  ConstruirFormulario() {
    this.fGroup = this.fb.group({
      nombreUsuario: ['', [Validators.required, Validators.minLength(2)]],
      codigo: ['', [Validators.minLength(5)]],
    });
  }

  /**
   * Función de acceso a la sala
   */
  Registrarse() {
    if (this.fGroup.invalid) {
      alert('Debe completar todos los campos requeridos.');
      return;
    }
    let campos = this.ObtenerFormGroup;
    let datos = {
      nombreUsuario: campos["nombreUsuario"].value,
      codigo: campos["codigo"].value,
    };
  
    // Store the data in the local storage
    this.servicioSeguridad.AlmacenarDatosChat(datos.codigo, datos.nombreUsuario);
  
    alert("Bienvenido a la sala de chat");
    this.router.navigate(["/chat/entradamensaje"]);
  }

  get ObtenerFormGroup() {
    return this.fGroup.controls;
  }
}

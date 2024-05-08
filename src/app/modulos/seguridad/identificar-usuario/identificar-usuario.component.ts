import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-identificar-usuario',
  standalone: true,
  imports: [],
  templateUrl: './identificar-usuario.component.html',
  styleUrl: './identificar-usuario.component.css'
})
export class IdentificarUsuarioComponent {
  fGrup: FormGroup = new FormGroup({});
}

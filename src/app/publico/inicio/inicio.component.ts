import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBriefcase, faTree, faUserTie } from '@fortawesome/free-solid-svg-icons';

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
}

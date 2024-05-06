import { Routes } from '@angular/router';
import { InicioComponent } from './publico/inicio/inicio.component';
import { RutaNoEncontradaComponent } from './publico/errores/ruta-no-encontrada/ruta-no-encontrada.component';

export const routes: Routes = [
    {
        path: 'inicio',
        component: InicioComponent
    },
    {
        path: '',
        redirectTo: '/inicio',
        pathMatch: 'full'
    },
    {
        path: 'seguridad',
        loadChildren: () => import('./modulos/seguridad/seguridad.module').then(m => m.SeguridadModule)
    },
    {
        path: '**',
        component: RutaNoEncontradaComponent
    }
];

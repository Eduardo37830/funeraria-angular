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
        pathMatch: 'full',
        redirectTo: '/inicio'
    },
    {
        path:'seguridad',
        loadChildren: () => import('./modulos/seguridad/seguridad.module').then(m => m.SeguridadModule)
    },
    {
        path:'parametros',
        loadChildren: () => import('./modulos/parametros/parametros.module').then(m => m.ParametrosModule)
    },
    {
        path: 'reportes',
        loadChildren: () => import('./modulos/reportes/reportes.module').then(m => m.ReportesModule)
    },
    {
        path:'planes',
        loadChildren: () => import('./modulos/planes/planes.module').then(m => m.PlanesModule)
    },
    {
        path:'servicios',
        loadChildren: () => import('./modulos/servicios/servicios.module').then(m => m.ServiciosModule)
    },
    {
        path:'ayuda',
        loadChildren: () => import('./modulos/ayuda/ayuda.module').then(m => m.AyudaModule)
    },
    {
        path: '**',
        component: RutaNoEncontradaComponent
    }
];

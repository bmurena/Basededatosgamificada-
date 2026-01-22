import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },
  {
    path: 'inicio',
    loadComponent: () =>
      import('./pages/inicio/inicio.page').then(m => m.InicioPage),
  },
  {
    path: 'aprende',
    loadComponent: () =>
      import('./pages/aprende/aprende.page').then(m => m.AprendePage),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then(m => m.LoginPage),
  },
  {
    path: 'nosotros',
    loadComponent: () => import('./pages/nosotros/nosotros.page').then( m => m.NosotrosPage)
  },
  {
    path: 'aprende',
    loadComponent: () => import('./pages/aprende/aprende.page').then( m => m.AprendePage)
  },
  {
    path: 'practica',
    loadComponent: () => import('./pages/practica/practica.page').then( m => m.PracticaPage)
  },
  {
    path: 'juego',
    loadComponent: () => import('./pages/juego/juego.page').then( m => m.JuegoPage)
  },
];

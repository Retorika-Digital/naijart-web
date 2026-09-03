import { Routes } from '@angular/router';
import { Home } from './features/home/home';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'NAIJART — Inicio'
  },

  // Pendientes de crear el componente (los iremos descomentando):

  {
     path: 'galeria',
     loadComponent: () => import('./features/gallery/gallery').then(m => m.Gallery),
     title: 'NAIJART — Galería'
  },
  {
     path: 'calendario',
     loadComponent: () => import('./features/calendar/calendar').then(m => m.Calendar),
     title: 'NAIJART — Calendario'
   },
  {
     path: 'unete',
     loadComponent: () => import('./features/join/join').then(m => m.Join),
     title: 'NAIJART — Únete'
   },
   {
     path: 'contacto',
     loadComponent: () => import('./features/contact/contact').then(m => m.Contact),
     title: 'NAIJART — Contáctanos'
   },
   {
     path: 'quienes-somos',
     loadComponent: () => import('./features/team/team').then(m => m.Team),
     title: 'NAIJART — Quienes somos'
   },
  // {
  //   path: 'blog',
  //   loadComponent: () => import('./features/blog/blog').then(m => m.Blog),
  //   title: 'NAIJART — Blog'
  // },

  // Ruta comodín: si alguien entra a una URL que no existe, lo mandamos a Home
  // (más adelante podemos crear una página 404 real en vez de redirigir)
  {
    path: '**',
    redirectTo: ''
  }
];

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { GALLERY_ITEMS } from '../../shared/data/gallery-items';

interface UpcomingEvent {
  day: string;
  month: string;
  title: string;
  location: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  // Preview de galería: toma los primeros N del mismo listado que usará
  // el componente de Galería, para que ambos queden sincronizados.
  galleryPreview = GALLERY_ITEMS.slice(0, 5);

  // TODO: sustituir por datos reales / servicio de calendario
  upcomingEvents: UpcomingEvent[] = [
    { day: '12', month: 'sep', title: 'Exposición colectiva', location: 'Galería Sur, Madrid' },
    { day: '28', month: 'sep', title: 'Encuentro de artistas', location: 'Centro Cultural, Sevilla' },
    { day: '05', month: 'oct', title: 'Taller de pintura tradicional', location: 'Espacio Naijart, Barcelona' }
  ];
}

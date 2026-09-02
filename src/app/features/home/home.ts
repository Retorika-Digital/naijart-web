import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface GalleryPreviewItem {
  title: string;
  artist: string;
  // Clase de acento usada mientras no hay imagen real (ver home.scss)
  accent: 'green' | 'gold' | 'blue';
}

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
  // TODO: sustituir por imágenes reales cuando estén disponibles
  galleryPreview: GalleryPreviewItem[] = [
    { title: 'Reina del Delta', artist: 'Amara Okafor', accent: 'gold' },
    { title: 'Raíces', artist: 'Chidi Eze', accent: 'green' },
    { title: 'Puentes', artist: 'Ngozi Adeyemi', accent: 'blue' },
    { title: 'Corona de Lagos', artist: 'Tunde Bello', accent: 'gold' },
    { title: 'Memoria de Ibadan', artist: 'Folake Adeyemi', accent: 'green' }
  ];

  // TODO: sustituir por datos reales / servicio de calendario
  upcomingEvents: UpcomingEvent[] = [
    { day: '12', month: 'sep', title: 'Exposición colectiva', location: 'Galería Sur, Madrid' },
    { day: '28', month: 'sep', title: 'Encuentro de artistas', location: 'Centro Cultural, Sevilla' },
    { day: '05', month: 'oct', title: 'Taller de pintura tradicional', location: 'Espacio Naijart, Barcelona' }
  ];
}

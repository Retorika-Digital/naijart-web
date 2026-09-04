import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { GALLERY_ITEMS } from '../../shared/data/gallery-items';
import { EventModal, CalendarEvent } from '../../shared/components/event-modal/event-modal';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, EventModal, TranslatePipe],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  // Preview de galería: toma los primeros N del mismo listado que usará
  // el componente de Galería, para que ambos queden sincronizados.
  galleryPreview = GALLERY_ITEMS.slice(0, 5);

  // Segmentos del borde de la moneda (efecto 3D del logo girando), ver home.scss
  coinEdgeSegments = Array.from({ length: 24 });

  // TODO: sustituir por datos reales / servicio de calendario.
  // Contenido de placeholder — no se traduce por ahora (ver nota en el chat de idiomas).
  // Cuando exista el componente de Calendario, valorar mover este
  // listado a shared/data/, igual que gallery-items.ts.
  upcomingEvents: CalendarEvent[] = [
  {
    day: '12',
    monthKey: 'months.sep',
    titleKey: 'home.events.event1.title',
    locationKey: 'home.events.event1.location',
    descriptionKey: 'home.events.event1.description'
  },
  {
    day: '28',
    monthKey: 'months.sep',
    titleKey: 'home.events.event2.title',
    locationKey: 'home.events.event2.location',
    descriptionKey: 'home.events.event2.description'
  },
  {
    day: '05',
    monthKey: 'months.oct',
    titleKey: 'home.events.event3.title',
    locationKey: 'home.events.event3.location',
    descriptionKey: 'home.events.event3.description'
  }
  ];

  selectedEvent = signal<CalendarEvent | null>(null);

  openEvent(event: CalendarEvent): void {
    this.selectedEvent.set(event);
  }

  closeEvent(): void {
    this.selectedEvent.set(null);
  }
}

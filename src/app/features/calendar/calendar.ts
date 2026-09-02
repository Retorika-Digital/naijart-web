import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CalendarEvent {
  id: number;
  title: string;
  date: string; // ISO 'YYYY-MM-DD'
  time: string;
  location: string;
  description: string;
  image: string;
}

interface CalendarDay {
  date: Date;
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  events: CalendarEvent[];
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.html',
  styleUrl: './calendar.scss'
})
export class Calendar {
  private readonly monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  readonly weekDayLabels = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

  currentDate = signal(new Date(2026, 8, 1)); // arranca en septiembre 2026
  selectedEvent = signal<CalendarEvent | null>(null);

  // Datos de ejemplo — sustituir por contenido real del cliente
  events: CalendarEvent[] = [
    {
      id: 1,
      title: 'Exposición: Raíces',
      date: '2026-09-12',
      time: '18:00',
      location: 'Galería Sur, Sevilla',
      description: 'Muestra colectiva de pintura y escultura de artistas nigerianos residentes en España.',
      image: '/images/gallery/event-raices.jpg'
    },
    {
      id: 2,
      title: 'Taller de tejido tradicional',
      date: '2026-09-19',
      time: '11:00',
      location: 'Centro Cultural, Madrid',
      description: 'Taller práctico de técnicas textiles yoruba, abierto a todos los niveles.',
      image: '/images/gallery/event-tejido.jpg'
    },
    {
      id: 3,
      title: 'Noche de poesía y música',
      date: '2026-09-26',
      time: '20:00',
      location: 'Casa África, Sevilla',
      description: 'Velada de spoken word y música afrobeat en directo con artistas invitados.',
      image: '/images/gallery/event-poesia.jpg'
    },
    {
      id: 4,
      title: 'Charla: Arte contemporáneo nigeriano',
      date: '2026-10-03',
      time: '19:00',
      location: 'Universidad, Barcelona',
      description: 'Mesa redonda sobre las corrientes actuales del arte nigeriano en la diáspora.',
      image: '/images/gallery/event-charla.jpg'
    }
  ];

  monthLabel = computed(() => {
    const d = this.currentDate();
    return `${this.monthNames[d.getMonth()]} ${d.getFullYear()}`;
  });

  calendarDays = computed<CalendarDay[]>(() => {
    const current = this.currentDate();
    const year = current.getFullYear();
    const month = current.getMonth();

    const firstOfMonth = new Date(year, month, 1);
    const firstWeekday = (firstOfMonth.getDay() + 6) % 7; // lunes = 0

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    const today = new Date();
    const days: CalendarDay[] = [];

    for (let i = firstWeekday - 1; i >= 0; i--) {
      days.push(this.buildDay(new Date(year, month - 1, daysInPrevMonth - i), false, today));
    }
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(this.buildDay(new Date(year, month, day), true, today));
    }
    const remaining = (7 - (days.length % 7)) % 7;
    for (let day = 1; day <= remaining; day++) {
      days.push(this.buildDay(new Date(year, month + 1, day), false, today));
    }

    return days;
  });

  private buildDay(date: Date, isCurrentMonth: boolean, today: Date): CalendarDay {
    return {
      date,
      day: date.getDate(),
      isCurrentMonth,
      isToday: date.toDateString() === today.toDateString(),
      events: this.events.filter(e => this.isSameDate(e.date, date))
    };
  }

  private isSameDate(iso: string, date: Date): boolean {
    const [y, m, d] = iso.split('-').map(Number);
    return y === date.getFullYear() && m === date.getMonth() + 1 && d === date.getDate();
  }

  prevMonth(): void {
    const d = this.currentDate();
    this.currentDate.set(new Date(d.getFullYear(), d.getMonth() - 1, 1));
  }

  nextMonth(): void {
    const d = this.currentDate();
    this.currentDate.set(new Date(d.getFullYear(), d.getMonth() + 1, 1));
  }

  selectDay(day: CalendarDay): void {
    if (day.events.length > 0) {
      this.selectedEvent.set(day.events[0]);
    }
  }

  openEvent(event: CalendarEvent): void {
    this.selectedEvent.set(event);
  }

  closeModal(): void {
    this.selectedEvent.set(null);
  }

  formatEventDate(iso: string): string {
    const [y, m, d] = iso.split('-').map(Number);
    return new Date(y, m - 1, d).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }
}

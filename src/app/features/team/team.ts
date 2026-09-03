// src/app/features/team/team.ts

import { Component, signal } from '@angular/core';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  initials: string;
  accent: 'green' | 'gold' | 'blue';
  email: string;
  photo?: string;
  instagram?: string;
  linkedin?: string;
}

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [],
  templateUrl: './team.html',
  styleUrl: './team.scss'
})
export class Team {
  readonly members = signal<TeamMember[]>([
    {
      id: 1,
      name: 'Nelly Idagba',
      role: 'Fundadora & Directora Artística',
      bio: 'Pintora y gestora cultural nacida en Lagos. Fundó Naijart en 2023 con el objetivo de tender puentes entre el arte nigeriano contemporáneo y el público europeo.',
      initials: 'NI',
      accent: 'gold',
      email: 'nelly@naijart.org',
      photo: 'images/team/nellyIdagba.jpg',
      instagram: 'https://instagram.com/naijart',
      linkedin: 'https://linkedin.com/company/naijart'
    },
    {
      id: 2,
      name: 'Carlos García Martínez',
      role: 'Coordinador de Comunidad',
      bio: 'Encargado de mantener el vínculo entre los artistas asociados y la comunidad nigeriana en Europa. Organiza los encuentros mensuales.',
      initials: 'CG',
      accent: 'green',
      email: 'carlos@naijart.org',
      photo: 'images/team/CarlosGarciaMartinez.jpg',
      instagram: 'https://instagram.com/naijart'
    },
    {
      id: 3,
      name: 'Sergio González Montes',
      role: 'Responsable de Eventos',
      bio: 'Diseña y coordina exposiciones, ferias y presentaciones en distintas ciudades europeas. Diez años de experiencia en gestión cultural.',
      initials: 'SG',
      accent: 'blue',
      email: 'sergio@naijart.org',
      linkedin: 'https://linkedin.com/company/naijart'
    },
    {
      id: 4,
      name: 'Emeka Nwosu',
      role: 'Diseño y Producción',
      bio: 'Escultor y diseñador. Supervisa la producción y el montaje de las piezas expuestas, cuidando cada detalle técnico.',
      initials: 'EN',
      accent: 'gold',
      email: 'emeka@naijart.org',
      instagram: 'https://instagram.com/naijart'
    },
    {
      id: 5,
      name: 'Folake Adeyemi',
      role: 'Relaciones Institucionales',
      bio: 'Gestiona alianzas con instituciones culturales, embajadas y galerías europeas para ampliar el alcance de los artistas asociados.',
      initials: 'FA',
      accent: 'green',
      email: 'folake@naijart.org',
      linkedin: 'https://linkedin.com/company/naijart'
    },
    {
      id: 6,
      name: 'Tunde Bakare',
      role: 'Redes Sociales & Contenido',
      bio: 'Fotógrafo y creador de contenido. Es la voz detrás de las redes de Naijart y documenta cada evento y exposición.',
      initials: 'TB',
      accent: 'blue',
      email: 'tunde@naijart.org',
      instagram: 'https://instagram.com/naijart'
    }
  ]);

  readonly selectedMember = signal<TeamMember | null>(null);

  openMember(member: TeamMember): void {
    this.selectedMember.set(member);
  }

  closeModal(): void {
    this.selectedMember.set(null);
  }

  onOverlayClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.closeModal();
    }
  }
}

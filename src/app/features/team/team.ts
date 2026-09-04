// src/app/features/team/team.ts

import { Component, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

interface TeamMember {
  id: number;
  name: string;
  roleKey: string;   // clave de traducción, ej. 'team.members.m1.role'
  bioKey: string;
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
  imports: [TranslatePipe],
  templateUrl: './team.html',
  styleUrl: './team.scss'
})
export class Team {
  readonly members = signal<TeamMember[]>([
    {
      id: 1,
      name: 'Nelly Idagba',
      roleKey: 'team.members.m1.role',
      bioKey: 'team.members.m1.bio',
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
      roleKey: 'team.members.m2.role',
      bioKey: 'team.members.m2.bio',
      initials: 'CG',
      accent: 'green',
      email: 'carlos@naijart.org',
      photo: 'images/team/CarlosGarciaMartinez.jpg',
      instagram: 'https://instagram.com/naijart'
    },
    {
      id: 3,
      name: 'Sergio González Montes',
      roleKey: 'team.members.m3.role',
      bioKey: 'team.members.m3.bio',
      initials: 'SG',
      accent: 'blue',
      email: 'sergio@naijart.org',
      photo: 'images/team/SergioGonzalezMontes.jpeg',
      linkedin: 'https://linkedin.com/company/naijart'
    },
    {
      id: 4,
      name: 'Emeka Nwosu',
      roleKey: 'team.members.m4.role',
      bioKey: 'team.members.m4.bio',
      initials: 'EN',
      accent: 'gold',
      email: 'emeka@naijart.org',
      instagram: 'https://instagram.com/naijart'
    },
    {
      id: 5,
      name: 'Folake Adeyemi',
      roleKey: 'team.members.m5.role',
      bioKey: 'team.members.m5.bio',
      initials: 'FA',
      accent: 'green',
      email: 'folake@naijart.org',
      linkedin: 'https://linkedin.com/company/naijart'
    },
    {
      id: 6,
      name: 'Tunde Bakare',
      roleKey: 'team.members.m6.role',
      bioKey: 'team.members.m6.bio',
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

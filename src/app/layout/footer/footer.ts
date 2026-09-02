import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface FooterLink {
  label: string;
  path: string;
}

interface SocialLink {
  name: string;
  url: string;
  icon: 'instagram' | 'facebook' | 'linkedin';
}

type NewsletterStatus = 'idle' | 'success' | 'error';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  protected readonly currentYear = new Date().getFullYear();

  protected readonly newsletterEmail = signal('');
  protected readonly newsletterStatus = signal<NewsletterStatus>('idle');

  // Ajusta los `path` cuando existan las rutas reales en app.routes.ts
  protected readonly navLinks: FooterLink[] = [
    { label: 'Galería', path: '/galeria' },
    { label: 'Calendario', path: '/calendario' },
    { label: 'Equipo', path: '/equipo' },
    { label: 'Únete', path: '/unete' },
    { label: 'Contáctanos', path: '/contacto' },
  ];

  // Sustituye las URLs por las cuentas reales del cliente
  protected readonly socialLinks: SocialLink[] = [
    { name: 'Instagram', url: 'https://instagram.com/naijart', icon: 'instagram' },
    { name: 'Facebook', url: 'https://facebook.com/naijart', icon: 'facebook' },
    { name: 'LinkedIn', url: 'https://linkedin.com/company/naijart', icon: 'linkedin' },
  ];

  protected onSubscribe(): void {
    const email = this.newsletterEmail().trim();

    if (!email || !email.includes('@')) {
      this.newsletterStatus.set('error');
      return;
    }

    // TODO: conectar con el servicio de newsletter real (backend por definir en Fase 2)
    this.newsletterStatus.set('success');
    this.newsletterEmail.set('');
  }
}

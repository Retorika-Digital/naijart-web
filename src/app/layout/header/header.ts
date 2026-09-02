import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavLink {
  label: string;
  path: string;
}

type Lang = 'es' | 'en' | 'fr';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  // Estado del menú móvil (hamburguesa)
  protected readonly isMenuOpen = signal(false);

  // Añade el borde/sombra dorados al hacer scroll
  protected readonly isScrolled = signal(false);

  // Idioma activo. TODO: sustituir por el estado real de ngx-translate
  // cuando se implemente i18n (ver "Sistema de estilos globales" en el doc del proyecto).
  protected readonly currentLang = signal<Lang>('es');
  protected readonly languages: Lang[] = ['es', 'en', 'fr'];

  // Ajusta los `path` cuando existan las rutas reales en app.routes.ts
  protected readonly navLinks: NavLink[] = [
    { label: 'Galería', path: '/galeria' },
    { label: 'Calendario', path: '/calendario' },
    { label: 'Equipo', path: '/equipo' },
    { label: 'Únete', path: '/unete' },
    { label: 'Contáctanos', path: '/contacto' },
  ];

  protected toggleMenu(): void {
    this.isMenuOpen.update((open) => !open);
  }

  protected closeMenu(): void {
    this.isMenuOpen.set(false);
  }

  protected setLang(lang: Lang): void {
    this.currentLang.set(lang);
    // TODO: conectar con el servicio de traducción real (ngx-translate)
  }

  @HostListener('window:scroll')
  protected onWindowScroll(): void {
    this.isScrolled.set(window.scrollY > 8);
  }
}

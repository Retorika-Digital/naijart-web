import { Component, HostListener, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Artwork {
  id: number;
  title: string;
  artist: string;
  category: string;
  year: number;
  image: string;
  description: string;
}

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss'
})
export class Gallery {
  // Datos hardcoded para Fase 1 — en Fase 2 vendrán del backend
  protected readonly artworks: Artwork[] = [
    {
      id: 1,
      title: 'Espíritu de Osun',
      artist: 'Adaeze Nwosu',
      category: 'Pintura',
      year: 2023,
      image: '/images/gallery/ejemplo1.jpg',
      description: 'Óleo sobre lienzo que reinterpreta la figura de la diosa Osun a través de una paleta cálida de dorados y verdes profundos.'
    },
    {
      id: 2,
      title: 'Máscara del Silencio',
      artist: 'Chibueze Okafor',
      category: 'Escultura',
      year: 2022,
      image: '/images/gallery/ejemplo3.jpg',
      description: 'Talla en madera de iroko inspirada en las máscaras ceremoniales igbo, tratada con pátina de bronce.'
    },
    {
      id: 3,
      title: 'Mercado de Lagos al Amanecer',
      artist: 'Folake Adeyemi',
      category: 'Fotografía',
      year: 2024,
      image: '/images/gallery/ejemplo2.jpg',
      description: 'Serie documental sobre la vida cotidiana en los mercados de Lagos, capturada en las primeras horas del día.'
    },
    {
      id: 4,
      title: 'Raíces Tejidas',
      artist: 'Ngozi Eze',
      category: 'Arte Textil',
      year: 2023,
      image: '/images/gallery/ejemplo5.webp',
      description: 'Tapiz elaborado con técnicas tradicionales de tejido yoruba combinadas con hilo metálico dorado.'
    },
    {
      id: 5,
      title: 'Corona Digital',
      artist: 'Emeka Obi',
      category: 'Arte Digital',
      year: 2024,
      image: '/images/gallery/ejemplo4.jpg',
      description: 'Composición generativa que fusiona patrones geométricos tradicionales con estética afrofuturista.'
    },
    {
      id: 6,
      title: 'Danza del Harmattan',
      artist: 'Amara Chukwu',
      category: 'Pintura',
      year: 2021,
      image: '/images/gallery/ejemplo6.jfif',
      description: 'Acrílico que captura el movimiento de las bailarinas tradicionales durante la temporada del harmattan.'
    },
    {
      id: 7,
      title: 'Guardián de Bronce',
      artist: 'Chibueze Okafor',
      category: 'Escultura',
      year: 2020,
      image: '/images/gallery/ejemplo7.jpg',
      description: 'Fundición en bronce que rinde homenaje a los históricos bronces de Benín.',
    },
    {
      id: 8,
      title: 'Retratos de Abuja',
      artist: 'Folake Adeyemi',
      category: 'Fotografía',
      year: 2023,
      image: '/images/gallery/ejemplo8.webp',
      description: 'Retratos en blanco y negro de artesanos y comerciantes de la capital nigeriana.'
    },
    {
      id: 9,
      title: 'Manto de Adire',
      artist: 'Ngozi Eze',
      category: 'Arte Textil',
      year: 2022,
      image: '/images/gallery/ejemplo9.jfif',
      description: 'Tela teñida con la técnica tradicional adire, reinterpretada con motivos contemporáneos.'
    },
    {
      id: 10,
      title: 'Fragmentos de Identidad',
      artist: 'Emeka Obi',
      category: 'Arte Digital',
      year: 2023,
      image: '/images/gallery/ejemplo10.avif',
      description: 'Collage digital que explora la identidad de la diáspora nigeriana en Europa.'
    },
    {
      id: 11,
      title: 'Río Níger al Ocaso',
      artist: 'Amara Chukwu',
      category: 'Pintura',
      year: 2024,
      image: '/images/gallery/ejemplo11.jpg',
      description: 'Óleo de gran formato que representa el río Níger bañado en tonos dorados al atardecer.'
    },
    {
      id: 12,
      title: 'Voces de Ibadan',
      artist: 'Folake Adeyemi',
      category: 'Fotografía',
      year: 2022,
      image: '/images/gallery/ejemplo12.jpg',
      description: 'Retrato colectivo de la comunidad artística de Ibadan.'
    }
  ];

  protected readonly categories = computed(() => {
    const unique = Array.from(new Set(this.artworks.map(a => a.category)));
    return ['Todas', ...unique];
  });

  protected readonly selectedCategory = signal<string>('Todas');

  protected readonly filteredArtworks = computed(() => {
    const cat = this.selectedCategory();
    return cat === 'Todas'
      ? this.artworks
      : this.artworks.filter(a => a.category === cat);
  });

  protected readonly lightboxOpen = signal(false);
  protected readonly currentIndex = signal(0);

  protected readonly currentArtwork = computed(() => {
    const list = this.filteredArtworks();
    return list.length ? list[this.currentIndex()] : null;
  });

  selectCategory(category: string): void {
    this.selectedCategory.set(category);
  }

  openLightbox(artwork: Artwork): void {
    const index = this.filteredArtworks().findIndex(a => a.id === artwork.id);
    this.currentIndex.set(index === -1 ? 0 : index);
    this.lightboxOpen.set(true);
  }

  closeLightbox(): void {
    this.lightboxOpen.set(false);
  }

  next(): void {
    const list = this.filteredArtworks();
    if (!list.length) return;
    this.currentIndex.set((this.currentIndex() + 1) % list.length);
  }

  prev(): void {
    const list = this.filteredArtworks();
    if (!list.length) return;
    this.currentIndex.set((this.currentIndex() - 1 + list.length) % list.length);
  }

  @HostListener('document:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent): void {
    if (!this.lightboxOpen()) return;
    if (event.key === 'Escape') this.closeLightbox();
    if (event.key === 'ArrowRight') this.next();
    if (event.key === 'ArrowLeft') this.prev();
  }
}

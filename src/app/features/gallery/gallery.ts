import { Component, HostListener, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

interface Artwork {
  id: number;
  titleKey: string;        // clave de traducción, ej. 'gallery.items.i1.title'
  artist: string;          // nombre propio — no se traduce
  categoryKey: string;     // clave de traducción, ej. 'gallery.categories.painting'
  year: number;
  image: string;
  descriptionKey: string;
}

// Sentinela del filtro "todas": no es una categoría real, así que no
// se compara contra ninguna clave de obra.
const ALL = 'all';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss'
})
export class Gallery {
  private readonly translate = inject(TranslateService);

  // Datos hardcoded para Fase 1 — en Fase 2 vendrán del backend
  protected readonly artworks: Artwork[] = [
    {
      id: 1,
      titleKey: 'gallery.items.i1.title',
      artist: 'Adaeze Nwosu',
      categoryKey: 'gallery.categories.painting',
      year: 2023,
      image: 'images/gallery/ejemplo1.jpg',
      descriptionKey: 'gallery.items.i1.description'
    },
    {
      id: 2,
      titleKey: 'gallery.items.i2.title',
      artist: 'Chibueze Okafor',
      categoryKey: 'gallery.categories.sculpture',
      year: 2022,
      image: 'images/gallery/ejemplo3.jpg',
      descriptionKey: 'gallery.items.i2.description'
    },
    {
      id: 3,
      titleKey: 'gallery.items.i3.title',
      artist: 'Folake Adeyemi',
      categoryKey: 'gallery.categories.photography',
      year: 2024,
      image: 'images/gallery/ejemplo2.jpg',
      descriptionKey: 'gallery.items.i3.description'
    },
    {
      id: 4,
      titleKey: 'gallery.items.i4.title',
      artist: 'Ngozi Eze',
      categoryKey: 'gallery.categories.textile',
      year: 2023,
      image: 'images/gallery/ejemplo5.webp',
      descriptionKey: 'gallery.items.i4.description'
    },
    {
      id: 5,
      titleKey: 'gallery.items.i5.title',
      artist: 'Emeka Obi',
      categoryKey: 'gallery.categories.digital',
      year: 2024,
      image: 'images/gallery/ejemplo4.jpg',
      descriptionKey: 'gallery.items.i5.description'
    },
    {
      id: 6,
      titleKey: 'gallery.items.i6.title',
      artist: 'Amara Chukwu',
      categoryKey: 'gallery.categories.painting',
      year: 2021,
      image: 'images/gallery/ejemplo6.jfif',
      descriptionKey: 'gallery.items.i6.description'
    },
    {
      id: 7,
      titleKey: 'gallery.items.i7.title',
      artist: 'Chibueze Okafor',
      categoryKey: 'gallery.categories.sculpture',
      year: 2020,
      image: 'images/gallery/ejemplo7.jpg',
      descriptionKey: 'gallery.items.i7.description'
    },
    {
      id: 8,
      titleKey: 'gallery.items.i8.title',
      artist: 'Folake Adeyemi',
      categoryKey: 'gallery.categories.photography',
      year: 2023,
      image: 'images/gallery/ejemplo8.webp',
      descriptionKey: 'gallery.items.i8.description'
    },
    {
      id: 9,
      titleKey: 'gallery.items.i9.title',
      artist: 'Ngozi Eze',
      categoryKey: 'gallery.categories.textile',
      year: 2022,
      image: 'images/gallery/ejemplo9.jfif',
      descriptionKey: 'gallery.items.i9.description'
    },
    {
      id: 10,
      titleKey: 'gallery.items.i10.title',
      artist: 'Emeka Obi',
      categoryKey: 'gallery.categories.digital',
      year: 2023,
      image: 'images/gallery/ejemplo10.avif',
      descriptionKey: 'gallery.items.i10.description'
    },
    {
      id: 11,
      titleKey: 'gallery.items.i11.title',
      artist: 'Amara Chukwu',
      categoryKey: 'gallery.categories.painting',
      year: 2024,
      image: 'images/gallery/ejemplo11.jpg',
      descriptionKey: 'gallery.items.i11.description'
    },
    {
      id: 12,
      titleKey: 'gallery.items.i12.title',
      artist: 'Folake Adeyemi',
      categoryKey: 'gallery.categories.photography',
      year: 2022,
      image: 'images/gallery/ejemplo12.jpg',
      descriptionKey: 'gallery.items.i12.description'
    }
  ];

  // Las píldoras de filtro guardan la clave; el texto lo pone el pipe
  // en la plantilla, así el filtro activo sobrevive al cambio de idioma.
  protected readonly categories = computed(() => {
    const unique = Array.from(new Set(this.artworks.map(a => a.categoryKey)));
    return [ALL, ...unique];
  });

  protected readonly selectedCategory = signal<string>(ALL);

  protected readonly filteredArtworks = computed(() => {
    const cat = this.selectedCategory();
    return cat === ALL
      ? this.artworks
      : this.artworks.filter(a => a.categoryKey === cat);
  });

  protected readonly lightboxOpen = signal(false);
  protected readonly currentIndex = signal(0);

  protected readonly currentArtwork = computed(() => {
    const list = this.filteredArtworks();
    return list.length ? list[this.currentIndex()] : null;
  });

  // 'all' no existe en el JSON como categoría de obra, tiene su propia clave.
  protected categoryLabelKey(category: string): string {
    return category === ALL ? 'gallery.categories.all' : category;
  }

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

  // El `alt` y el aria-label necesitan el texto ya resuelto, no un binding
  // de plantilla. `instant()` lee currentLang por dentro, así que la
  // llamada se recalcula sola al cambiar de idioma.
  protected artworkTitle(artwork: Artwork): string {
    return this.translate.instant(artwork.titleKey) as string;
  }

  @HostListener('document:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent): void {
    if (!this.lightboxOpen()) return;
    if (event.key === 'Escape') this.closeLightbox();
    if (event.key === 'ArrowRight') this.next();
    if (event.key === 'ArrowLeft') this.prev();
  }
}

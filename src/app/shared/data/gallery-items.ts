// src/app/shared/data/gallery-items.ts
// Fuente única de datos de galería. La usa el preview del Home y, más
// adelante, el componente de Galería — así ambos muestran lo mismo
// sin duplicar la lista.
//
// TODO: sustituir por los datos reales de cada obra (title/artist ya
// traducidos vendrán del backend en Fase 2). Los nombres de archivo
// (ejemploN.*) ya son los definitivos en public/images/gallery/.
//
// Mientras tanto, `number` alimenta las claves de traducción
// gallery.placeholderTitle / gallery.placeholderArtist (ver home.html),
// para que el placeholder se muestre en el idioma activo.

export interface GalleryItem {
  slug: string;
  number: number;
  artist: string | null; // null = artista aún sin confirmar
  // Ruta dentro de public/images/gallery/
  image: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  { slug: 'obra-01', number: 1, artist: null, image: 'images/gallery/ejemplo1.jpg' },
  { slug: 'obra-02', number: 2, artist: null, image: 'images/gallery/ejemplo2.jpg' },
  { slug: 'obra-03', number: 3, artist: null, image: 'images/gallery/ejemplo3.jpg' },
  { slug: 'obra-04', number: 4, artist: null, image: 'images/gallery/ejemplo4.jpg' },
  { slug: 'obra-05', number: 5, artist: null, image: 'images/gallery/ejemplo5.webp' },
  { slug: 'obra-06', number: 6, artist: null, image: 'images/gallery/ejemplo6.jfif' },
  { slug: 'obra-07', number: 7, artist: null, image: 'images/gallery/ejemplo7.jpg' },
  { slug: 'obra-08', number: 8, artist: null, image: 'images/gallery/ejemplo8.webp' },
  { slug: 'obra-09', number: 9, artist: null, image: 'images/gallery/ejemplo9.jfif' },
  { slug: 'obra-10', number: 10, artist: null, image: 'images/gallery/ejemplo10.avif' },
  { slug: 'obra-11', number: 11, artist: null, image: 'images/gallery/ejemplo11.jpg' },
  { slug: 'obra-12', number: 12, artist: null, image: 'images/gallery/ejemplo12.jpg' }
];

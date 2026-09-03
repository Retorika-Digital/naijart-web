// src/app/shared/data/gallery-items.ts
// Fuente única de datos de galería. La usa el preview del Home y, más
// adelante, el componente de Galería — así ambos muestran lo mismo
// sin duplicar la lista.
//
// TODO: sustituir título y artista por los datos reales de cada obra.
// Los nombres de archivo (ejemploN.*) ya son los definitivos en
// public/images/gallery/.

export interface GalleryItem {
  slug: string;
  title: string;
  artist: string;
  // Ruta dentro de public/images/gallery/
  image: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  { slug: 'obra-01', title: 'Obra 1', artist: 'Artista por confirmar', image: 'images/gallery/ejemplo1.jpg' },
  { slug: 'obra-02', title: 'Obra 2', artist: 'Artista por confirmar', image: 'images/gallery/ejemplo2.jpg' },
  { slug: 'obra-03', title: 'Obra 3', artist: 'Artista por confirmar', image: 'images/gallery/ejemplo3.jpg' },
  { slug: 'obra-04', title: 'Obra 4', artist: 'Artista por confirmar', image: 'images/gallery/ejemplo4.jpg' },
  { slug: 'obra-05', title: 'Obra 5', artist: 'Artista por confirmar', image: 'images/gallery/ejemplo5.webp' },
  { slug: 'obra-06', title: 'Obra 6', artist: 'Artista por confirmar', image: 'images/gallery/ejemplo6.jfif' },
  { slug: 'obra-07', title: 'Obra 7', artist: 'Artista por confirmar', image: 'images/gallery/ejemplo7.jpg' },
  { slug: 'obra-08', title: 'Obra 8', artist: 'Artista por confirmar', image: 'images/gallery/ejemplo8.webp' },
  { slug: 'obra-09', title: 'Obra 9', artist: 'Artista por confirmar', image: 'images/gallery/ejemplo9.jfif' },
  { slug: 'obra-10', title: 'Obra 10', artist: 'Artista por confirmar', image: 'images/gallery/ejemplo10.avif' },
  { slug: 'obra-11', title: 'Obra 11', artist: 'Artista por confirmar', image: 'images/gallery/ejemplo11.jpg' },
  { slug: 'obra-12', title: 'Obra 12', artist: 'Artista por confirmar', image: 'images/gallery/ejemplo12.jpg' }
];

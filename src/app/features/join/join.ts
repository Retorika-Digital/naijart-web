import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

type ProfileType = 'artist' | 'collaborator';

interface JoinFormData {
  type: ProfileType;
  name: string;
  email: string;
  portfolioLink: string;
  interestArea: string;
  message: string;
}

interface Benefit {
  icon: string;
  title: string;
  description: string;
}

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

const EMPTY_FORM: JoinFormData = {
  type: 'artist',
  name: '',
  email: '',
  portfolioLink: '',
  interestArea: '',
  message: '',
};

@Component({
  selector: 'app-join',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './join.html',
  styleUrl: './join.scss',
})
export class Join {
  // ===== CONTENIDO (placeholder — sustituir por textos reales) =====

  protected readonly benefits: Benefit[] = [
    {
      icon: 'globe',
      title: 'Exposición internacional',
      description:
        'Tu obra llega a un público europeo a través de nuestras exposiciones, eventos y canales digitales.',
    },
    {
      icon: 'users',
      title: 'Comunidad',
      description:
        'Formas parte de una red de artistas y colaboradores nigerianos unidos por un mismo propósito.',
    },
    {
      icon: 'book',
      title: 'Recursos y formación',
      description:
        'Acceso a talleres, mentorías y recursos pensados para impulsar tu carrera artística o tu labor como colaborador.',
    },
    {
      icon: 'link',
      title: 'Red de contactos',
      description:
        'Conexión directa con galerías, organizadores de eventos y otras asociaciones culturales en Europa.',
    },
  ];

  protected readonly steps: ProcessStep[] = [
    {
      number: '01',
      title: 'Envía tu solicitud',
      description: 'Completa el formulario con tus datos y cuéntanos un poco sobre ti.',
    },
    {
      number: '02',
      title: 'Revisamos tu perfil',
      description: 'Nuestro equipo revisa cada solicitud con calma, sin prisas ni filtros automáticos.',
    },
    {
      number: '03',
      title: 'Te contactamos',
      description: 'Te escribimos por email para contarte los siguientes pasos.',
    },
    {
      number: '04',
      title: 'Formas parte de Naijart',
      description: 'Te damos la bienvenida a la comunidad y empezamos a construir juntos.',
    },
  ];

  protected readonly testimonials: Testimonial[] = [
    {
      quote:
        'Unirme a Naijart me abrió puertas que no sabía que existían en Europa. Hoy expongo mi obra fuera de Nigeria por primera vez.',
      name: 'Nombre Apellido',
      role: 'Artista visual',
    },
    {
      quote:
        'Como voluntaria, encontré un espacio donde mi trabajo realmente importa y donde se valora cada aportación.',
      name: 'Nombre Apellido',
      role: 'Colaboradora',
    },
    {
      quote: 'La comunidad es lo que más valoro. Nunca me he sentido sola en este camino.',
      name: 'Nombre Apellido',
      role: 'Artista textil',
    },
  ];

  protected readonly interestAreas: string[] = [
    'Diseño gráfico',
    'Organización de eventos',
    'Redes sociales',
    'Traducción',
    'Otro',
  ];

  // ===== ESTADO DEL FORMULARIO =====

  protected readonly formData = signal<JoinFormData>({ ...EMPTY_FORM });
  protected readonly formStatus = signal<'idle' | 'success'>('idle');

  protected setType(type: ProfileType): void {
    this.formData.update((data) => ({ ...data, type }));
  }

  protected updateField<K extends keyof JoinFormData>(field: K, value: JoinFormData[K]): void {
    this.formData.update((data) => ({ ...data, [field]: value }));
  }

  protected onSubmit(): void {
    // TODO (Fase 2): conectar con backend / servicio de email real.
    // Por ahora simulamos el envío para no bloquear la experiencia de usuario.
    console.log('Solicitud Únete (pendiente de backend):', this.formData());
    this.formStatus.set('success');
  }

  protected sendAnother(): void {
    this.formData.set({ ...EMPTY_FORM });
    this.formStatus.set('idle');
  }
}

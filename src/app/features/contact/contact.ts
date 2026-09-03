import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

type SubmitState = 'idle' | 'sending' | 'success' | 'error';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact {
  private fb = inject(FormBuilder);

  submitState = signal<SubmitState>('idle');

  contactForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['general', [Validators.required]],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  subjectOptions = [
    { value: 'general', label: 'Consulta general' },
    { value: 'colaboracion', label: 'Colaboración / Alianza' },
    { value: 'prensa', label: 'Prensa' },
    { value: 'otro', label: 'Otro' }
  ];

  socialLinks = [
    { name: 'Instagram', url: 'https://instagram.com/naijart' },
    { name: 'Facebook', url: 'https://facebook.com/naijart' },
    { name: 'LinkedIn', url: 'https://linkedin.com/company/naijart' }
  ];

  scheduleRows = [
    { day: 'Lunes – Viernes', hours: '9:00 – 18:00 (CET)' },
    { day: 'Sábado', hours: '10:00 – 14:00 (CET)' },
    { day: 'Domingo', hours: 'Cerrado' }
  ];

  get name() { return this.contactForm.get('name'); }
  get email() { return this.contactForm.get('email'); }
  get message() { return this.contactForm.get('message'); }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.submitState.set('sending');

    // TODO Fase 2: sustituir simulación por llamada real al backend.
    setTimeout(() => {
      this.submitState.set('success');
      this.contactForm.reset({ subject: 'general' });

      setTimeout(() => this.submitState.set('idle'), 5000);
    }, 1400);
  }
}

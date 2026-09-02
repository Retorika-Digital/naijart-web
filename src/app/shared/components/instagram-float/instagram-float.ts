import { Component } from '@angular/core';

@Component({
  selector: 'app-instagram-float',
  standalone: true,
  templateUrl: './instagram-float.html',
  styleUrl: './instagram-float.scss',
})
export class InstagramFloat {
  // Sustituye por la cuenta real del cliente
  protected readonly instagramUrl = 'https://instagram.com/naijart';
}

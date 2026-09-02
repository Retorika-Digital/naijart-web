import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { Footer } from './layout/footer/footer';
import { InstagramFloat } from './shared/components/instagram-float/instagram-float';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, Footer, InstagramFloat],

  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = 'naijart';
}

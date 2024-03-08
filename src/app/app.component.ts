import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { env } from './env/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor() {
    console.log(env);
  }
}

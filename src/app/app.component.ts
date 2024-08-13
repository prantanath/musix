import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TopTracksComponent} from "./top-tracks/top-tracks.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TopTracksComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'musix';
}

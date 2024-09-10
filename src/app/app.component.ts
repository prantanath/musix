import {Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TopTracksComponent} from "./top-tracks/top-tracks.component";
import {CustomDurationPipe} from "./custom-duration.pipe";
import {ToggleDarkModeComponent} from "./toggle-dark-mode/toggle-dark-mode.component";
import {ThemeService} from "./services/theme.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TopTracksComponent, CustomDurationPipe, ToggleDarkModeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  themeService = inject(ThemeService);

  title = 'musix';

  ngOnInit(): void {
    this.themeService.loadTheme();
  }
}

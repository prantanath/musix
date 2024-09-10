import {Component, inject} from '@angular/core';
import {ThemeService} from "../services/theme.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-toggle-dark-mode',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './toggle-dark-mode.component.html',
  styleUrl: './toggle-dark-mode.component.css'
})
export class ToggleDarkModeComponent {
  themeService = inject(ThemeService);

  toggleTheme(){
    this.themeService.toggleDarkMode();
  }

  isDarkMode(){
    return this.themeService.isDarkMode();
  }
}

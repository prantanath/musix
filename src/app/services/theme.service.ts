import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkModeClass = 'dark';

  constructor() { }

  enableDarkMode(){
    document.documentElement.classList.add(this.darkModeClass);
    localStorage.setItem('theme','dark');
  }

  disableDarkMode(){
    document.documentElement.classList.remove(this.darkModeClass);
    localStorage.setItem('theme','light');
  }

  isDarkMode(){
    return document.documentElement.classList.contains(this.darkModeClass);
  }

  toggleDarkMode(){
    if(this.isDarkMode()){
      this.disableDarkMode();
    }
    else{
      this.enableDarkMode();
    }
  }

  loadTheme(){
    const theme = localStorage.getItem('theme');
    if(theme === 'dark'){
      this.enableDarkMode();
    }
    else{
      this.disableDarkMode();
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, TranslateModule], // ← Añadir TranslateModule
  templateUrl: './button.html',
  styleUrls: ['./button.css']
})
export class Button implements OnInit { // ← Implementar OnInit
  currentLang: string = 'en';

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('en');
  }

  toggleLanguage() {
    const newLang = this.currentLang === 'en' ? 'es' : 'en';
    this.switchLanguage(newLang);
  }

  switchLanguage(lang: string) {
    this.translate.use(lang).subscribe({
      next: () => {
        this.currentLang = lang;
        localStorage.setItem('preferredLanguage', lang);
        document.documentElement.lang = lang;
      },
      error: (err) => {
        console.error('Error changing language:', err);
        // Fallback to default language
        this.translate.use('en');
        this.currentLang = 'en';
      }
    });
  }

  ngOnInit() {
    // 1. Intentar obtener el idioma guardado
    const savedLang = localStorage.getItem('preferredLanguage');

    // 2. Si no hay guardado, usar el idioma del navegador
    const browserLang = this.translate.getBrowserLang();

    // 3. Definir el idioma a usar (prioridad: saved > browser > default)
    const langToUse = savedLang && ['en', 'es'].includes(savedLang)
      ? savedLang
      : (browserLang && ['en', 'es'].includes(browserLang))
        ? browserLang
        : 'en';

    this.switchLanguage(langToUse);
  }
}
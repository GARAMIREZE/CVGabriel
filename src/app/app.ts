import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { TranslateService } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  title = 'Gabriel';

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
    if (browserLang && ['en', 'es'].includes(browserLang)) {
      translate.use(browserLang);
    }
  }
}
import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {registerLocaleData} from "@angular/common";
import localeDeCh from '@angular/common/locales/de-CH';
import localeDeChExtra from '@angular/common/locales/extra/de-CH';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterOutlet]
})
export class AppComponent {
  constructor() {
    registerLocaleData(localeDeCh, 'de-CH', localeDeChExtra);
  }
}

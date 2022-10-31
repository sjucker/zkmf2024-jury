import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from './login/login.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {AuthenticationInterceptor} from "./interceptors/authentication-interceptor.service";
import {MainComponent} from "./main/main.component";
import {MatIconModule} from "@angular/material/icon";
import {HeaderComponent} from "./header/header.component";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatProgressBarModule} from "@angular/material/progress-bar";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressBarModule,
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true},],
  bootstrap: [AppComponent]
})
export class AppModule {
}

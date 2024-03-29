import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from './login/login.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
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
import {ActionButtonComponent} from "./components/action-button/action-button.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatDividerModule} from "@angular/material/divider";
import {ReportComponent} from './report/report.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {ReportFinishComponent} from './report-finish/report-finish.component';
import {MatDialogModule} from "@angular/material/dialog";
import {ReportRatingComponent} from './report-rating/report-rating.component';
import {SummaryComponent} from './summary/summary.component';
import {PendingChangesDialogComponent} from './pending-changes-dialog/pending-changes-dialog.component';
import {registerLocaleData} from "@angular/common";
import {ReportCardComponent} from "./components/report-card/report-card.component";
import {ModulDComponent} from "./modul-d/modul-d.component";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {ReportScoreComponent} from "./report-score/report-score.component";
import {RankingComponent} from "./ranking/ranking.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    HeaderComponent,
    ActionButtonComponent,
    ReportComponent,
    ReportFinishComponent,
    ReportRatingComponent,
    ReportScoreComponent,
    SummaryComponent,
    PendingChangesDialogComponent,
    ReportCardComponent,
    ModulDComponent,
    RankingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSlideToggle,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true},
    {provide: LOCALE_ID, useValue: 'de-DE'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    registerLocaleData(localeDe, 'de-DE', localeDeExtra);
  }
}

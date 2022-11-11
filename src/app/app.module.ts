import { MatDialogModule } from '@angular/material/dialog';
import { ChangePasswordModal } from './components/modals/change-password/change-password-modal.component';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from './modules/shared/shared.module';

//Componentes
import {LoginComponent} from './components/login/login.component';
import {MainLayoutComponent} from './components/main-layout/main-layout.component';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "./guards/auth.interceptor";
import {NotFoundComponent} from './components/not-found/not-found.component';
import {HIGHLIGHT_OPTIONS, HighlightModule} from "ngx-highlightjs";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainLayoutComponent,
    NotFoundComponent,
    ChangePasswordModal
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,

    // material
    MatDialogModule
  ],
  exports: [
    SharedModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

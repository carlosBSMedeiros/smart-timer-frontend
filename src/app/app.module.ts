import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AtividadesComponent } from './pages/atividades/atividades.component';
import { HttpClientModule } from '@angular/common/http';
import { CardAtividadeComponent } from './components/card-atividade/card-atividade.component';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClock, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';

@NgModule({
  declarations: [
    AppComponent,
    AtividadesComponent,
    CardAtividadeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(library: FaIconLibrary) {
    library.addIcons(faClock);
    library.addIcons(faPlay);
    library.addIcons(faPause);
  }

 }

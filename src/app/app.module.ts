import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AtividadesComponent } from './pages/atividades/atividades.component';
import { HttpClientModule } from '@angular/common/http';
import { CardAtividadeComponent } from './components/card-atividade/card-atividade.component';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClock, faPause, faPlay, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


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
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(library: FaIconLibrary) {
    library.addIcons(faClock);
    library.addIcons(faPlay);
    library.addIcons(faPause);
    library.addIcons(faPlus);
  }

 }

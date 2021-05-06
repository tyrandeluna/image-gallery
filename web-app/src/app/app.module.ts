import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ManterGaleriaComponent } from './galeria/manter-galeria/manter-galeria.component';
import { HomeCarouselComponent } from './home/home-carousel/home-carousel.component';

import { GaleriaService } from './servicos/galeria/galeria.service';

@NgModule({
  declarations: [
    AppComponent,
    ManterGaleriaComponent,
    HomeCarouselComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [
    GaleriaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

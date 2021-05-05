import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ManterGaleriaComponent } from './galeria/manter-galeria/manter-galeria.component';
import { HomeCarouselComponent } from './home/home-carousel/home-carousel.component';

@NgModule({
  declarations: [
    AppComponent,
    ManterGaleriaComponent,
    HomeCarouselComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeCarouselComponent } from './home/home-carousel/home-carousel.component';
import { ManterGaleriaComponent } from './galeria/manter-galeria/manter-galeria.component';

const routes: Routes = [
  {path: 'home/homecarousel', component: HomeCarouselComponent},
  {path: 'galeria/manter-galeria', component: ManterGaleriaComponent},
  {path: 'galeria/manter-galeria/:id', component: ManterGaleriaComponent},
  {path: '', component: HomeCarouselComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

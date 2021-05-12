import { Component, OnInit } from '@angular/core';
import { ConfigClass } from 'src/app/classes/config-class';
import { GaleriaService } from 'src/app/servicos/galeria/galeria.service';

@Component({
  selector: 'app-home-carousel',
  templateUrl: './home-carousel.component.html',
  styleUrls: ['./home-carousel.component.scss']
})
export class HomeCarouselComponent implements OnInit {
  imagens: any;

  server: string = ConfigClass.getUrlApi().toString();

  constructor(private galeriaService: GaleriaService) { }

  ngOnInit() {
    this.galeriaService.getTodos().subscribe(res => {
      this.imagens = res.body.dados.map(function(objeto) {
        return { 
          id_galeria: objeto.id_galeria, 
          titulo: objeto.titulo, 
          caminho: this + (objeto.caminho ? objeto.caminho.substring(1) : objeto.caminho)
        }
      }, this.server);

      console.log(this.imagens)
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { ConfigClass } from 'src/app/classes/config-class';
import { GaleriaService } from 'src/app/servicos/galeria/galeria.service';

@Component({
  selector: 'app-manter-galeria',
  templateUrl: './manter-galeria.component.html',
  styleUrls: ['./manter-galeria.component.scss']
})
export class ManterGaleriaComponent implements OnInit {

  exibirListagemForm: boolean = false;
  listImgGaleria: any;
  mensagem: any;

  server: string = ConfigClass.getUrlApi().toString();

  constructor(private galeriaService: GaleriaService) { }

  ngOnInit() {
    this.listar();
  }

  listar(): void {
    this.galeriaService.getTodos().subscribe(res => {
      if(res.body.erro) {
        this.montarMsg(res.body.msg, false);
      } else {
        this.listImgGaleria = res.body.dados.map(function(objeto) {
          return { 
            id_galeria: objeto.id_galeria, 
            titulo: objeto.titulo, 
            caminho: this + (objeto.caminho ? objeto.caminho.substring(1) : objeto.caminho)
          }
        }, this.server);
        res.body.msg ? this.montarMsg(res.body.msg, true) : this.montarMsg('Sucesso!', true);
      }
    }, error => {
      this.montarMsg('Erro ao realizar a requisição!', false);
    });
  }

  montarMsg(mensagem: string, isSucesso: boolean) {
    isSucesso ? this.mensagem = `<div class="alert alert-success" role="alert"><strong>${mensagem}</strong></div>` :
    this.mensagem = `<div class="alert alert-danger" role="alert"><strong>${mensagem}</strong></div>`;
  }

  limpartMsgAlert() {
    this.mensagem = '';
  }
}

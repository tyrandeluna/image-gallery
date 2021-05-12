import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
  imagemUrl: any;

  galeriaFormGroup: any;
  registro: any = {};

  server: string = ConfigClass.getUrlApi().toString();

  constructor(private galeriaService: GaleriaService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.galeriaFormGroup = this.formBuilder.group({
      id_galeria: [{value: null, disabled: true}],
      titulo: [],
      dados_imagem: null
    });

    this.listar();
  }

  prepararFormCadastro() {
    this.limpartMsgAlert();
    this.exibirListagemForm = true;
  }

  onSubmit() {
    if(this.registro.id_galeria){
      this.editar(this.galeriaFormGroup.value);
    } else {
      this.cadastrar(this.galeriaFormGroup.value);
    }
  }

  deletar(id: number) {
    this.galeriaService.deletar(id).subscribe( res => {
      this.listar();
      console.log(res.body.msg);
      this.montarMsg(res.body.msg, true);
    }, error => {
      this.montarMsg('Erro ao realizar a requisição!', false);
    })
  }

  editar(dados: any) {
    if(dados.dados_imagem){
      dados.id_galeria = this.registro.id_galeria;
      this.galeriaService.editar(dados).subscribe(res => {
        
        this.limparForm();
        this.listar();
        this.exibirListagemForm = false;
        this.montarMsg(res.body.msg, true);
      }, error => {
        this.montarMsg('Erro ao realizar a requisição!', false);
      })
    } else {
      this.montarMsg('Por favor, envie uma imagem!', false);
    }
  }

  cadastrar(dados: any) {
    this.galeriaService.cadastrar(dados).subscribe(res => {
      this.limparForm();
      this.listar();
      this.exibirListagemForm = false;
      this.montarMsg(res.body.msg, true);
    }, error => {
      this.montarMsg('Erro ao realizar a requisição!', false);
    })
  }

  editarForm(id: number): void {
    this.exibirListagemForm = true;

    this.galeriaService.getId(id).subscribe(res => {
      this.registro.id_galeria = res.body.dados[0].id_galeria;
      this.registro.titulo = res.body.dados[0].titulo;

      if(res.body.dados[0].caminho != null) {
        this.imagemUrl = this.server + res.body.dados[0].caminho.substring(1);
      }
    }, error => {
      this.montarMsg('Erro ao realizar a requisição!', false);
    })
  }

  limparForm() {
    this.galeriaFormGroup.reset();
    let formHTML = <HTMLFormElement>document.getElementById('galeriaForm');
    formHTML.reset();
    this.imagemUrl = null;
  }

  carregarImagem(event) {
    if(event.target.files.length > 0) {
      let campoUploadImagem = event.target;
      const leitor = new FileReader();
      const arquivo = campoUploadImagem.files[0];
      leitor.readAsDataURL(arquivo);
      leitor.onload = () => {
        const dataUrl = leitor.result;
        this.imagemUrl = dataUrl;

        this.galeriaFormGroup.get('dados_imagem').setValue({
          nome_arquivo: arquivo.name,
          tipo_arquivo: arquivo.type,
          imagem_base64: (<string>leitor.result).split(',')[1]
        })
      }
    }
  }

  cancelar(){
    this.exibirListagemForm = false;
    this.limparForm();
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

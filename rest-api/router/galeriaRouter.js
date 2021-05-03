let express = require('express');
let router = express.Router();

let GaleriaModel = require('../model/galeria/GaleriaModel');
let RespostaClass = require('../model/RespostaClass');

let fs = require('fs');
let pastaPublica = './public/imagens/';

router.get('/', function(req, res, next) {
    GaleriaModel.getTodos(function(erro, retorno){
        let resposta = new RespostaClass();

        if(erro) {
            resposta.erro = true;
            resposta.msg = 'Ocorreu um erro.';
        } else {
            resposta.dados = retorno;
        }

        res.json(resposta);
    });
})

router.get('/:id?', function(req, res, next) {
    GaleriaModel.getId(req.params.id, function(erro, retorno){
        let resposta = new RespostaClass();

        if(erro) {
            resposta.erro = true;
            resposta.msg = 'Ocorreu um erro.';
        } else {
            resposta.dados = retorno;
        }

        res.json(resposta);
    });
})

router.post('/?', function(req, res, next) {
    let resposta = new RespostaClass();

    if(req.body.dados_imagem != null) {
        let bitmap = new Buffer.from(req.body.dados_imagem.imagem_base64, 'base64');

        let dataAtual = new Date().toLocaleString().replace(/\//g, '')
        .replace(/:/g, '').replace(/-/g, '').replace(/ /g, '');
        
        let nomeImagemCaminho = pastaPublica + dataAtual + req.body.dados_imagem.nome_arquivo;
        fs.writeFileSync(nomeImagemCaminho, bitmap);
        req.body.caminho = nomeImagemCaminho;

        GaleriaModel.adicionar(req.body, function(erro, retorno){

            if(erro) {
                resposta.erro = true;
                resposta.msg = 'Ocorreu um erro.';
            } else {
                if(retorno.affectedRows > 0) {
                    resposta.msg = 'Cadastro realizado com sucesso.';
                } else {
                    resposta.erro = true;
                    resposta.msg = 'Não foi possível realizar a operação.';
                }
            }
            console.log('res:', resposta);
            res.json(resposta);
        });
    } else {
        resposta.erro = true;
        resposta.msg = 'Não foi enviado uma imagem.';
        console.log('erro: ', resposta.msg);
        res.json(resposta);
    }

})

router.put('/', function(req, res, next) {
    let resposta = new RespostaClass();

    if(req.body.dados_imagem != null) {
        let bitmap = new Buffer.from(req.body.dados_imagem.imagem_base64, 'base64');

        let dataAtual = new Date().toLocaleString().replace(/\//g, '')
        .replace(/:/g, '').replace(/-/g, '').replace(/ /g, '');
        
        let nomeImagemCaminho = pastaPublica + dataAtual + req.body.dados_imagem.nome_arquivo;
        fs.writeFileSync(nomeImagemCaminho, bitmap);
        req.body.caminho = nomeImagemCaminho;

    }

    GaleriaModel.editar(req.body, function(erro, retorno){

        if(erro) {
            resposta.erro = true;
            resposta.msg = 'Ocorreu um erro.';
            console.log('erro:', erro);
        } else {
            if(retorno.affectedRows > 0) {
                resposta.msg = 'Registro atualizado com sucesso.';
            } else {
                resposta.erro = true;
                resposta.msg = 'Não foi possível alterar o registro.';
                console.log('erro:', erro);
            }
        }
        console.log('res:', resposta);
        res.json(resposta);
    });

})

router.delete('/:id?', function(req, res, next) {
    GaleriaModel.deletar(req.params.id, function(erro, retorno){
        let resposta = new RespostaClass();

        if(erro) {
            resposta.erro = true;
            resposta.msg = 'Ocorreu um erro.';
        } else {
            if(retorno.affectedRows > 0) {
                resposta.msg = 'Registro excluído com sucesso.';
            } else {
                resposta.erro = true;
                resposta.msg = 'Não foi possível excluir registro.';
                console.log('erro:', erro);
            }
            resposta.dados = retorno;
        }

        res.json(resposta);
    });
})

module.exports = router;
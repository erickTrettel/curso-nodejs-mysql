var express = require("express");
var router = express.Router();
var PortfolioModel = require("../model/portfolio/PortfolioModel");
var RespostaClass = require("../model/RespostaClass");

router.get("/", (req, res, next) => {
  PortfolioModel.getTodos(function(erro, retorno) {
    let resposta = new RespostaClass();

    if (erro) {
      resposta.erro = true;
      resposta.msg = "Ocorreu um erro";
      console.log("erro: ", erro);
    } else {
      resposta.dados = retorno;
    }

    res.json(resposta);
  });
});

router.get("/:id", (req, res, next) => {
  PortfolioModel.getId(req.params.id, (erro, retorno) => {
    let resposta = new RespostaClass();

    if (erro) {
      resposta.erro = true;
      resposta.msg = "Ocorreu um erro";
      console.log("erro", erro);
    } else {
      resposta.dados = retorno;
    }

    res.json(resposta);
  });
});

router.post("/", (req, res, next) => {
  const portfolio = req.body;
  PortfolioModel.adicionar(portfolio, (erro, retorno) => {
    let resposta = new RespostaClass();

    if (erro) {
      resposta.erro = true;
      resposta.msg = "Ocorreu um erro";
      console.log("erro", erro);
    } else {
      if (retorno.affectedRows > 0) {
        resposta.msg = "Cadastro realizado com sucesso";
      } else {
        resposta.erro = true;
        resposta.msg = "Não foi possível realizar a operação";
      }
    }

    console.log("resp: ", resposta);
    res.json(resposta);
  });
});

router.delete("/:id", (req, res, next) => {
  PortfolioModel.deletar(req.params.id, (erro, retorno) => {
    let resposta = new RespostaClass();

    if (erro) {
      resposta.erro = true;
      resposta.msg = "Ocorreu um erro";
      console.log("erro", erro);
    } else {
      if (retorno.affectedRows > 0) {
        resposta.msg = "registro removido com sucesso";
      } else {
        resposta.erro = true;
        resposta.msg = "não foi possível realizar a operação";
      }
    }

    res.json(resposta);
  });
});

router.put("/:id", (req, res, next) => {
  const portfolio = {
    ...req.body,
    id: req.params.id
  };
  PortfolioModel.editar(portfolio, (erro, retorno) => {
    let resposta = new RespostaClass();

    if (erro) {
      resposta.erro = true;
      resposta.msg = "Ocorreu um erro";
      console.log("erro", erro);
    } else {
      if(retorno.affectedRows > 0) {
        resposta.msg = "registro atualizado com sucesso";
      } else {
        resposta.erro = true;
        resposta.msg = "não foi possível atualizar o registro"
      }
    }

    res.json(resposta)
  });
});

module.exports = router;

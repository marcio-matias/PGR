console.log("PGR iniciado com sucesso.");

let listaGhe = [];
let listaMatrizEpi = [];

function mostrarSecao(idSecao) {
  const secoes = document.querySelectorAll(".card");

  secoes.forEach((secao) => {
    secao.classList.remove("ativo");
  });

  document.getElementById(idSecao).classList.add("ativo");
}

function adicionarAoDocumento(titulo, conteudo) {
  const documento = document.getElementById("conteudoDocumentoBase");

  documento.innerHTML += `
    <hr>
    <h3>${titulo}</h3>
    ${conteudo}
  `;
}

function adicionarHistoricoAoDocumentoBase() {
  adicionarAoDocumento("Histórico de Revisões", document.getElementById("tabelaHistorico").outerHTML);
  alert("Histórico adicionado ao Documento Base.");
}

function adicionarContratanteAoDocumentoBase() {
  const html = `
    <p><strong>Razão social:</strong> ${document.getElementById("razaoContratante").value}</p>
    <p><strong>Nome fantasia:</strong> ${document.getElementById("fantasiaContratante").value}</p>
    <p><strong>CNPJ:</strong> ${document.getElementById("cnpjContratante").value}</p>
    <p><strong>Inscrição estadual:</strong> ${document.getElementById("ieContratante").value}</p>
    <p><strong>Inscrição municipal:</strong> ${document.getElementById("imContratante").value}</p>
    <p><strong>Endereço:</strong> ${document.getElementById("enderecoContratante").value}</p>
    <p><strong>Cidade/UF:</strong> ${document.getElementById("cidadeContratante").value}/${document.getElementById("ufContratante").value}</p>
    <p><strong>Responsável:</strong> ${document.getElementById("responsavelContratante").value}</p>
    <p><strong>Telefone:</strong> ${document.getElementById("telefoneContratante").value}</p>
    <p><strong>E-mail:</strong> ${document.getElementById("emailContratante").value}</p>
    <p><strong>Área de abrangência:</strong> ${document.getElementById("areaContratante").value}</p>
    <p><strong>Nome do fiscal:</strong> ${document.getElementById("fiscalContratante").value}</p>
    <p><strong>Chave do fiscal:</strong> ${document.getElementById("chaveFiscalContratante").value}</p>
    <p><strong>Gerência:</strong> ${document.getElementById("gerenciaContratante").value}</p>
  `;

  adicionarAoDocumento("Empresa Contratante", html);
  alert("Contratante adicionada ao Documento Base.");
}

function adicionarContratadaAoDocumentoBase() {
  const html = `
    <p><strong>Razão social:</strong> ${document.getElementById("razaoContratada").value}</p>
    <p><strong>Nome fantasia:</strong> ${document.getElementById("fantasiaContratada").value}</p>
    <p><strong>CNPJ:</strong> ${document.getElementById("cnpjContratada").value}</p>
    <p><strong>Inscrição estadual:</strong> ${document.getElementById("ieContratada").value}</p>
    <p><strong>Inscrição municipal:</strong> ${document.getElementById("imContratada").value}</p>
    <p><strong>Endereço:</strong> ${document.getElementById("enderecoContratada").value}</p>
    <p><strong>Cidade/UF:</strong> ${document.getElementById("cidadeContratada").value}/${document.getElementById("ufContratada").value}</p>
    <p><strong>Responsável:</strong> ${document.getElementById("responsavelContratada").value}</p>
    <p><strong>Telefone:</strong> ${document.getElementById("telefoneContratada").value}</p>
    <p><strong>E-mail:</strong> ${document.getElementById("emailContratada").value}</p>
  `;

  adicionarAoDocumento("Empresa Contratada", html);
  alert("Contratada adicionada ao Documento Base.");
}

function adicionarDadosPgrAoDocumentoBase() {
  const html = `
    <p><strong>Contratante:</strong> ${document.getElementById("pgrContratante").value}</p>
    <p><strong>Contratada:</strong> ${document.getElementById("pgrContratada").value}</p>
    <p><strong>Unidade/local:</strong> ${document.getElementById("pgrUnidade").value}</p>
    <p><strong>Responsável pelo PGR:</strong> ${document.getElementById("pgrResponsavel").value}</p>
    <p><strong>Data de elaboração:</strong> ${document.getElementById("pgrData").value}</p>
    <p><strong>Descrição/escopo:</strong> ${document.getElementById("pgrEscopo").value}</p>
  `;

  adicionarAoDocumento("Dados do PGR", html);
  alert("Dados do PGR adicionados ao Documento Base.");
}

function adicionarTextoBaseAoDocumentoBase() {
  const texto = document.getElementById("textoBasePgr").value;
  adicionarAoDocumento("Texto Base do PGR", `<p>${texto}</p>`);
  alert("Texto base adicionado ao Documento Base.");
}

function adicionarGhe() {
  const codigo = document.getElementById("codigoGhe").value;
  const setor = document.getElementById("setorGhe").value;
  const cargo = document.getElementById("cargoGhe").value;
  const atividades = document.getElementById("atividadesGhe").value;

  if (!codigo || !setor || !cargo || !atividades) {
    alert("Preencha todos os campos do GES/GHE.");
    return;
  }

  listaGhe.push({ codigo, setor, cargo, atividades });

  const tabela = document.querySelector("#tabelaGhe tbody");
  const linha = tabela.insertRow();

  linha.innerHTML = `
    <td>${codigo}</td>
    <td>${setor}</td>
    <td>${cargo}</td>
    <td>${atividades}</td>
  `;

  document.getElementById("codigoGhe").value = "";
  document.getElementById("setorGhe").value = "";
  document.getElementById("cargoGhe").value = "";
  document.getElementById("atividadesGhe").value = "";
}

function adicionarGheAoDocumentoBase() {
  adicionarAoDocumento("GES/GHE", document.getElementById("tabelaGhe").outerHTML);
  alert("GES/GHE adicionado ao Documento Base.");
}

function adicionarRisco() {
  const gesGhe = document.getElementById("gesGheRisco").value;
  const setor = document.getElementById("setorRisco").value;
  const funcao = document.getElementById("funcaoRisco").value;
  const atividade = document.getElementById("atividadeRisco").value;
  const perigo = document.getElementById("perigoRisco").value;
  const tipo = document.getElementById("tipoRisco").value;
  const agravos = document.getElementById("agravosRisco").value;
  const causas = document.getElementById("causasRisco").value;
  const controles = document.getElementById("controlesRisco").value;
  const epis = document.getElementById("episRisco").value;
  const populacao = document.getElementById("populacaoRisco").value;
  const exposicao = document.getElementById("exposicaoRisco").value;
  const tipoAvaliacao = document.getElementById("tipoAvaliacaoRisco").value;
  const probabilidade = Number(document.getElementById("probabilidadeRisco").value);
  const severidade = Number(document.getElementById("severidadeRisco").value);

  if (!gesGhe || !funcao || !atividade || !perigo || !tipo || !probabilidade || !severidade) {
    alert("Preencha pelo menos GES/GHE, função, atividade, perigo, tipo, probabilidade e severidade.");
    return;
  }

  const risco = probabilidade * severidade;
  const classificacao = classificarRisco(risco);
  const monitoramento = definirMonitoramento(classificacao);

  const tabela = document.querySelector("#tabelaInventario tbody");
  const linha = tabela.insertRow();

  linha.innerHTML = `
    <td>${gesGhe}</td>
    <td>${setor}</td>
    <td>${funcao}</td>
    <td>${atividade}</td>
    <td>${perigo}</td>
    <td>${tipo}</td>
    <td>${agravos}</td>
    <td>${causas}</td>
    <td>${controles}</td>
    <td>${epis}</td>
    <td>${populacao}</td>
    <td>${exposicao}</td>
    <td>${tipoAvaliacao}</td>
    <td>${probabilidade}</td>
    <td>${severidade}</td>
    <td>${risco}</td>
    <td>${classificacao}</td>
    <td>${monitoramento}</td>
    <td>
      <button onclick="criarAcao('${perigo}', '${gesGhe}')">Criar ação</button>
      <button onclick="criarTreinamento('${perigo}', '${gesGhe}')">Criar treinamento</button>
    </td>
  `;

  limparCamposInventario();
}

function classificarRisco(risco) {
  if (risco <= 4) {
    return "Baixo";
  }

  if (risco <= 9) {
    return "Médio";
  }

  if (risco <= 16) {
    return "Alto";
  }

  return "Crítico";
}

function definirMonitoramento(classificacao) {
  if (classificacao === "Baixo") {
    return "Manter controles existentes";
  }

  if (classificacao === "Médio") {
    return "Monitorar periodicamente";
  }

  if (classificacao === "Alto") {
    return "Implantar ações de controle";
  }

  return "Ação imediata necessária";
}

function limparCamposInventario() {
  document.getElementById("gesGheRisco").value = "";
  document.getElementById("setorRisco").value = "";
  document.getElementById("funcaoRisco").value = "";
  document.getElementById("atividadeRisco").value = "";
  document.getElementById("perigoRisco").value = "";
  document.getElementById("tipoRisco").value = "";
  document.getElementById("agravosRisco").value = "";
  document.getElementById("causasRisco").value = "";
  document.getElementById("controlesRisco").value = "";
  document.getElementById("episRisco").value = "";
  document.getElementById("populacaoRisco").value = "";
  document.getElementById("exposicaoRisco").value = "";
  document.getElementById("tipoAvaliacaoRisco").value = "";
  document.getElementById("probabilidadeRisco").value = "";
  document.getElementById("severidadeRisco").value = "";
}



function criarTreinamento(perigo, ghe) {
  const tabela = document.querySelector("#tabelaPlanoTreinamento tbody");
  const linha = tabela.insertRow();

  linha.innerHTML = `
    <td>${ghe} - ${perigo}</td>
    <td contenteditable="true">Treinamento relacionado ao risco: ${perigo}</td>
    <td contenteditable="true">${ghe}</td>
    <td contenteditable="true">Anual</td>
    <td contenteditable="true">Pendente</td>
  `;
}

function adicionarInventarioAoDocumentoBase() {
  adicionarAoDocumento("Inventário de Riscos", document.getElementById("tabelaInventario").outerHTML);
  alert("Inventário adicionado ao Documento Base.");
}

function adicionarEpiMatriz() {
  const ghe = document.getElementById("gheEpi").value;
  const tipo = document.getElementById("tipoEpi").value;
  const descricao = document.getElementById("descricaoEpi").value;
  const ca = document.getElementById("caEpi").value;
  const validadeCa = document.getElementById("validadeCaEpi").value;
  const periodicidade = document.getElementById("periodicidadeEpi").value;

  if (!ghe || !tipo || !descricao || !ca) {
    alert("Preencha GHE, tipo de EPI, descrição do EPI e CA.");
    return;
  }

  listaMatrizEpi.push({ ghe, tipo, descricao, ca, validadeCa, periodicidade });

  const tabela = document.querySelector("#tabelaMatrizEpi tbody");
  const linha = tabela.insertRow();

  linha.innerHTML = `
    <td>${ghe}</td>
    <td>${tipo}</td>
    <td>${descricao}</td>
    <td>${ca}</td>
    <td>${validadeCa}</td>
    <td>${periodicidade}</td>
  `;
}

function adicionarMatrizEpiAoDocumentoBase() {
  adicionarAoDocumento("Matriz de EPI", document.getElementById("tabelaMatrizEpi").outerHTML);
  alert("Matriz de EPI adicionada ao Documento Base.");
}

function adicionarPlanoAcaoAoDocumentoBase() {
  adicionarAoDocumento("Plano de Ação", document.getElementById("tabelaPlanoAcao").outerHTML);
  alert("Plano de Ação adicionado ao Documento Base.");
}

function adicionarPlanoTreinamentoAoDocumentoBase() {
  adicionarAoDocumento("Plano de Treinamento", document.getElementById("tabelaPlanoTreinamento").outerHTML);
  alert("Plano de Treinamento adicionado ao Documento Base.");
}
function imprimirTabela(idTabela, titulo) {
  const tabela = document.getElementById(idTabela);

  if (!tabela) {
    alert("Tabela não encontrada.");
    return;
  }

  const janelaImpressao = window.open("", "", "width=1000,height=700");

  janelaImpressao.document.write(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <title>${titulo}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 20px;
          color: #1f2933;
        }

        h1 {
          text-align: center;
          color: #0f2f4a;
          margin-bottom: 22px;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13px;
        }

        th {
          background: #0f2f4a;
          color: white;
        }

        th,
        td {
          border: 1px solid #333;
          padding: 6px;
          text-align: left;
          vertical-align: top;
        }

        @page {
          size: A4 landscape;
          margin: 10mm;
        }
      </style>
    </head>
    <body>
      <h1>${titulo}</h1>
      ${tabela.outerHTML}
    </body>
    </html>
  `);

  janelaImpressao.document.close();
  janelaImpressao.focus();
  janelaImpressao.print();
}
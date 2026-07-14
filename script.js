console.log("PGR iniciado com sucesso.");

let listaGhe = [];
let listaMatrizEpi = [];
let linhaHistoricoSelecionada = null;
let dadosCnpjContratante = null;
let dadosCnpjContratada = null;

function pegarValor(id) {
  const campo = document.getElementById(id);
  return campo ? campo.value : "";
}

function limparCampo(id) {
  const campo = document.getElementById(id);

  if (campo) {
    campo.value = "";
  }
}

function textoSeguro(texto) {
  return String(texto || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function atributoSeguro(texto) {
  return String(texto || "")
    .replaceAll("\\", "\\\\")
    .replaceAll("'", "\\'")
    .replaceAll('"', "&quot;")
    .replaceAll("\n", " ");
}

function mostrarSecao(idSecao) {
  const secoes = document.querySelectorAll(".card");

  secoes.forEach((secao) => {
    secao.classList.remove("ativo");
  });

  const secaoEscolhida = document.getElementById(idSecao);

  if (!secaoEscolhida) {
    alert("Seção não encontrada: " + idSecao);
    return;
  }

  secaoEscolhida.classList.add("ativo");
}

function adicionarAoDocumento(titulo, conteudo) {
  const documento = document.getElementById("conteudoDocumentoBase");

  if (!documento) {
    alert("Documento Base não encontrado.");
    return;
  }

  documento.innerHTML += `
    <hr>
    <h3>${titulo}</h3>
    ${conteudo}
  `;
}

function montarEnderecoCompleto(dados) {
  const partes = [
    dados.descricao_tipo_de_logradouro,
    dados.logradouro,
    dados.complemento,
    dados.bairro
  ];

  return partes.filter(Boolean).join(", ");
}

async function consultarCnpj(cnpj) {
  const resposta = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`);

  if (!resposta.ok) {
    throw new Error("CNPJ não encontrado.");
  }

  return await resposta.json();
}

async function buscarCnpjContratante() {
  const cnpj = pegarValor("contratanteCnpj").replace(/\D/g, "");

  if (cnpj.length !== 14) {
    alert("Digite um CNPJ válido com 14 números.");
    return;
  }

  try {
    const dados = await consultarCnpj(cnpj);
    dadosCnpjContratante = dados;

    document.getElementById("contratanteRazao").value = dados.razao_social || "";
    document.getElementById("contratanteFantasia").value = dados.nome_fantasia || "";
    document.getElementById("contratanteEndereco").value = montarEnderecoCompleto(dados);
    document.getElementById("contratanteNumero").value = dados.numero || "";
    document.getElementById("contratanteCidade").value = dados.municipio || "";
    document.getElementById("contratanteUf").value = dados.uf || "";

    alert("Dados do CNPJ preenchidos com sucesso.");
  } catch (erro) {
    alert("CNPJ não encontrado ou erro na consulta.");
  }
}

async function buscarCnpjContratada() {
  const cnpj = pegarValor("contratadaCnpj").replace(/\D/g, "");

  if (cnpj.length !== 14) {
    alert("Digite um CNPJ válido com 14 números.");
    return;
  }

  try {
    const dados = await consultarCnpj(cnpj);
    dadosCnpjContratada = dados;

    document.getElementById("contratadaRazao").value = dados.razao_social || "";
    document.getElementById("contratadaFantasia").value = dados.nome_fantasia || "";
    document.getElementById("contratadaEndereco").value = montarEnderecoCompleto(dados);
    document.getElementById("contratadaNumero").value = dados.numero || "";
    document.getElementById("contratadaCidade").value = dados.municipio || "";
    document.getElementById("contratadaUf").value = dados.uf || "";

    alert("Dados do CNPJ preenchidos com sucesso.");
  } catch (erro) {
    alert("CNPJ não encontrado ou erro na consulta.");
  }
}

function buscarInscricaoEstadualContratante() {
  const campo = document.getElementById("contratanteIe");

  if (!campo) {
    return;
  }

  const marcarIsento = confirm("Inscrição estadual não encontrada. Deseja marcar como ISENTO?");

  if (marcarIsento) {
    campo.value = "ISENTO";
  }
}

function buscarInscricaoMunicipalContratante() {
  const campo = document.getElementById("contratanteIm");

  if (!campo) {
    return;
  }

  const marcarIsento = confirm("Inscrição municipal não encontrada. Deseja marcar como ISENTO?");

  if (marcarIsento) {
    campo.value = "ISENTO";
  }
}

function buscarInscricaoEstadualContratada() {
  const campo = document.getElementById("contratadaIe");

  if (!campo) {
    return;
  }

  const marcarIsento = confirm("Inscrição estadual não encontrada. Deseja marcar como ISENTO?");

  if (marcarIsento) {
    campo.value = "ISENTO";
  }
}

function buscarInscricaoMunicipalContratada() {
  const campo = document.getElementById("contratadaIm");

  if (!campo) {
    return;
  }

  const marcarIsento = confirm("Inscrição municipal não encontrada. Deseja marcar como ISENTO?");

  if (marcarIsento) {
    campo.value = "ISENTO";
  }
}

function adicionarHistoricoAoDocumentoBase() {
  const tabela = document.getElementById("tabelaHistorico");

  if (!tabela) {
    alert("Tabela de histórico não encontrada.");
    return;
  }

  adicionarAoDocumento("Índice de Revisões", tabela.outerHTML);
  alert("Histórico adicionado ao Documento Base.");
}

function selecionarLinhaHistorico(linha) {
  const linhas = document.querySelectorAll("#tabelaHistorico tbody tr");

  linhas.forEach((item) => {
    item.classList.remove("linha-selecionada");
  });

  linha.classList.add("linha-selecionada");
  linhaHistoricoSelecionada = linha;
}

function inserirLinhaHistorico() {
  const tabela = document.querySelector("#tabelaHistorico tbody");

  if (!tabela) {
    alert("Tabela de histórico não encontrada.");
    return;
  }

  const novaLinha = tabela.insertRow();

  novaLinha.onclick = function () {
    selecionarLinhaHistorico(this);
  };

  novaLinha.innerHTML = `
    <td contenteditable="true"></td>
    <td>
      <input type="date" class="input-tabela">
    </td>
    <td contenteditable="true"></td>
    <td contenteditable="true" class="responsavel-historico"></td>
  `;

  selecionarLinhaHistorico(novaLinha);
}

function excluirLinhaHistorico() {
  if (!linhaHistoricoSelecionada) {
    alert("Clique primeiro na linha que deseja excluir.");
    return;
  }

  const confirmar = confirm("Deseja excluir a linha selecionada do histórico?");

  if (!confirmar) {
    return;
  }

  linhaHistoricoSelecionada.remove();
  linhaHistoricoSelecionada = null;
}

function obterResponsaveisHistorico() {
  const dados = localStorage.getItem("responsaveisHistoricoPgr");

  if (!dados) {
    return [];
  }

  return JSON.parse(dados);
}

function salvarResponsaveisHistorico(responsaveis) {
  localStorage.setItem("responsaveisHistoricoPgr", JSON.stringify(responsaveis));
}

function salvarResponsavelHistorico() {
  const nome = pegarValor("nomeResponsavelHistorico");
  const registro = pegarValor("registroResponsavelHistorico");

  if (!nome || !registro) {
    alert("Preencha o nome e o registro do responsável.");
    return;
  }

  const responsaveis = obterResponsaveisHistorico();

  responsaveis.push({
    nome,
    registro
  });

  salvarResponsaveisHistorico(responsaveis);
  carregarResponsaveisHistorico();

  const selectResponsavel = document.getElementById("responsavelSalvoHistorico");

  if (selectResponsavel) {
    selectResponsavel.value = String(responsaveis.length - 1);
  }

  atualizarElaboradorFolhaRosto({ nome, registro });

  limparCampo("nomeResponsavelHistorico");
  limparCampo("registroResponsavelHistorico");

  alert("Responsável salvo com sucesso.");
}
function carregarResponsaveisHistorico() {
  const select = document.getElementById("responsavelSalvoHistorico");

  if (!select) {
    return;
  }

  const responsaveis = obterResponsaveisHistorico();

  select.innerHTML = `<option value="">Selecione</option>`;

  responsaveis.forEach((responsavel, index) => {
    select.innerHTML += `
      <option value="${index}">
        ${textoSeguro(responsavel.nome)} - ${textoSeguro(responsavel.registro)}
      </option>
    `;
  });
}

function aplicarResponsavelLinhaSelecionada() {
  const select = document.getElementById("responsavelSalvoHistorico");

  if (!select || select.value === "") {
    alert("Selecione um responsável salvo.");
    return;
  }

  if (!linhaHistoricoSelecionada) {
    alert("Clique primeiro na linha do histórico onde deseja aplicar o responsável.");
    return;
  }

  const responsaveis = obterResponsaveisHistorico();
  const responsavel = responsaveis[select.value];

  if (!responsavel) {
    alert("Responsável não encontrado.");
    return;
  }

  const celulaResponsavel = linhaHistoricoSelecionada.querySelector(".responsavel-historico");

  if (!celulaResponsavel) {
    alert("Célula de responsável não encontrada.");
    return;
  }

  celulaResponsavel.textContent = `${responsavel.nome} - ${responsavel.registro}`;
  atualizarElaboradorFolhaRosto(responsavel);
}

function preencherElaboradorFolhaRosto() {
  const select = document.getElementById("responsavelSalvoHistorico");

  if (!select || select.value === "") {
    return;
  }

  const responsaveis = obterResponsaveisHistorico();
  const responsavel = responsaveis[select.value];

  if (!responsavel) {
    return;
  }

  atualizarElaboradorFolhaRosto(responsavel);
}

function atualizarElaboradorFolhaRosto(responsavel) {
  const campoNome = document.getElementById("nomeElaboradorFolhaRosto");
  const campoRegistro = document.getElementById("registroElaboradorFolhaRosto");

  if (!campoNome || !campoRegistro || !responsavel) {
    return;
  }

  campoNome.textContent = responsavel.nome;
  campoRegistro.textContent = responsavel.registro;
}
function removerResponsaveisDuplicados() {
  const responsaveis = obterResponsaveisHistorico();
  const mapa = new Map();

  responsaveis.forEach((responsavel) => {
    const chave = `${responsavel.nome.trim().toLowerCase()}-${responsavel.registro.trim().toLowerCase()}`;

    if (!mapa.has(chave)) {
      mapa.set(chave, responsavel);
    }
  });

  const responsaveisUnicos = Array.from(mapa.values());

  salvarResponsaveisHistorico(responsaveisUnicos);
  carregarResponsaveisHistorico();

  alert("Nomes duplicados removidos.");
}

function adicionarContratanteAoDocumentoBase() {
  const html = `
    <p><strong>Razão social:</strong> ${textoSeguro(pegarValor("contratanteRazao"))}</p>
    <p><strong>Nome fantasia:</strong> ${textoSeguro(pegarValor("contratanteFantasia"))}</p>
    <p><strong>CNPJ:</strong> ${textoSeguro(pegarValor("contratanteCnpj"))}</p>
    <p><strong>Inscrição estadual:</strong> ${textoSeguro(pegarValor("contratanteIe"))}</p>
    <p><strong>Inscrição municipal:</strong> ${textoSeguro(pegarValor("contratanteIm"))}</p>
    <p><strong>Endereço:</strong> ${textoSeguro(pegarValor("contratanteEndereco"))}</p>
    <p><strong>Número:</strong> ${textoSeguro(pegarValor("contratanteNumero"))}</p>
    <p><strong>Cidade/UF:</strong> ${textoSeguro(pegarValor("contratanteCidade"))}/${textoSeguro(pegarValor("contratanteUf"))}</p>
  `;

  adicionarAoDocumento("Empresa Contratante", html);
  alert("Contratante adicionada ao Documento Base.");
}

function adicionarContratadaAoDocumentoBase() {
  const html = `
    <p><strong>Razão social:</strong> ${textoSeguro(pegarValor("contratadaRazao"))}</p>
    <p><strong>Nome fantasia:</strong> ${textoSeguro(pegarValor("contratadaFantasia"))}</p>
    <p><strong>CNPJ:</strong> ${textoSeguro(pegarValor("contratadaCnpj"))}</p>
    <p><strong>Inscrição estadual:</strong> ${textoSeguro(pegarValor("contratadaIe"))}</p>
    <p><strong>Inscrição municipal:</strong> ${textoSeguro(pegarValor("contratadaIm"))}</p>
    <p><strong>Endereço:</strong> ${textoSeguro(pegarValor("contratadaEndereco"))}</p>
    <p><strong>Número:</strong> ${textoSeguro(pegarValor("contratadaNumero"))}</p>
    <p><strong>Cidade/UF:</strong> ${textoSeguro(pegarValor("contratadaCidade"))}/${textoSeguro(pegarValor("contratadaUf"))}</p>
    <p><strong>Responsável:</strong> ${textoSeguro(pegarValor("contratadaResponsavel"))}</p>
    <p><strong>Telefone:</strong> ${textoSeguro(pegarValor("contratadaTelefone"))}</p>
    <p><strong>E-mail:</strong> ${textoSeguro(pegarValor("contratadaEmail"))}</p>
  `;

  adicionarAoDocumento("Empresa Contratada", html);
  alert("Contratada adicionada ao Documento Base.");
}

function adicionarDadosPgrAoDocumentoBase() {
  const html = `
    <p><strong>Unidade/local:</strong> ${textoSeguro(pegarValor("pgrUnidade"))}</p>
    <p><strong>Responsável pelo PGR:</strong> ${textoSeguro(pegarValor("pgrResponsavel"))}</p>
    <p><strong>Data de elaboração:</strong> ${textoSeguro(pegarValor("pgrData"))}</p>
    <p><strong>Descrição/escopo:</strong> ${textoSeguro(pegarValor("pgrDescricao"))}</p>
  `;

  adicionarAoDocumento("Dados do PGR", html);
  alert("Dados do PGR adicionados ao Documento Base.");
}

function adicionarTextoBaseAoDocumentoBase() {
  const texto = pegarValor("textoBasePgr");

  adicionarAoDocumento("Texto Base do PGR", `<p>${textoSeguro(texto)}</p>`);
  alert("Texto base adicionado ao Documento Base.");
}

function adicionarGhe() {
  const codigo = pegarValor("codigoGhe");
  const setor = pegarValor("setorGhe");
  const cargo = pegarValor("cargoGhe");
  const atividades = pegarValor("atividadesGhe");
  const riscosPossiveis = pegarValor("riscosPossiveisGhe");

  if (!codigo || !setor || !cargo || !atividades) {
    alert("Preencha GES/GHE, setor, cargo/função e atividades exercidas.");
    return;
  }

  listaGhe.push({
    codigo,
    setor,
    cargo,
    atividades,
    riscosPossiveis
  });

  const tabela = document.querySelector("#tabelaGhe tbody");

  if (!tabela) {
    alert("Tabela GES/GHE não encontrada.");
    return;
  }

  const linha = tabela.insertRow();

  linha.innerHTML = `
    <td>${textoSeguro(codigo)}</td>
    <td>${textoSeguro(setor)}</td>
    <td>${textoSeguro(cargo)}</td>
    <td>${textoSeguro(atividades)}</td>
    <td>${formatarListaRiscos(riscosPossiveis)}</td>
  `;

  limparCamposGhe();
}

function formatarListaRiscos(texto) {
  if (!texto) {
    return "";
  }

  const riscos = texto
    .split(";")
    .map((risco) => risco.trim())
    .filter((risco) => risco !== "");

  if (riscos.length === 0) {
    return textoSeguro(texto);
  }

  return `
    <ul>
      ${riscos.map((risco) => `<li>${textoSeguro(risco)}</li>`).join("")}
    </ul>
  `;
}

function limparCamposGhe() {
  limparCampo("codigoGhe");
  limparCampo("setorGhe");
  limparCampo("cargoGhe");
  limparCampo("atividadesGhe");
  limparCampo("riscosPossiveisGhe");
}

function adicionarGheAoDocumentoBase() {
  const tabela = document.getElementById("tabelaGhe");

  if (!tabela) {
    alert("Tabela GES/GHE não encontrada.");
    return;
  }

  adicionarAoDocumento("GES/GHE", tabela.outerHTML);
  alert("GES/GHE adicionado ao Documento Base.");
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

function definirPrioridadeAcao(classificacao) {
  if (classificacao === "Baixo") {
    return "Baixa - manter controles existentes";
  }

  if (classificacao === "Médio") {
    return "Média - programar melhoria";
  }

  if (classificacao === "Alto") {
    return "Alta - implementar ação de controle";
  }

  return "Crítica - ação imediata";
}

function limparCamposInventario() {
  limparCampo("processoAmbienteRisco");
  limparCampo("atividadeRisco");
  limparCampo("perigoRisco");
  limparCampo("fonteCircunstanciaRisco");
  limparCampo("agravosRisco");
  limparCampo("grupoExpostoRisco");
  limparCampo("gesGheRisco");
  limparCampo("medidasPrevencaoRisco");
  limparCampo("formaExposicaoRisco");
  limparCampo("frequenciaExposicaoRisco");
  limparCampo("duracaoExposicaoRisco");
  limparCampo("intensidadeExposicaoRisco");
  limparCampo("observacoesExposicaoRisco");
  limparCampo("tipoAvaliacaoRisco");
  limparCampo("resultadoAvaliacaoRisco");
  limparCampo("episRisco");
  limparCampo("probabilidadeRisco");
  limparCampo("severidadeRisco");
}

function criarAcao(perigo, origem) {
  const tabela = document.querySelector("#tabelaPlanoAcao tbody");

  if (!tabela) {
    alert("Tabela do Plano de Ação não encontrada.");
    return;
  }

  const linha = tabela.insertRow();

  linha.innerHTML = `
    <td>${textoSeguro(origem)} - ${textoSeguro(perigo)}</td>
    <td contenteditable="true">Definir medida de controle para ${textoSeguro(perigo)}</td>
    <td contenteditable="true">Responsável</td>
    <td contenteditable="true">__/__/____</td>
    <td contenteditable="true">Pendente</td>
  `;
}

function criarTreinamento(perigo, origem) {
  const tabela = document.querySelector("#tabelaPlanoTreinamento tbody");

  if (!tabela) {
    alert("Tabela do Plano de Treinamento não encontrada.");
    return;
  }

  const linha = tabela.insertRow();

  linha.innerHTML = `
    <td>${textoSeguro(origem)} - ${textoSeguro(perigo)}</td>
    <td contenteditable="true">Treinamento relacionado ao risco: ${textoSeguro(perigo)}</td>
    <td contenteditable="true">${textoSeguro(origem)}</td>
    <td contenteditable="true">Anual</td>
    <td contenteditable="true">Pendente</td>
  `;
}

function adicionarInventarioAoDocumentoBase() {
  const tabela = document.getElementById("tabelaInventario");

  if (!tabela) {
    alert("Tabela do inventário não encontrada.");
    return;
  }

  adicionarAoDocumento("Inventário de Riscos Ocupacionais", tabela.outerHTML);
  alert("Inventário adicionado ao Documento Base.");
}
function adicionarEpiMatriz() {
  let setor = pegarValor("setorEpi");

  if (setor === "Outros") {
    setor = pegarValor("outroSetorEpi");
  }

  const tipo = pegarValor("tipoEpi");
  const descricao = pegarValor("descricaoEpi");
  const ca = pegarValor("caEpi");
  const validadeCa = pegarValor("validadeCaEpi");

  let periodicidade = pegarValor("periodicidadeEpi");

  if (periodicidade === "Outro (informar)") {
    periodicidade = pegarValor("outraPeriodicidadeEpi");
  }

  if (!setor || !tipo || !descricao || !ca) {
    alert("Preencha setor/área, tipo de EPI, descrição do EPI e CA.");
    return;
  }

  listaMatrizEpi.push({
    setor,
    tipo,
    descricao,
    ca,
    validadeCa,
    periodicidade
  });

  const tabela = document.querySelector("#tabelaMatrizEpi tbody");

  if (!tabela) {
    alert("Tabela Matriz de EPI não encontrada.");
    return;
  }

  const linha = tabela.insertRow();

  linha.innerHTML = `
    <td>${textoSeguro(setor)}</td>
    <td>${textoSeguro(tipo)}</td>
    <td>${textoSeguro(descricao)}</td>
    <td>${textoSeguro(ca)}</td>
    <td>${textoSeguro(validadeCa)}</td>
    <td>${textoSeguro(periodicidade)}</td>
  `;

  limparCampo("setorEpi");
  limparCampo("outroSetorEpi");
  limparCampo("tipoEpi");
  limparCampo("descricaoEpi");
  limparCampo("caEpi");
  limparCampo("validadeCaEpi");
  limparCampo("periodicidadeEpi");
  limparCampo("outraPeriodicidadeEpi");

  const campoOutroSetor = document.getElementById("outroSetorEpi");
  if (campoOutroSetor) {
    campoOutroSetor.style.display = "none";
  }

  const campoOutraPeriodicidade = document.getElementById("outraPeriodicidadeEpi");
  if (campoOutraPeriodicidade) {
    campoOutraPeriodicidade.style.display = "none";
  }
}

function adicionarMatrizEpiAoDocumentoBase() {
  const tabela = document.getElementById("tabelaMatrizEpi");

  if (!tabela) {
    alert("Tabela Matriz de EPI não encontrada.");
    return;
  }

  adicionarAoDocumento("Matriz de EPI", tabela.outerHTML);
  alert("Matriz de EPI adicionada ao Documento Base.");
}

function adicionarPlanoAcaoAoDocumentoBase() {
  const tabela = document.getElementById("tabelaPlanoAcao");

  if (!tabela) {
    alert("Tabela Plano de Ação não encontrada.");
    return;
  }

  adicionarAoDocumento("Plano de Ação", tabela.outerHTML);
  alert("Plano de Ação adicionado ao Documento Base.");
}

function adicionarPlanoTreinamentoAoDocumentoBase() {
  const tabela = document.getElementById("tabelaPlanoTreinamento");

  if (!tabela) {
    alert("Tabela Plano de Treinamento não encontrada.");
    return;
  }

  adicionarAoDocumento("Plano de Treinamento", tabela.outerHTML);
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
          font-size: 11px;
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

        ul {
          margin: 0;
          padding-left: 16px;
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
function adicionarCategoriaRiscoGhe(categoria) {
  const campo = document.getElementById("riscosPossiveisGhe");

  if (!campo) {
    alert("Campo de riscos possíveis não encontrado.");
    return;
  }

  const valorAtual = campo.value.trim();

  if (valorAtual === "") {
    campo.value = categoria;
    return;
  }

  const categoriasExistentes = valorAtual
    .split(";")
    .map((item) => item.trim().toLowerCase());

  if (categoriasExistentes.includes(categoria.toLowerCase())) {
    alert("Essa categoria já foi adicionada.");
    return;
  }

  campo.value = `${valorAtual}; ${categoria}`;
}

function consultarCaOficial() {
  const ca = pegarValor("caEpi").replace(/\D/g, "");

  if (!ca) {
    alert("Digite o número do CA antes de consultar.");
    return;
  }

  const confirmar = confirm(
    "A consulta será aberta no site oficial do CAEPI/MTE. Após localizar o CA, copie a descrição para o campo correspondente. Deseja abrir?"
  );

  if (!confirmar) {
    return;
  }

  window.open("https://caepi.mte.gov.br/internet/ConsultaCAInternet.aspx", "_blank");
}
function controlarOutroSetorEpi() {
  const setor = pegarValor("setorEpi");
  const campoOutroSetor = document.getElementById("outroSetorEpi");

  if (!campoOutroSetor) {
    return;
  }

  if (setor === "Outros") {
    campoOutroSetor.style.display = "block";
  } else {
    campoOutroSetor.style.display = "none";
    limparCampo("outroSetorEpi");
  }
}

function controlarOutraPeriodicidadeEpi() {
  const periodicidade = pegarValor("periodicidadeEpi");
  const campoOutraPeriodicidade = document.getElementById("outraPeriodicidadeEpi");

  if (!campoOutraPeriodicidade) {
    return;
  }

  if (periodicidade === "Outro (informar)") {
    campoOutraPeriodicidade.style.display = "block";
  } else {
    campoOutraPeriodicidade.style.display = "none";
    limparCampo("outraPeriodicidadeEpi");
  }
}
function adicionarFolhaRostoAoDocumentoBase() {
  const folha = document.querySelector(".folha-rosto-documento");

  if (!folha) {
    alert("Folha de rosto não encontrada.");
    return;
  }

  adicionarAoDocumento("Folha de Rosto", folha.outerHTML);
  alert("Folha de rosto adicionada ao Documento Base.");
}
function inserirLogoFolhaRosto(event) {
  const arquivo = event.target.files[0];

  if (!arquivo) {
    return;
  }

  const leitor = new FileReader();

  leitor.onload = function () {
    const imagem = document.getElementById("logoFolhaRosto");
    const texto = document.getElementById("textoLogoFolha");

    if (!imagem || !texto) {
      alert("Área da logo não encontrada.");
      return;
    }

    imagem.src = leitor.result;
    imagem.style.display = "block";
    texto.style.display = "none";
  };

  leitor.readAsDataURL(arquivo);
}
function enviarIndiceRevisoesParaFolha() {
  const tabelaOrigem = document.querySelector("#tabelaHistorico tbody");
  const tabelaDestino = document.querySelector("#tabelaIndiceFolha tbody");

  if (!tabelaOrigem || !tabelaDestino) {
    alert("Tabela de origem ou destino não encontrada.");
    return;
  }

  tabelaDestino.innerHTML = "";

  const linhas = tabelaOrigem.querySelectorAll("tr");

  linhas.forEach((linha) => {
    const colunas = linha.querySelectorAll("td");

    const revisao = colunas[0]?.innerText.trim() || "";
    const data = formatarDataBrasileira(colunas[1]?.querySelector("input")?.value || "");
    const descricao = colunas[2]?.innerText.trim() || "";
    const responsavelCompleto = colunas[3]?.innerText.trim() || "";
    const responsavel = obterNomeSemRegistro(responsavelCompleto);

    if (!revisao && !data && !descricao && !responsavel) {
      return;
    }

    const novaLinha = tabelaDestino.insertRow();

    novaLinha.innerHTML = `
      <td class="coluna-rev" contenteditable="true">${textoSeguro(revisao)}</td>
      <td contenteditable="true">${textoSeguro(data)}</td>
      <td contenteditable="true">${textoSeguro(descricao)}</td>
      <td contenteditable="true">${textoSeguro(responsavel)}</td>
    `;
  });

  if (tabelaDestino.children.length === 0) {
    const linhaVazia = tabelaDestino.insertRow();

    linhaVazia.innerHTML = `
      <td class="coluna-rev" style="height: 260px;"></td>
      <td></td>
      <td></td>
      <td></td>
    `;
  }

  alert("Índice de Revisões enviado para a Folha de Rosto.");
}

function formatarDataBrasileira(dataIso) {
  if (!dataIso) {
    return "";
  }

  const partes = dataIso.split("-");

  if (partes.length !== 3) {
    return dataIso;
  }

  return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

function obterNomeSemRegistro(texto) {
  if (!texto) {
    return "";
  }

  return texto.split(" - ")[0].trim();
}
document.addEventListener("DOMContentLoaded", carregarResponsaveisHistorico);
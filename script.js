console.log("PGR iniciado com sucesso.");

let listaGhe = [];
let listaMatrizEpi = [];

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

  const secaoSelecionada = document.getElementById(idSecao);

  if (secaoSelecionada) {
    secaoSelecionada.classList.add("ativo");
  }
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

function adicionarHistoricoAoDocumentoBase() {
  const tabela = document.getElementById("tabelaHistorico");

  if (!tabela) {
    alert("Tabela de histórico não encontrada.");
    return;
  }

  adicionarAoDocumento("Histórico de Revisões", tabela.outerHTML);
  alert("Histórico adicionado ao Documento Base.");
}

function adicionarContratanteAoDocumentoBase() {
  const html = `
    <p><strong>Razão social:</strong> ${textoSeguro(pegarValor("contratanteRazao"))}</p>
    <p><strong>Nome fantasia:</strong> ${textoSeguro(pegarValor("contratanteFantasia"))}</p>
    <p><strong>CNPJ:</strong> ${textoSeguro(pegarValor("contratanteCnpj"))}</p>
    <p><strong>Inscrição estadual:</strong> ${textoSeguro(pegarValor("contratanteIe"))}</p>
    <p><strong>Inscrição municipal:</strong> ${textoSeguro(pegarValor("contratanteIm"))}</p>
    <p><strong>Endereço:</strong> ${textoSeguro(pegarValor("contratanteEndereco"))}</p>
    <p><strong>Cidade/UF:</strong> ${textoSeguro(pegarValor("contratanteCidade"))}/${textoSeguro(pegarValor("contratanteUf"))}</p>
    <p><strong>Área de abrangência:</strong> ${textoSeguro(pegarValor("contratanteArea"))}</p>
    <p><strong>Gerência:</strong> ${textoSeguro(pegarValor("contratanteGerencia"))}</p>
    <p><strong>Nome do fiscal:</strong> ${textoSeguro(pegarValor("contratanteFiscal"))}</p>
    <p><strong>Chave do fiscal:</strong> ${textoSeguro(pegarValor("contratanteChaveFiscal"))}</p>
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

const possibilidadesRiscos = {
  fisico: [
    "Ruído",
    "Vibração",
    "Calor",
    "Frio",
    "Radiação não ionizante",
    "Radiação ionizante",
    "Umidade",
    "Pressões anormais"
  ],

  quimico: [
    "Poeiras",
    "Fumos metálicos",
    "Névoas",
    "Neblinas",
    "Gases",
    "Vapores",
    "Produtos químicos",
    "Solventes e diluentes",
    "Tintas e vernizes"
  ],

  biologico: [
    "Vírus",
    "Bactérias",
    "Fungos",
    "Parasitas",
    "Material biológico",
    "Contato com animais peçonhentos",
    "Esgoto ou resíduos contaminados"
  ],

  ergonomico: [
    "Esforço físico intenso",
    "Levantamento e transporte manual de carga",
    "Postura inadequada",
    "Movimentos repetitivos",
    "Ritmo excessivo de trabalho",
    "Trabalho em turno/noturno",
    "Exigência de atenção constante"
  ],

  psicossocial: [
    "Assédio moral",
    "Assédio sexual",
    "Conflitos interpessoais",
    "Pressão excessiva por metas",
    "Sobrecarga de trabalho",
    "Jornada prolongada",
    "Trabalho em turno ou noturno",
    "Falta de autonomia",
    "Comunicação deficiente",
    "Violência no trabalho",
    "Isolamento social",
    "Exigência emocional intensa",
    "Insegurança no emprego",
    "Ritmo intenso de trabalho"
  ],

  acidente: [
    "Trabalho em altura",
    "Queda de mesmo nível",
    "Queda de materiais",
    "Choque elétrico",
    "Corte e perfuração",
    "Prensagem de membros",
    "Atropelamento",
    "Incêndio e explosão",
    "Contato com máquinas e equipamentos",
    "Animais peçonhentos"
  ]
};

function listarPossibilidadesRisco(categoria) {
  const lista = document.getElementById("listaPossibilidadesRisco");
  const riscos = possibilidadesRiscos[categoria];

  if (!lista || !riscos) {
    return;
  }

  lista.innerHTML = riscos
    .map((risco) => {
      return `
        <button type="button" class="risco-opcao" onclick="adicionarRiscoPossivelGhe('${atributoSeguro(risco)}')">
          ${textoSeguro(risco)}
        </button>
      `;
    })
    .join("");
}

function adicionarRiscoPossivelGhe(risco) {
  const campo = document.getElementById("riscosPossiveisGhe");

  if (!campo) {
    return;
  }

  const valorAtual = campo.value.trim();

  if (valorAtual === "") {
    campo.value = risco;
    return;
  }

  const riscosExistentes = valorAtual
    .split(";")
    .map((item) => item.trim().toLowerCase());

  if (riscosExistentes.includes(risco.toLowerCase())) {
    alert("Esse risco já foi adicionado.");
    return;
  }

  campo.value = `${valorAtual}; ${risco}`;
}

function adicionarRisco() {
  const processoAmbiente = pegarValor("processoAmbienteRisco");
  const atividade = pegarValor("atividadeRisco");
  const perigo = pegarValor("perigoRisco");
  const fonteCircunstancia = pegarValor("fonteCircunstanciaRisco");
  const agravos = pegarValor("agravosRisco");
  const grupoExposto = pegarValor("grupoExpostoRisco");
  const gesGhe = pegarValor("gesGheRisco");
  const medidasPrevencao = pegarValor("medidasPrevencaoRisco");
  const formaExposicao = pegarValor("formaExposicaoRisco");
  const frequenciaExposicao = pegarValor("frequenciaExposicaoRisco");
  const duracaoExposicao = pegarValor("duracaoExposicaoRisco");
  const intensidadeExposicao = pegarValor("intensidadeExposicaoRisco");
  const observacoesExposicao = pegarValor("observacoesExposicaoRisco");
  const tipoAvaliacao = pegarValor("tipoAvaliacaoRisco");
  const resultadoAvaliacao = pegarValor("resultadoAvaliacaoRisco");
  const epis = pegarValor("episRisco");
  const probabilidade = Number(pegarValor("probabilidadeRisco"));
  const severidade = Number(pegarValor("severidadeRisco"));

  if (
    !processoAmbiente ||
    !atividade ||
    !perigo ||
    !fonteCircunstancia ||
    !agravos ||
    !grupoExposto ||
    !medidasPrevencao ||
    !formaExposicao ||
    !frequenciaExposicao ||
    !duracaoExposicao ||
    !tipoAvaliacao ||
    !probabilidade ||
    !severidade
  ) {
    alert("Preencha os campos obrigatórios do inventário de riscos ocupacionais.");
    return;
  }

  const risco = probabilidade * severidade;
  const classificacao = classificarRisco(risco);
  const prioridadeAcao = definirPrioridadeAcao(classificacao);

  const tabela = document.querySelector("#tabelaInventario tbody");

  if (!tabela) {
    alert("Tabela do inventário não encontrada.");
    return;
  }

  const linha = tabela.insertRow();

  linha.innerHTML = `
    <td>${textoSeguro(processoAmbiente)}</td>
    <td>${textoSeguro(atividade)}</td>
    <td>${textoSeguro(perigo)}</td>
    <td>${textoSeguro(fonteCircunstancia)}</td>
    <td>${textoSeguro(agravos)}</td>
    <td>${textoSeguro(grupoExposto)}</td>
    <td>${textoSeguro(gesGhe)}</td>
    <td>${textoSeguro(medidasPrevencao)}</td>
    <td>${textoSeguro(formaExposicao)}</td>
    <td>${textoSeguro(frequenciaExposicao)}</td>
    <td>${textoSeguro(duracaoExposicao)}</td>
    <td>${textoSeguro(intensidadeExposicao)}</td>
    <td>${textoSeguro(observacoesExposicao)}</td>
    <td>${textoSeguro(tipoAvaliacao)}</td>
    <td>${textoSeguro(resultadoAvaliacao)}</td>
    <td>${textoSeguro(epis)}</td>
    <td>${probabilidade}</td>
    <td>${severidade}</td>
    <td>${risco}</td>
    <td>${classificacao}</td>
    <td>${prioridadeAcao}</td>
    <td>
      <button onclick="criarAcao('${atributoSeguro(perigo)}', '${atributoSeguro(grupoExposto)}')">Criar ação</button>
      <button onclick="criarTreinamento('${atributoSeguro(perigo)}', '${atributoSeguro(grupoExposto)}')">Criar treinamento</button>
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
  const ghe = pegarValor("gheEpi");
  const tipo = pegarValor("tipoEpi");
  const descricao = pegarValor("descricaoEpi");
  const ca = pegarValor("caEpi");
  const validadeCa = pegarValor("validadeCaEpi");
  const periodicidade = pegarValor("periodicidadeEpi");

  if (!ghe || !tipo || !descricao || !ca) {
    alert("Preencha GHE, tipo de EPI, descrição do EPI e CA.");
    return;
  }

  listaMatrizEpi.push({
    ghe,
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
    <td>${textoSeguro(ghe)}</td>
    <td>${textoSeguro(tipo)}</td>
    <td>${textoSeguro(descricao)}</td>
    <td>${textoSeguro(ca)}</td>
    <td>${textoSeguro(validadeCa)}</td>
    <td>${textoSeguro(periodicidade)}</td>
  `;

  limparCampo("gheEpi");
  limparCampo("tipoEpi");
  limparCampo("descricaoEpi");
  limparCampo("caEpi");
  limparCampo("validadeCaEpi");
  limparCampo("periodicidadeEpi");
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
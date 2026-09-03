import { carregarNavbar } from "./scripts.js";

// Lista de equipamentos usada como base 
const listaEquipamentos = [
  {
    codigo: "EV-12345",
    nome: "Elevador #12345",
    cliente: "Ed. Paulista, 1000",
    cidade: "São Paulo - SP",
    tipo: "Elevador",
    modelo: "Gen2 Premier",
    status: "operacao",
    ultimaManutencao: "10/05/2026",
  },
  {
    codigo: "EV-67890",
    nome: "Elevador #67890",
    cliente: "Ed. Copan, 200",
    cidade: "São Paulo - SP",
    tipo: "Elevador",
    modelo: "Gen2 Comfort",
    status: "operacao",
    ultimaManutencao: "08/05/2026",
  },
  {
    codigo: "EV-11111",
    nome: "Elevador #11111",
    cliente: "Ed. Comercial, 300",
    cidade: "Rio de Janeiro - RJ",
    tipo: "Elevador",
    modelo: "Gen2 Premier",
    status: "manutencao",
    ultimaManutencao: "05/05/2026",
  },
  {
    codigo: "ER-22222",
    nome: "Escada Rolante #22222",
    cliente: "Shopping Center Norte",
    cidade: "São Paulo - SP",
    tipo: "Escada Rolante",
    modelo: "Gen2",
    status: "operacao",
    ultimaManutencao: "09/05/2026",
  },
  {
    codigo: "EV-33333",
    nome: "Elevador #33333",
    cliente: "Ed. Financial, 150",
    cidade: "Belo Horizonte - MG",
    tipo: "Elevador",
    modelo: "Gen2 Premier",
    status: "ocorrencia",
    ultimaManutencao: "--",
  },
  {
    codigo: "EV-44444",
    nome: "Elevador #44444",
    cliente: "Hospital Itaim",
    cidade: "São Paulo - SP",
    tipo: "Elevador",
    modelo: "Gen2 Comfort",
    status: "operacao",
    ultimaManutencao: "07/05/2026",
  },
  {
    codigo: "ER-55555",
    nome: "Escada Rolante #55555",
    cliente: "Aeroporto CGH",
    cidade: "São Paulo - SP",
    tipo: "Escada Rolante",
    modelo: "Gen2",
    status: "operacao",
    ultimaManutencao: "11/05/2026",
  },
  {
    codigo: "EV-66666",
    nome: "Elevador #66666",
    cliente: "Ed. Liberty, 500",
    cidade: "Curitiba - PR",
    tipo: "Elevador",
    modelo: "Gen2 Premier",
    status: "fora",
    ultimaManutencao: "--",
  },
];

// Textos e cores exibidos para cada status possível de um equipamento
const infoStatus = {
  operacao: { texto: "Em operação", cor: "statusOperacao" },
  manutencao: { texto: "Em manutenção", cor: "statusManutencao" },
  ocorrencia: { texto: "Com ocorrência", cor: "statusOcorrencia" },
  fora: { texto: "Fora de operação", cor: "statusFora" },
};

// Dados usados nos dois gráficos de rosca do rodapé da página
const dadosGraficoStatus = [
  { rotulo: "Em operação", valor: 1186, cor: "#16a34a" },
  { rotulo: "Em manutenção", valor: 18, cor: "#f59e0b" },
  { rotulo: "Com ocorrência", valor: 62, cor: "#dc2626" },
  { rotulo: "Fora de operação", valor: 12, cor: "#6b7280" },
];

const dadosGraficoTipo = [
  { rotulo: "Elevadores", valor: 1024, cor: "#1c3f90" },
  { rotulo: "Escadas rolantes", valor: 224, cor: "#93c5fd" },
];

// Renderiza as linhas da tabela de equipamentos a partir de uma lista
function renderizarTabelaEquipamentos(lista) {
  const corpoTabela = document.getElementById("corpoTabelaEquipamentos");
  corpoTabela.innerHTML = ""; // limpa o conteúdo anterior antes de montar de novo

  lista.forEach((equipamento) => {
    const status = infoStatus[equipamento.status];
    const linha = document.createElement("tr");
    linha.innerHTML = `
            <td>${equipamento.codigo}</td>
            <td>${equipamento.nome}</td>
            <td>${equipamento.cliente}<br><span class="textoSecundario">${equipamento.cidade}</span></td>
            <td>${equipamento.tipo}</td>
            <td>${equipamento.modelo}</td>
            <td><span class="badgeStatus ${status.cor}">${status.texto}</span></td>
            <td>${equipamento.ultimaManutencao}</td>
            <td class="acoesLinha">
                <i class="bi bi-eye iconeAcao" title="Ver detalhes"></i>
                <i class="bi bi-three-dots-vertical iconeAcao" title="Mais ações"></i>
            </td>
        `;
    corpoTabela.appendChild(linha);
  });
}

// Junta o texto da busca com os filtros de tipo e status escolhidos
function aplicarFiltros() {
  const texto = document.getElementById("campoBuscaEquip").value.toLowerCase();
  const tipo = document.getElementById("filtroTipo").value;
  const status = document.getElementById("filtroStatus").value;

  const listaFiltrada = listaEquipamentos.filter((equipamento) => {
    const bateTexto =
      equipamento.codigo.toLowerCase().includes(texto) ||
      equipamento.cliente.toLowerCase().includes(texto) ||
      equipamento.nome.toLowerCase().includes(texto);
    const bateTipo = tipo === "todos" || equipamento.tipo === tipo;
    const bateStatus = status === "todos" || equipamento.status === status;
    return bateTexto && bateTipo && bateStatus;
  });

  renderizarTabelaEquipamentos(listaFiltrada);
}

// Monta o CSS conic-gradient de um gráfico de rosca a partir dos dados e desenha a legenda
function criarGraficoRosca(idGrafico, idLegenda, dados, valorCentro) {
  const total = dados.reduce((soma, item) => soma + item.valor, 0);
  let anguloAtual = 0;
  const fatias = dados.map((item) => {
    const angulo = (item.valor / total) * 360;
    const fatia = `${item.cor} ${anguloAtual}deg ${anguloAtual + angulo}deg`;
    anguloAtual += angulo;
    return fatia;
  });

  const grafico = document.getElementById(idGrafico);
  grafico.style.background = `conic-gradient(${fatias.join(", ")})`;
  grafico.querySelector(".textoRosca").innerHTML =
    `${valorCentro}<br><span class="legendaRoscaCentro">Total</span>`;

  const legenda = document.getElementById(idLegenda);
  legenda.innerHTML = dados
    .map((item) => {
      const porcentagem = Math.round((item.valor / total) * 100);
      return `
            <li class="itemLegenda">
                <span class="corLegenda" style="background-color: ${item.cor}"></span>
                ${item.rotulo} <strong>${item.valor.toLocaleString("pt-BR")} (${porcentagem}%)</strong>
            </li>
        `;
    })
    .join("");
}

// Alterna entre as abas "Lista", "Mapa" e "Análise"
function alternarAba(nomeAba) {
  document.querySelectorAll(".abaVisualizacao").forEach((aba) => {
    aba.classList.toggle("abaAtiva", aba.dataset.aba === nomeAba);
  });
  document.querySelectorAll(".painelVisualizacao").forEach((painel) => {
    painel.classList.toggle("d-none", painel.dataset.painel !== nomeAba);
  });
}

// Liga os eventos de clique/alteração dos filtros e das abas
function iniciarEventos() {
  document
    .getElementById("campoBuscaEquip")
    .addEventListener("input", aplicarFiltros);
  document
    .getElementById("filtroTipo")
    .addEventListener("change", aplicarFiltros);
  document
    .getElementById("filtroStatus")
    .addEventListener("change", aplicarFiltros);

  document.querySelectorAll(".abaVisualizacao").forEach((aba) => {
    aba.addEventListener("click", () => alternarAba(aba.dataset.aba));
  });
}

// Ponto de entrada: carrega a navbar e prepara a tela de equipamentos
function iniciarPaginaEquipamentos() {
  carregarNavbar();
  renderizarTabelaEquipamentos(listaEquipamentos);
  criarGraficoRosca(
    "graficoStatus",
    "legendaStatus",
    dadosGraficoStatus,
    "1.248",
  );
  criarGraficoRosca("graficoTipo", "legendaTipo", dadosGraficoTipo, "1.248");
  iniciarEventos();
}

iniciarPaginaEquipamentos();

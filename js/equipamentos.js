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
  operacao: {
    texto: "Em operação",
    cor: "statusOperacao",
    corMarcador: "#16a34a",
  },
  manutencao: {
    texto: "Em manutenção",
    cor: "statusManutencao",
    corMarcador: "#f59e0b",
  },
  ocorrencia: {
    texto: "Com ocorrência",
    cor: "statusOcorrencia",
    corMarcador: "#dc2626",
  },
  fora: {
    texto: "Fora de operação",
    cor: "statusFora",
    corMarcador: "#6b7280",
  },
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

// Pontos mostrados no mapa (cada ponto é um equipamento em uma cidade)
const pontosMapa = [
  {
    nome: "Elevador #12345",
    cidade: "São Paulo",
    regiao: "São Paulo",
    tipo: "Elevador",
    status: "operacao",
    lat: -23.56,
    lng: -46.65,
  },
  {
    nome: "Elevador #67890",
    cidade: "São Paulo",
    regiao: "São Paulo",
    tipo: "Elevador",
    status: "ocorrencia",
    lat: -23.54,
    lng: -46.63,
  },
  {
    nome: "Escada Rolante #22222",
    cidade: "São Paulo",
    regiao: "São Paulo",
    tipo: "Escada Rolante",
    status: "operacao",
    lat: -23.5,
    lng: -46.62,
  },
  {
    nome: "Elevador #44444",
    cidade: "São Paulo",
    regiao: "São Paulo",
    tipo: "Elevador",
    status: "manutencao",
    lat: -23.59,
    lng: -46.68,
  },
  {
    nome: "Escada Rolante #55555",
    cidade: "São Paulo",
    regiao: "São Paulo",
    tipo: "Escada Rolante",
    status: "operacao",
    lat: -23.63,
    lng: -46.66,
  },
  {
    nome: "Elevador #10101",
    cidade: "Campinas",
    regiao: "São Paulo",
    tipo: "Elevador",
    status: "operacao",
    lat: -22.91,
    lng: -47.06,
  },
  {
    nome: "Elevador #10202",
    cidade: "Santos",
    regiao: "São Paulo",
    tipo: "Elevador",
    status: "operacao",
    lat: -23.96,
    lng: -46.33,
  },
  {
    nome: "Escada Rolante #10303",
    cidade: "Ribeirão Preto",
    regiao: "São Paulo",
    tipo: "Escada Rolante",
    status: "operacao",
    lat: -21.17,
    lng: -47.81,
  },
  {
    nome: "Elevador #10404",
    cidade: "Sorocaba",
    regiao: "São Paulo",
    tipo: "Elevador",
    status: "manutencao",
    lat: -23.5,
    lng: -47.45,
  },
  {
    nome: "Elevador #11111",
    cidade: "Rio de Janeiro",
    regiao: "Rio de Janeiro",
    tipo: "Elevador",
    status: "manutencao",
    lat: -22.91,
    lng: -43.17,
  },
  {
    nome: "Escada Rolante #11212",
    cidade: "Rio de Janeiro",
    regiao: "Rio de Janeiro",
    tipo: "Escada Rolante",
    status: "operacao",
    lat: -22.97,
    lng: -43.19,
  },
  {
    nome: "Elevador #11313",
    cidade: "Niterói",
    regiao: "Rio de Janeiro",
    tipo: "Elevador",
    status: "operacao",
    lat: -22.88,
    lng: -43.1,
  },
  {
    nome: "Elevador #33333",
    cidade: "Belo Horizonte",
    regiao: "Minas Gerais",
    tipo: "Elevador",
    status: "ocorrencia",
    lat: -19.92,
    lng: -43.94,
  },
  {
    nome: "Elevador #12121",
    cidade: "Uberlândia",
    regiao: "Minas Gerais",
    tipo: "Elevador",
    status: "operacao",
    lat: -18.92,
    lng: -48.28,
  },
  {
    nome: "Escada Rolante #12222",
    cidade: "Juiz de Fora",
    regiao: "Minas Gerais",
    tipo: "Escada Rolante",
    status: "operacao",
    lat: -21.76,
    lng: -43.35,
  },
  {
    nome: "Elevador #66666",
    cidade: "Curitiba",
    regiao: "Paraná",
    tipo: "Elevador",
    status: "fora",
    lat: -25.43,
    lng: -49.27,
  },
  {
    nome: "Elevador #13131",
    cidade: "Londrina",
    regiao: "Paraná",
    tipo: "Elevador",
    status: "operacao",
    lat: -23.31,
    lng: -51.16,
  },
  {
    nome: "Elevador #14141",
    cidade: "Salvador",
    regiao: "Bahia",
    tipo: "Elevador",
    status: "operacao",
    lat: -12.97,
    lng: -38.51,
  },
  {
    nome: "Escada Rolante #14242",
    cidade: "Feira de Santana",
    regiao: "Bahia",
    tipo: "Escada Rolante",
    status: "operacao",
    lat: -12.27,
    lng: -38.97,
  },
  {
    nome: "Elevador #15151",
    cidade: "Porto Alegre",
    regiao: "Rio Grande do Sul",
    tipo: "Elevador",
    status: "operacao",
    lat: -30.03,
    lng: -51.23,
  },
  {
    nome: "Elevador #15252",
    cidade: "Caxias do Sul",
    regiao: "Rio Grande do Sul",
    tipo: "Elevador",
    status: "operacao",
    lat: -29.17,
    lng: -51.18,
  },
  {
    nome: "Elevador #16161",
    cidade: "Brasília",
    regiao: "Outras",
    tipo: "Elevador",
    status: "manutencao",
    lat: -15.78,
    lng: -47.93,
  },
  {
    nome: "Escada Rolante #16262",
    cidade: "Goiânia",
    regiao: "Outras",
    tipo: "Escada Rolante",
    status: "operacao",
    lat: -16.68,
    lng: -49.25,
  },
  {
    nome: "Elevador #17171",
    cidade: "Recife",
    regiao: "Outras",
    tipo: "Elevador",
    status: "operacao",
    lat: -8.05,
    lng: -34.88,
  },
  {
    nome: "Elevador #17272",
    cidade: "Fortaleza",
    regiao: "Outras",
    tipo: "Elevador",
    status: "ocorrencia",
    lat: -3.73,
    lng: -38.52,
  },
  {
    nome: "Elevador #18181",
    cidade: "Belém",
    regiao: "Outras",
    tipo: "Elevador",
    status: "operacao",
    lat: -1.46,
    lng: -48.5,
  },
  {
    nome: "Elevador #18282",
    cidade: "Manaus",
    regiao: "Outras",
    tipo: "Elevador",
    status: "operacao",
    lat: -3.12,
    lng: -60.02,
  },
  {
    nome: "Elevador #19191",
    cidade: "Florianópolis",
    regiao: "Outras",
    tipo: "Elevador",
    status: "operacao",
    lat: -27.6,
    lng: -48.55,
  },
  {
    nome: "Elevador #19292",
    cidade: "Cuiabá",
    regiao: "Outras",
    tipo: "Elevador",
    status: "fora",
    lat: -15.6,
    lng: -56.1,
  },
];

// Dados do resumo por região (aba Mapa)
const dadosRegioes = [
  { rotulo: "São Paulo", valor: 654, cor: "#2563eb" },
  { rotulo: "Rio de Janeiro", valor: 198, cor: "#3b82f6" },
  { rotulo: "Minas Gerais", valor: 143, cor: "#93c5fd" },
  { rotulo: "Paraná", valor: 89, cor: "#93c5fd" },
  { rotulo: "Bahia", valor: 72, cor: "#93c5fd" },
  { rotulo: "Rio Grande do Sul", valor: 56, cor: "#93c5fd" },
];

// Dados dos gráficos da aba Análise
const dadosOcorrenciasMes = [
  { mes: "Jan", valor: 18 },
  { mes: "Fev", valor: 22 },
  { mes: "Mar", valor: 28 },
  { mes: "Abr", valor: 24 },
  { mes: "Mai", valor: 30 },
  { mes: "Jun", valor: 26 },
  { mes: "Jul", valor: 42 },
  { mes: "Ago", valor: 62 },
  { mes: "Set", valor: 52 },
  { mes: "Out", valor: 38 },
  { mes: "Nov", valor: 20 },
  { mes: "Dez", valor: 25 },
];

const dadosTopClientes = [
  { rotulo: "Ed. Paulista", valor: 18, cor: "#2563eb" },
  { rotulo: "Shopping Center Norte", valor: 12, cor: "#3b82f6" },
  { rotulo: "Hospital Itaim", valor: 9, cor: "#60a5fa" },
  { rotulo: "Ed. Copan", valor: 8, cor: "#60a5fa" },
  { rotulo: "Aeroporto CGH", valor: 7, cor: "#93c5fd" },
  { rotulo: "Ed. Financial", valor: 6, cor: "#93c5fd" },
  { rotulo: "Ed. Liberty", valor: 5, cor: "#93c5fd" },
  { rotulo: "RioMar Shopping", valor: 5, cor: "#93c5fd" },
  { rotulo: "Morumbi Shopping", valor: 4, cor: "#93c5fd" },
  { rotulo: "Boulevard Tatuapé", valor: 4, cor: "#93c5fd" },
];

const dadosOcorrenciasTipo = [
  { rotulo: "Falha elétrica", valor: 28 },
  { rotulo: "Porta", valor: 18 },
  { rotulo: "Motor", valor: 12 },
  { rotulo: "Sensores", valor: 8 },
  { rotulo: "Comunicação IoT", valor: 6 },
  { rotulo: "Outros", valor: 4 },
];

// Equipamentos com maior risco de falha (IA Preditiva)
const listaRisco = [
  {
    codigo: "EV-33333",
    cliente: "Ed. Financial, 150",
    probabilidade: "92%",
    risco: "alto",
  },
  {
    codigo: "EV-67890",
    cliente: "Ed. Copan, 200",
    probabilidade: "85%",
    risco: "alto",
  },
  {
    codigo: "ER-55555",
    cliente: "Aeroporto CGH",
    probabilidade: "81%",
    risco: "alto",
  },
  {
    codigo: "EV-44444",
    cliente: "Hospital Itaim",
    probabilidade: "67%",
    risco: "medio",
  },
  {
    codigo: "EV-12345",
    cliente: "Ed. Paulista, 1000",
    probabilidade: "58%",
    risco: "medio",
  },
];

// Texto e cor de cada nível de risco (reaproveita as cores dos status)
const infoRisco = {
  alto: { texto: "Alto", cor: "statusOcorrencia" },
  medio: { texto: "Médio", cor: "statusManutencao" },
};

// Guardam o mapa e os marcadores (o mapa só é criado quando a aba é aberta)
let mapa;
let camadaMarcadores;

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
function criarGraficoRosca(
  idGrafico,
  idLegenda,
  dados,
  valorCentro,
  textoCentro = "Total",
) {
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
    `${valorCentro}<br><span class="legendaRoscaCentro">${textoCentro}</span>`;

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

// Cria o mapa do Brasil (só na primeira vez que a aba Mapa é aberta)
function iniciarMapa() {
  if (mapa) {
    mapa.invalidateSize(); // ajusta o tamanho, pois o mapa estava escondido
    return;
  }

  mapa = L.map("mapaEquipamentos").setView([-14.2, -51.9], 4);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap",
  }).addTo(mapa);

  camadaMarcadores = L.layerGroup().addTo(mapa);
  desenharMarcadores();
}

// Desenha no mapa os pontos que passam pelos filtros escolhidos
function desenharMarcadores() {
  if (!mapa) {
    return; // o mapa ainda não foi criado
  }

  const tipo = document.getElementById("filtroTipoMapa").value;
  const regiao = document.getElementById("filtroRegiaoMapa").value;
  const status = document.getElementById("filtroStatusMapa").value;

  camadaMarcadores.clearLayers(); // limpa os marcadores anteriores

  pontosMapa.forEach((ponto) => {
    const bateTipo = tipo === "todos" || ponto.tipo === tipo;
    const bateRegiao = regiao === "todas" || ponto.regiao === regiao;
    const bateStatus = status === "todos" || ponto.status === status;

    if (bateTipo && bateRegiao && bateStatus) {
      const infoPonto = infoStatus[ponto.status];
      L.circleMarker([ponto.lat, ponto.lng], {
        radius: 7,
        color: "white",
        weight: 2,
        fillColor: infoPonto.corMarcador,
        fillOpacity: 1,
      })
        .bindPopup(
          `<strong>${ponto.nome}</strong><br>${ponto.cidade}<br>${infoPonto.texto}`,
        )
        .addTo(camadaMarcadores);
    }
  });
}

// Monta a legenda de cores que fica em cima do mapa
function criarLegendaMapa() {
  const legenda = document.getElementById("legendaMapa");
  legenda.innerHTML = Object.values(infoStatus)
    .map((info) => {
      return `
            <li class="itemLegenda">
                <span class="corLegenda" style="background-color: ${info.corMarcador}"></span>
                ${info.texto}
            </li>
        `;
    })
    .join("");
}

// Monta uma lista de barras horizontais (usada no resumo por região e no top 10)
function criarBarrasHorizontais(idLista, dados) {
  const maior = Math.max(...dados.map((item) => item.valor));
  const lista = document.getElementById(idLista);
  lista.innerHTML = dados
    .map((item) => {
      const largura = (item.valor / maior) * 100;
      return `
            <li class="linhaBarra">
                <span class="rotuloBarra">${item.rotulo}</span>
                <div class="trilhoBarra">
                    <div class="preenchimentoBarra" style="width: ${largura}%; background-color: ${item.cor}"></div>
                </div>
                <span class="valorBarra">${item.valor}</span>
            </li>
        `;
    })
    .join("");
}

// Monta o gráfico de colunas de ocorrências por tipo
function criarGraficoColunas(idGrafico, dados) {
  const maior = Math.max(...dados.map((item) => item.valor));
  const grafico = document.getElementById(idGrafico);
  grafico.innerHTML = dados
    .map((item) => {
      const altura = Math.round((item.valor / maior) * 120); // altura em pixels
      return `
            <div class="colunaBarra">
                <span class="valorColuna">${item.valor}</span>
                <div class="barraColuna" style="height: ${altura}px"></div>
                <span class="rotuloColuna">${item.rotulo}</span>
            </div>
        `;
    })
    .join("");
}

// Desenha o gráfico de linha de ocorrências por mês usando svg
function desenharGraficoLinha(qtdMeses) {
  const dados = dadosOcorrenciasMes.slice(-qtdMeses); // pega só os últimos meses
  const largura = 400;
  const margemEsquerda = 30;
  const margemDireita = 10;
  const topo = 25;
  const base = 145;
  const valorMaximo = 80;
  const passo = (largura - margemEsquerda - margemDireita) / (dados.length - 1);

  // linhas de grade e números do lado esquerdo
  let desenho = "";
  for (let valor = 0; valor <= valorMaximo; valor += 20) {
    const y = base - (valor / valorMaximo) * (base - topo);
    desenho += `<line x1="${margemEsquerda}" y1="${y}" x2="${largura - margemDireita}" y2="${y}" class="linhaGrade" />`;
    desenho += `<text x="${margemEsquerda - 6}" y="${y + 3}" text-anchor="end" class="textoEixo">${valor}</text>`;
  }

  // posição de cada ponto do gráfico
  const pontos = dados.map((item, indice) => {
    return {
      x: margemEsquerda + indice * passo,
      y: base - (item.valor / valorMaximo) * (base - topo),
      mes: item.mes,
      valor: item.valor,
    };
  });
  const textoPontos = pontos.map((ponto) => `${ponto.x},${ponto.y}`).join(" ");
  const ultimo = pontos[pontos.length - 1];

  desenho += `<polygon points="${margemEsquerda},${base} ${textoPontos} ${ultimo.x},${base}" class="areaGrafico" />`;
  desenho += `<polyline points="${textoPontos}" class="linhaGrafico" />`;

  // nomes dos meses embaixo e uma bolinha em cada ponto
  pontos.forEach((ponto) => {
    desenho += `<text x="${ponto.x}" y="${base + 15}" text-anchor="middle" class="textoEixo">${ponto.mes}</text>`;
    desenho += `<circle cx="${ponto.x}" cy="${ponto.y}" r="3" class="pontoGrafico"><title>${ponto.valor} ocorrências em ${ponto.mes}</title></circle>`;
  });

  // caixinha de destaque em cima do maior valor
  const maior = pontos.reduce((a, b) => (b.valor > a.valor ? b : a));
  desenho += `<rect x="${maior.x - 35}" y="${maior.y - 34}" width="70" height="24" rx="4" class="caixaDestaque" />`;
  desenho += `<text x="${maior.x}" y="${maior.y - 23}" class="textoDestaque"><tspan font-weight="700">${maior.valor} ocorrências</tspan></text>`;
  desenho += `<text x="${maior.x}" y="${maior.y - 14}" class="textoDestaque">em ${maior.mes}/2025</text>`;

  document.getElementById("graficoLinha").innerHTML = desenho;
}

// Renderiza as linhas da tabela de equipamentos com maior risco
function renderizarTabelaRisco(lista) {
  const corpoTabela = document.getElementById("corpoTabelaRisco");
  corpoTabela.innerHTML = lista
    .map((item) => {
      const risco = infoRisco[item.risco];
      return `
            <tr>
                <td>${item.codigo}</td>
                <td>${item.cliente}</td>
                <td>${item.probabilidade}</td>
                <td><span class="badgeStatus ${risco.cor}">${risco.texto}</span></td>
            </tr>
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

  // o mapa só é criado quando a aba Mapa fica visível
  if (nomeAba === "mapa") {
    iniciarMapa();
  }
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

  // filtros da aba Mapa
  document
    .getElementById("filtroTipoMapa")
    .addEventListener("change", desenharMarcadores);
  document
    .getElementById("filtroRegiaoMapa")
    .addEventListener("change", desenharMarcadores);
  document
    .getElementById("filtroStatusMapa")
    .addEventListener("change", desenharMarcadores);

  // período do gráfico de linha da aba Análise
  document
    .getElementById("filtroPeriodo")
    .addEventListener("change", (evento) => {
      desenharGraficoLinha(Number(evento.target.value));
    });

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

  // aba Mapa
  criarLegendaMapa();
  criarBarrasHorizontais("resumoRegioes", dadosRegioes);

  // aba Análise
  desenharGraficoLinha(12);
  criarGraficoRosca(
    "graficoStatusAnalise",
    "legendaStatusAnalise",
    dadosGraficoStatus,
    "1.248",
    "equipamentos",
  );
  criarBarrasHorizontais("topClientes", dadosTopClientes);
  criarGraficoColunas("ocorrenciasPorTipo", dadosOcorrenciasTipo);
  renderizarTabelaRisco(listaRisco);

  iniciarEventos();
}

iniciarPaginaEquipamentos();

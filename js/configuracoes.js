import { carregarNavbar } from "./scripts.js";

// Dados exibidos no cartão "Resumo do sistema"
const resumoSistema = [
  { rotulo: "Versão da plataforma", valor: "v2.3.1" },
  { rotulo: "Ambiente", valor: "Produção" },
  { rotulo: "Último backup", valor: "31/05/2026 02:00" },
];

// Percentual de armazenamento utilizado, usado na barra de progresso
const percentualArmazenamento = 58;

// Renderiza os itens de texto do cartão "Resumo do sistema"
function renderizarResumoSistema() {
  const lista = document.getElementById("listaResumoSistema");
  lista.innerHTML = resumoSistema
    .map(
      (item) => `
        <li class="itemResumoSistema">
            <span>${item.rotulo}</span>
            <span>${item.valor}</span>
        </li>
    `,
    )
    .join("");
}

// Preenche a barra de armazenamento utilizado com base no percentual definido acima
function renderizarArmazenamento() {
  document.getElementById("textoPercentualArmazenamento").textContent =
    `${percentualArmazenamento}% utilizado`;
  document.getElementById("preenchimentoArmazenamento").style.width =
    `${percentualArmazenamento}%`;
}

// Alterna qual seção de configuração está visível (Geral, Usuários, Permissões...)
function alternarAba(nomeAba) {
  document.querySelectorAll(".abaConfig").forEach((aba) => {
    aba.classList.toggle("abaConfigAtiva", aba.dataset.aba === nomeAba);
  });
  document.querySelectorAll(".painelConfig").forEach((painel) => {
    painel.classList.toggle("d-none", painel.dataset.painel !== nomeAba);
  });
}

// Junta os valores preenchidos no formulário de "Informações da empresa" e "Configurações gerais"
function coletarDadosFormulario() {
  return {
    nomeEmpresa: document.getElementById("campoNomeEmpresa").value,
    cnpj: document.getElementById("campoCnpj").value,
    email: document.getElementById("campoEmail").value,
    telefone: document.getElementById("campoTelefone").value,
    endereco: document.getElementById("campoEndereco").value,
    idioma: document.getElementById("campoIdioma").value,
    fuso: document.getElementById("campoFuso").value,
    formatoData: document.getElementById("campoFormatoData").value,
    moeda: document.getElementById("campoMoeda").value,
  };
}

// Liga os eventos de clique das abas e dos botões da página
function iniciarEventos() {
  document.querySelectorAll(".abaConfig").forEach((aba) => {
    aba.addEventListener("click", () => alternarAba(aba.dataset.aba));
  });

  // Botão "Salvar alterações": nesta versão apenas confirma o salvamento ao usuário
  document
    .getElementById("botaoSalvarConfig")
    .addEventListener("click", () => {
      coletarDadosFormulario(); // dados prontos para serem enviados a uma API futuramente
      alert("Configurações salvas com sucesso!");
    });

  // Botão "Alterar logo": nesta versão apenas informa que o recurso está em desenvolvimento
  document.getElementById("botaoAlterarLogo").addEventListener("click", () => {
    alert("Envio de logo em desenvolvimento.");
  });

  // Botão "Abrir chat": nesta versão apenas informa que o recurso está em desenvolvimento
  document.getElementById("botaoAbrirChat").addEventListener("click", () => {
    alert("Chat de suporte em desenvolvimento.");
  });
}

// Ponto de entrada: carrega a navbar e prepara a tela de configurações
function iniciarPaginaConfiguracoes() {
  carregarNavbar();
  renderizarResumoSistema();
  renderizarArmazenamento();
  iniciarEventos();
}

iniciarPaginaConfiguracoes();

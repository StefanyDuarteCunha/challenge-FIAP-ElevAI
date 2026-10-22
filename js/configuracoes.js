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
  document.getElementById("botaoSalvarConfig").addEventListener("click", () => {
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

/* ----------- Funções compartilhadas pelas novas abas ----------- */

// Desenha os cartões de resumo (número grande + rótulo) dentro do container informado
function renderizarCartoesResumo(idContainer, lista) {
  document.getElementById(idContainer).innerHTML = lista
    .map(
      (item) => `
        <div class="cartaoResumoConfig">
            <p class="rotuloResumoConfig">${item.rotulo}</p>
            <p class="valorResumoConfig" ${item.id ? `id="${item.id}"` : ""}>${item.valor}</p>
        </div>
    `,
    )
    .join("");
}

// Desenha uma lista de itens "rótulo + interruptor" e guarda o estado alterado no próprio objeto
function renderizarListaInterruptores(idContainer, lista) {
  const container = document.getElementById(idContainer);
  container.innerHTML = lista
    .map(
      (item, indice) => `
        <div class="linhaOpcaoConfig">
            <span><i class="bi ${item.icone}"></i>${item.rotulo}</span>
            <div class="form-check form-switch interruptorConfig">
                <input class="form-check-input" type="checkbox" data-indice="${indice}" ${item.ativo ? "checked" : ""} />
            </div>
        </div>
    `,
    )
    .join("");

  // Cada interruptor atualiza o valor "ativo" do item correspondente
  container.querySelectorAll("input[data-indice]").forEach((campo) => {
    campo.addEventListener("change", () => {
      lista[campo.dataset.indice].ativo = campo.checked;
    });
  });
}

// Converte uma data ISO (AAAA-MM-DD) para o formato brasileiro (DD/MM/AAAA)
function formatarDataBr(dataIso) {
  const [ano, mes, dia] = dataIso.split("-");
  return `${dia}/${mes}/${ano}`;
}

// Monta as iniciais de um nome para o avatar (ex.: "Maria Silva" -> "MS")
function obterIniciais(nome) {
  const partes = nome.trim().split(" ");
  const primeira = partes[0][0];
  const ultima = partes.length > 1 ? partes[partes.length - 1][0] : "";
  return (primeira + ultima).toUpperCase();
}

// Por enquanto os botões de salvar apenas confirmam ao usuário, como na aba Geral
function confirmarSalvamento(dados) {
  console.log(
    "Dados prontos para serem enviados a uma API futuramente:",
    dados,
  );
  alert("Configurações salvas com sucesso!");
}

/* ----------- Aba - Usuários ----------- */

// Cartões de resumo exibidos no topo da aba
const resumoUsuarios = [
  { rotulo: "Total de usuários", valor: "248" },
  { rotulo: "Ativos", valor: "224" },
  { rotulo: "Técnicos", valor: "86" },
  { rotulo: "Síndicos", valor: "42" },
  { rotulo: "Proprietários", valor: "36" },
];

// Total geral de usuários cadastrados (a tabela mostra apenas uma página dos resultados)
const totalUsuarios = 248;

// Usuários exibidos na tabela (mock de uma página de resultados)
const listaUsuarios = [
  {
    nome: "João Pereira",
    email: "joao@otis.com",
    perfil: "Técnico",
    empresa: "OTIS",
    ultimoAcesso: "31/05/2026 14:32",
    status: "Ativo",
  },
  {
    nome: "Maria Silva",
    email: "maria@empresa.com",
    perfil: "Empresa",
    empresa: "Elevador Center",
    ultimoAcesso: "31/05/2026 12:15",
    status: "Ativo",
  },
  {
    nome: "Carlos Lima",
    email: "carlos@condominio.com",
    perfil: "Síndico",
    empresa: "Condomínio Alpha",
    ultimoAcesso: "30/05/2026 19:42",
    status: "Ativo",
  },
  {
    nome: "Ana Costa",
    email: "ana@proprietario.com",
    perfil: "Proprietário",
    empresa: "Residencial Solaris",
    ultimoAcesso: "30/05/2026 11:27",
    status: "Ativo",
  },
  {
    nome: "Fernanda Souza",
    email: "fernanda@otis.com",
    perfil: "Técnico",
    empresa: "OTIS",
    ultimoAcesso: "29/05/2026 16:03",
    status: "Ativo",
  },
  {
    nome: "Ricardo Alves",
    email: "ricardo@otis.com",
    perfil: "Administrador",
    empresa: "OTIS",
    ultimoAcesso: "12/05/2026 09:10",
    status: "Inativo",
  },
  {
    nome: "Paula Mendes",
    email: "paula@edcentral.com",
    perfil: "Síndico",
    empresa: "Edifício Central",
    ultimoAcesso: "27/05/2026 18:45",
    status: "Bloqueado",
  },
  {
    nome: "Bruno Rocha",
    email: "bruno@otis.com",
    perfil: "Técnico",
    empresa: "OTIS",
    ultimoAcesso: "31/05/2026 08:20",
    status: "Ativo",
  },
];

// Cada status do usuário usa uma cor de badge já existente em equipamentos.css
const classeStatusUsuario = {
  Ativo: "statusOperacao",
  Inativo: "statusFora",
  Bloqueado: "statusOcorrencia",
};

// Renderiza as linhas da tabela de usuários a partir de uma lista
function renderizarTabelaUsuarios(lista) {
  const corpoTabela = document.getElementById("corpoTabelaUsuarios");

  if (lista.length === 0) {
    corpoTabela.innerHTML = `<tr class="linhaSemResultado"><td colspan="7">Nenhum usuário encontrado.</td></tr>`;
  } else {
    corpoTabela.innerHTML = lista
      .map(
        (usuario) => `
        <tr>
            <td>
                <div class="celulaUsuario">
                    <span class="avatarUsuario">${obterIniciais(usuario.nome)}</span>
                    ${usuario.nome}
                </div>
            </td>
            <td>${usuario.email}</td>
            <td>${usuario.perfil}</td>
            <td>${usuario.empresa}</td>
            <td>${usuario.ultimoAcesso}</td>
            <td><span class="badgeStatus ${classeStatusUsuario[usuario.status]}">${usuario.status}</span></td>
            <td><i class="bi bi-three-dots-vertical iconeAcao" title="Mais ações"></i></td>
        </tr>
    `,
      )
      .join("");
  }

  // Texto do rodapé: contagem geral quando não há filtro, contagem filtrada quando há
  const rodape = document.getElementById("textoRodapeUsuarios");
  rodape.textContent =
    lista.length === listaUsuarios.length
      ? `Mostrando 1-${lista.length} de ${totalUsuarios} usuários`
      : `${lista.length} resultado(s) encontrado(s)`;
}

// Aplica busca por nome/e-mail e os filtros de perfil e status juntos
function filtrarUsuarios() {
  const texto = document
    .getElementById("campoBuscaUsuario")
    .value.toLowerCase();
  const perfil = document.getElementById("filtroPerfilUsuario").value;
  const status = document.getElementById("filtroStatusUsuario").value;

  const listaFiltrada = listaUsuarios.filter((usuario) => {
    const bateBusca =
      usuario.nome.toLowerCase().includes(texto) ||
      usuario.email.toLowerCase().includes(texto);
    const batePerfil = perfil === "todos" || usuario.perfil === perfil;
    const bateStatus = status === "todos" || usuario.status === status;
    return bateBusca && batePerfil && bateStatus;
  });

  renderizarTabelaUsuarios(listaFiltrada);
}

/* ----------- Aba - Permissões ----------- */

// Perfis que aparecem como colunas da matriz de permissões
const perfisPermissao = [
  "Administrador",
  "Empresa",
  "Técnico",
  "Síndico",
  "Proprietário",
];

// Os três níveis de acesso possíveis, com o ícone e a classe de cor de cada um
const niveisAcesso = {
  total: { icone: "bi-check-lg", classe: "nivelTotal", titulo: "Acesso total" },
  parcial: {
    icone: "bi-eye",
    classe: "nivelParcial",
    titulo: "Acesso parcial",
  },
  nenhum: { icone: "bi-x-lg", classe: "nivelNenhum", titulo: "Sem acesso" },
};

// Ordem em que o nível muda a cada clique na célula
const ordemNiveisAcesso = ["total", "parcial", "nenhum"];

// Nível de acesso de cada perfil (na mesma ordem de perfisPermissao) por funcionalidade
const matrizPermissoes = [
  {
    funcionalidade: "Dashboard",
    niveis: ["total", "total", "total", "total", "nenhum"],
  },
  {
    funcionalidade: "Ocorrências",
    niveis: ["total", "total", "total", "parcial", "parcial"],
  },
  {
    funcionalidade: "Atendimentos",
    niveis: ["total", "total", "total", "parcial", "nenhum"],
  },
  {
    funcionalidade: "Equipamentos",
    niveis: ["total", "total", "parcial", "parcial", "parcial"],
  },
  {
    funcionalidade: "Técnicos",
    niveis: ["total", "total", "parcial", "nenhum", "nenhum"],
  },
  {
    funcionalidade: "Peças",
    niveis: ["total", "total", "total", "nenhum", "nenhum"],
  },
  {
    funcionalidade: "Plano de Manutenção",
    niveis: ["total", "total", "parcial", "parcial", "nenhum"],
  },
  {
    funcionalidade: "Biblioteca",
    niveis: ["total", "total", "total", "parcial", "parcial"],
  },
  {
    funcionalidade: "KPIs",
    niveis: ["total", "total", "parcial", "parcial", "nenhum"],
  },
  {
    funcionalidade: "Relatórios",
    niveis: ["total", "total", "parcial", "parcial", "parcial"],
  },
  {
    funcionalidade: "Configurações",
    niveis: ["total", "total", "nenhum", "nenhum", "nenhum"],
  },
];

// Ações que podem ser liberadas ou bloqueadas individualmente para cada perfil
const acoesPermissao = [
  { chave: "criar", rotulo: "Criar" },
  { chave: "editar", rotulo: "Editar" },
  { chave: "excluir", rotulo: "Excluir" },
  { chave: "exportar", rotulo: "Exportar" },
  { chave: "aprovar", rotulo: "Aprovar" },
];

// Estado de cada ação por perfil
const acoesPorPerfil = {
  Administrador: {
    criar: true,
    editar: true,
    excluir: true,
    exportar: true,
    aprovar: true,
  },
  Empresa: {
    criar: true,
    editar: true,
    excluir: false,
    exportar: true,
    aprovar: true,
  },
  Técnico: {
    criar: true,
    editar: true,
    excluir: false,
    exportar: false,
    aprovar: false,
  },
  Síndico: {
    criar: true,
    editar: false,
    excluir: false,
    exportar: true,
    aprovar: false,
  },
  Proprietário: {
    criar: false,
    editar: false,
    excluir: false,
    exportar: true,
    aprovar: false,
  },
};

// Desenha o cabeçalho e as linhas da matriz de permissões
function renderizarMatrizPermissoes() {
  document.getElementById("cabecalhoPermissoes").innerHTML = `
    <tr>
        <th>Funcionalidade</th>
        ${perfisPermissao.map((perfil) => `<th>${perfil}</th>`).join("")}
    </tr>
  `;

  document.getElementById("corpoTabelaPermissoes").innerHTML = matrizPermissoes
    .map(
      (linha, indiceLinha) => `
        <tr>
            <td>${linha.funcionalidade}</td>
            ${linha.niveis
              .map((nivel, indiceColuna) => {
                const dados = niveisAcesso[nivel];
                // A coluna do administrador (primeira) fica bloqueada para edição
                const bloqueada =
                  indiceColuna === 0 ? "celulaNivelBloqueada" : "";
                return `
                <td class="celulaNivel ${bloqueada}" data-linha="${indiceLinha}" data-coluna="${indiceColuna}" title="${dados.titulo}">
                    <i class="bi ${dados.icone} ${dados.classe}"></i>
                </td>`;
              })
              .join("")}
        </tr>
    `,
    )
    .join("");
}

// Avança o nível de acesso da célula clicada (total -> parcial -> nenhum -> total)
function alterarNivelAcesso(indiceLinha, indiceColuna) {
  const nivelAtual = matrizPermissoes[indiceLinha].niveis[indiceColuna];
  const proximoIndice =
    (ordemNiveisAcesso.indexOf(nivelAtual) + 1) % ordemNiveisAcesso.length;
  matrizPermissoes[indiceLinha].niveis[indiceColuna] =
    ordemNiveisAcesso[proximoIndice];
  renderizarMatrizPermissoes();
}

// Preenche o seletor de perfil do cartão "Permissões personalizadas"
function renderizarSeletorPerfilPermissao() {
  const seletor = document.getElementById("campoPerfilPermissao");
  seletor.innerHTML = perfisPermissao
    .map(
      (perfil) =>
        `<option value="${perfil}" ${perfil === "Técnico" ? "selected" : ""}>${perfil}</option>`,
    )
    .join("");
}

// Desenha os interruptores das ações do perfil selecionado
function renderizarAcoesPerfil() {
  const perfil = document.getElementById("campoPerfilPermissao").value;
  const bloqueado = perfil === "Administrador"; // o administrador sempre tem todas as ações

  document.getElementById("listaAcoesPermissao").innerHTML = acoesPermissao
    .map(
      (acao) => `
        <div class="linhaOpcaoConfig">
            <span>${acao.rotulo}</span>
            <div class="form-check form-switch interruptorConfig">
                <input class="form-check-input" type="checkbox" data-acao="${acao.chave}" ${acoesPorPerfil[perfil][acao.chave] ? "checked" : ""} ${bloqueado ? "disabled" : ""} />
            </div>
        </div>
    `,
    )
    .join("");
}

// Junta a matriz e as ações por perfil para salvar
function coletarDadosPermissoes() {
  return { matriz: matrizPermissoes, acoesPorPerfil: acoesPorPerfil };
}

/* ----------- Aba - Integrações ----------- */

// Ferramentas de ERP exibidas no cartão "ERP"
const integracoesErp = [
  { nome: "SAP", conectado: true },
  { nome: "TOTVS", conectado: true },
  { nome: "Oracle", conectado: false },
];

// Ferramentas de comunicação exibidas no cartão "Comunicação"
const integracoesComunicacao = [
  { nome: "WhatsApp Business", conectado: true },
  { nome: "Microsoft Teams", conectado: true },
  { nome: "Outlook", conectado: false },
];

// Desenha os mini cartões de cada ferramenta (nome, status e botão de configurar)
function renderizarItensIntegracao(idContainer, lista) {
  document.getElementById(idContainer).innerHTML = lista
    .map(
      (item) => `
        <div class="itemIntegracao">
            <p class="nomeIntegracao">${item.nome}</p>
            <span class="badgeStatus ${item.conectado ? "statusOperacao" : "statusOcorrencia"}">
                ${item.conectado ? "Conectado" : "Desconectado"}
            </span>
            <button class="btn btn-outline-secondary rounded-pill botaoConfigurarIntegracao" type="button" data-nome="${item.nome}">
                Configurar
            </button>
        </div>
    `,
    )
    .join("");
}

// Mostra apenas os cartões do grupo escolhido nas sub-abas (OTIS, ERP, Comunicação...)
function alternarSubAbaIntegracao(nomeGrupo) {
  document.querySelectorAll("[data-subaba]").forEach((aba) => {
    aba.classList.toggle("subAbaConfigAtiva", aba.dataset.subaba === nomeGrupo);
  });

  let totalVisiveis = 0;
  document.querySelectorAll(".cartaoIntegracao").forEach((cartao) => {
    const pertenceAoGrupo = cartao.dataset.grupos
      .split(" ")
      .includes(nomeGrupo);
    cartao.classList.toggle("d-none", !pertenceAoGrupo);
    if (pertenceAoGrupo) totalVisiveis++;
  });

  // Categorias sem integrações (Analytics e Outros) mostram uma mensagem
  document
    .getElementById("textoSemIntegracoes")
    .classList.toggle("d-none", totalVisiveis > 0);
}

// Simula o teste de conexão com a plataforma OTIS atualizando a data da última sincronização
function testarConexaoOtis() {
  const agora = new Date();
  const data = agora.toLocaleDateString("pt-BR");
  const hora = agora.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  document.getElementById("textoUltimaSincronizacao").textContent =
    `${data} ${hora}`;
  alert("Conexão com a plataforma OTIS testada com sucesso!");
}

/* ----------- Aba - Notificações ----------- */

// Tipos de notificação de cada categoria (sub-abas Operacionais, Preventivas e IA)
const tiposNotificacao = {
  operacionais: [
    {
      rotulo: "Nova ocorrência",
      icone: "bi-exclamation-triangle",
      ativo: true,
    },
    { rotulo: "Técnico designado", icone: "bi-person-check", ativo: true },
    { rotulo: "SLA em risco", icone: "bi-clock-history", ativo: true },
    {
      rotulo: "Equipamento parado",
      icone: "bi-exclamation-octagon",
      ativo: true,
    },
    {
      rotulo: "Atualização de atendimento",
      icone: "bi-arrow-repeat",
      ativo: true,
    },
  ],
  preventivas: [
    { rotulo: "Manutenção agendada", icone: "bi-calendar-check", ativo: true },
    { rotulo: "Manutenção atrasada", icone: "bi-calendar-x", ativo: true },
    { rotulo: "Peça com estoque baixo", icone: "bi-box-seam", ativo: false },
    {
      rotulo: "Inspeção próxima do vencimento",
      icone: "bi-clipboard-check",
      ativo: true,
    },
    {
      rotulo: "Plano de manutenção concluído",
      icone: "bi-check-circle",
      ativo: false,
    },
  ],
  ia: [
    { rotulo: "Falha prevista", icone: "bi-cpu", ativo: true },
    {
      rotulo: "Sugestão de reposição de peças",
      icone: "bi-box-seam",
      ativo: true,
    },
    {
      rotulo: "Anomalia detectada em sensor",
      icone: "bi-activity",
      ativo: true,
    },
    {
      rotulo: "Redistribuição de técnicos sugerida",
      icone: "bi-shuffle",
      ativo: false,
    },
    { rotulo: "Novo modelo treinado", icone: "bi-stars", ativo: false },
  ],
};

// Canais pelos quais o usuário pode receber as notificações
const canaisNotificacao = [
  { rotulo: "Push", icone: "bi-phone", ativo: true },
  { rotulo: "E-mail", icone: "bi-envelope", ativo: true },
  { rotulo: "SMS", icone: "bi-chat-dots", ativo: true },
  { rotulo: "WhatsApp", icone: "bi-whatsapp", ativo: true },
];

// Categoria exibida no momento no cartão "Tipos de notificação"
let categoriaNotificacaoAtual = "operacionais";

// Desenha a lista de tipos da categoria selecionada
function renderizarTiposNotificacao() {
  renderizarListaInterruptores(
    "listaTiposNotificacao",
    tiposNotificacao[categoriaNotificacaoAtual],
  );
}

// Troca a categoria de notificação (as alterações feitas em cada categoria são mantidas)
function alternarSubAbaNotificacao(nomeCategoria) {
  categoriaNotificacaoAtual = nomeCategoria;
  document.querySelectorAll("[data-subaba-notificacao]").forEach((aba) => {
    aba.classList.toggle(
      "subAbaConfigAtiva",
      aba.dataset.subabaNotificacao === nomeCategoria,
    );
  });
  renderizarTiposNotificacao();
}

// Os perfis só podem ser escolhidos quando "Perfis específicos" está marcado
function atualizarDestinatarios() {
  const tipo = document.querySelector(
    'input[name="destinatariosNotificacao"]:checked',
  ).value;
  document
    .querySelectorAll("#listaPerfisDestinatarios input")
    .forEach((campo) => {
      campo.disabled = tipo !== "perfis";
    });
}

// Junta os valores de tipos, canais e destinatários para salvar
function coletarDadosNotificacoes() {
  const tipoDestinatario = document.querySelector(
    'input[name="destinatariosNotificacao"]:checked',
  ).value;
  const perfisMarcados = [
    ...document.querySelectorAll("#listaPerfisDestinatarios input:checked"),
  ].map((campo) => campo.value);

  return {
    tipos: tiposNotificacao,
    canais: canaisNotificacao,
    destinatarios: tipoDestinatario === "todos" ? "todos" : perfisMarcados,
  };
}

/* ----------- Aba - Segurança ----------- */

// Cartões de resumo da segurança (o "MFA habilitado" acompanha o interruptor de MFA obrigatório)
const resumoSeguranca = [
  { rotulo: "MFA habilitado", valor: "Sim", id: "valorMfaHabilitado" },
  { rotulo: "Usuários bloqueados", valor: "2" },
  { rotulo: "Tentativas suspeitas", valor: "5" },
  { rotulo: "Último backup", valor: "31/05/2026 02:00" },
];

// Atualiza o cartão "MFA habilitado" conforme o interruptor de MFA obrigatório
function atualizarResumoMfa() {
  const mfaAtivo = document.getElementById("campoMfaObrigatorio").checked;
  document.getElementById("valorMfaHabilitado").textContent = mfaAtivo
    ? "Sim"
    : "Não";
}

// Microsoft Entra ID e Google Workspace só podem ser alterados com o login por SSO ligado
function atualizarProvedoresSso() {
  const ssoAtivo = document.getElementById("campoLoginSso").checked;
  document.getElementById("campoEntraId").disabled = !ssoAtivo;
  document.getElementById("campoGoogleWorkspace").disabled = !ssoAtivo;
}

// Junta os valores preenchidos nos cartões de autenticação, senhas e sessões
function coletarDadosSeguranca() {
  return {
    mfaObrigatorio: document.getElementById("campoMfaObrigatorio").checked,
    loginSso: document.getElementById("campoLoginSso").checked,
    entraId: document.getElementById("campoEntraId").checked,
    googleWorkspace: document.getElementById("campoGoogleWorkspace").checked,
    tamanhoMinimoSenha: document.getElementById("campoTamanhoSenha").value,
    complexidadeSenha: document.getElementById("campoComplexidadeSenha").value,
    validadeSenha: document.getElementById("campoValidadeSenha").value,
    tempoMaximoSessao: document.getElementById("campoTempoSessao").value,
    encerramentoAutomatico: document.getElementById(
      "campoEncerramentoAutomatico",
    ).checked,
  };
}

/* ----------- Aba - Auditoria ----------- */

// Total geral de registros de auditoria (a tabela mostra apenas uma página dos resultados)
const totalRegistrosAuditoria = 126;

// Tipos de ação disponíveis no filtro
const tiposAcaoAuditoria = {
  configuracao: "Configuração",
  criacao: "Criação",
  exclusao: "Exclusão",
  exportacao: "Exportação",
  permissao: "Permissão",
};

// Registros exibidos na tabela (mock de uma página de resultados)
const listaAuditoria = [
  {
    data: "2026-05-31",
    hora: "14:32",
    usuario: "Maria Silva",
    acao: "Alterou configuração",
    tipo: "configuracao",
    modulo: "Configurações",
    ip: "192.168.1.10",
  },
  {
    data: "2026-05-31",
    hora: "12:15",
    usuario: "João Pereira",
    acao: "Criou ocorrência",
    tipo: "criacao",
    modulo: "Ocorrências",
    ip: "192.168.1.45",
  },
  {
    data: "2026-05-30",
    hora: "10:42",
    usuario: "Carlos Lima",
    acao: "Excluiu documento",
    tipo: "exclusao",
    modulo: "Biblioteca",
    ip: "192.168.1.78",
  },
  {
    data: "2026-05-30",
    hora: "11:37",
    usuario: "Ana Costa",
    acao: "Exportou relatório",
    tipo: "exportacao",
    modulo: "Relatórios",
    ip: "192.168.1.23",
  },
  {
    data: "2026-05-29",
    hora: "16:03",
    usuario: "Fernanda Souza",
    acao: "Alterou permissões",
    tipo: "permissao",
    modulo: "Usuários",
    ip: "192.168.1.56",
  },
  {
    data: "2026-05-28",
    hora: "09:20",
    usuario: "Maria Silva",
    acao: "Criou usuário",
    tipo: "criacao",
    modulo: "Usuários",
    ip: "192.168.1.10",
  },
  {
    data: "2026-05-27",
    hora: "15:48",
    usuario: "João Pereira",
    acao: "Exportou relatório",
    tipo: "exportacao",
    modulo: "Relatórios",
    ip: "192.168.1.45",
  },
  {
    data: "2026-05-26",
    hora: "08:05",
    usuario: "Maria Silva",
    acao: "Alterou permissões",
    tipo: "permissao",
    modulo: "Usuários",
    ip: "192.168.1.10",
  },
];

// Indicadores exibidos no cartão lateral
const indicadoresAuditoria = [
  { rotulo: "Alterações hoje", valor: "28" },
  { rotulo: "Ações críticas", valor: "5" },
];

// Ranking de usuários com mais ações registradas
const usuariosMaisAtivos = [
  { nome: "Maria Silva", total: 14 },
  { nome: "João Pereira", total: 12 },
  { nome: "Carlos Lima", total: 10 },
];

// Preenche os filtros de usuário, módulo e tipo de ação com as opções disponíveis
function renderizarFiltrosAuditoria() {
  // Valores sem repetição, em ordem alfabética
  const usuarios = [
    ...new Set(listaAuditoria.map((registro) => registro.usuario)),
  ].sort();
  const modulos = [
    ...new Set(listaAuditoria.map((registro) => registro.modulo)),
  ].sort();

  document.getElementById("filtroUsuarioAuditoria").innerHTML =
    `<option value="todos">Todos</option>` +
    usuarios
      .map((usuario) => `<option value="${usuario}">${usuario}</option>`)
      .join("");

  document.getElementById("filtroModuloAuditoria").innerHTML =
    `<option value="todos">Todos</option>` +
    modulos
      .map((modulo) => `<option value="${modulo}">${modulo}</option>`)
      .join("");

  document.getElementById("filtroTipoAuditoria").innerHTML =
    `<option value="todos">Todos</option>` +
    Object.entries(tiposAcaoAuditoria)
      .map(([chave, rotulo]) => `<option value="${chave}">${rotulo}</option>`)
      .join("");
}

// Retorna os registros que atendem ao período e aos filtros escolhidos
function filtrarAuditoria() {
  const inicio = document.getElementById("campoPeriodoInicio").value;
  const fim = document.getElementById("campoPeriodoFim").value;
  const usuario = document.getElementById("filtroUsuarioAuditoria").value;
  const modulo = document.getElementById("filtroModuloAuditoria").value;
  const tipo = document.getElementById("filtroTipoAuditoria").value;

  return listaAuditoria.filter((registro) => {
    // Datas ISO (AAAA-MM-DD) podem ser comparadas como texto
    const dentroDoPeriodo =
      (!inicio || registro.data >= inicio) && (!fim || registro.data <= fim);
    const bateUsuario = usuario === "todos" || registro.usuario === usuario;
    const bateModulo = modulo === "todos" || registro.modulo === modulo;
    const bateTipo = tipo === "todos" || registro.tipo === tipo;
    return dentroDoPeriodo && bateUsuario && bateModulo && bateTipo;
  });
}

// Renderiza as linhas da tabela de auditoria com os filtros aplicados
function renderizarTabelaAuditoria() {
  const lista = filtrarAuditoria();
  const corpoTabela = document.getElementById("corpoTabelaAuditoria");

  if (lista.length === 0) {
    corpoTabela.innerHTML = `<tr class="linhaSemResultado"><td colspan="5">Nenhum registro encontrado.</td></tr>`;
  } else {
    corpoTabela.innerHTML = lista
      .map(
        (registro) => `
        <tr>
            <td>${formatarDataBr(registro.data)} ${registro.hora}</td>
            <td>${registro.usuario}</td>
            <td>${registro.acao}</td>
            <td>${registro.modulo}</td>
            <td>${registro.ip}</td>
        </tr>
    `,
      )
      .join("");
  }

  // Texto do rodapé: contagem geral quando não há filtro, contagem filtrada quando há
  document.getElementById("textoRodapeAuditoria").textContent =
    lista.length === listaAuditoria.length
      ? `Mostrando 1-${lista.length} de ${totalRegistrosAuditoria} registros`
      : `${lista.length} resultado(s) encontrado(s)`;
}

// Desenha os indicadores e o ranking de usuários mais ativos
function renderizarIndicadoresAuditoria() {
  document.getElementById("listaIndicadoresAuditoria").innerHTML =
    indicadoresAuditoria
      .map(
        (item) => `
        <li class="itemResumoSistema">
            <span>${item.rotulo}</span>
            <span>${item.valor}</span>
        </li>
    `,
      )
      .join("");

  document.getElementById("listaUsuariosAtivos").innerHTML = usuariosMaisAtivos
    .map(
      (usuario) =>
        `<li><span>${usuario.nome}</span><span>${usuario.total}</span></li>`,
    )
    .join("");
}

// Gera um arquivo CSV com os registros filtrados e inicia o download
function exportarAuditoria() {
  const lista = filtrarAuditoria();
  const linhas = [
    ["Data/Hora", "Usuário", "Ação", "Módulo", "IP"],
    ...lista.map((registro) => [
      `${formatarDataBr(registro.data)} ${registro.hora}`,
      registro.usuario,
      registro.acao,
      registro.modulo,
      registro.ip,
    ]),
  ];

  // Separador ";" para abrir corretamente no Excel em português e BOM para manter os acentos
  const csv = linhas
    .map((linha) => linha.map((campo) => `"${campo}"`).join(";"))
    .join("\n");
  const arquivo = new Blob(["\uFEFF" + csv], {
    type: "text/csv;charset=utf-8;",
  });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(arquivo);
  link.download = "auditoria-elevai.csv";
  link.click();
  URL.revokeObjectURL(link.href);
}

/* ----------- Aba - IA ----------- */

// Dados exibidos no cartão "Treinamento dos modelos"
const resumoTreinamentoIa = [
  { rotulo: "Última atualização", valor: "28/05/2026 03:15" },
  { rotulo: "Precisão atual", valor: "92%" },
  { rotulo: "Dados processados", valor: "1,2M" },
];

// Desenha os itens do cartão "Treinamento dos modelos"
function renderizarTreinamentoIa() {
  document.getElementById("listaTreinamentoIa").innerHTML = resumoTreinamentoIa
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

// Desabilita as opções que dependem de um recurso de IA desligado
function atualizarDependenciasIa() {
  const predicaoAtiva = document.getElementById("campoPredicaoAtiva").checked;
  document.getElementById("campoJanelaPrevisao").disabled = !predicaoAtiva;

  const despachoAtivo = document.getElementById("campoDespachoAtivo").checked;
  document.querySelectorAll(".criterioDespacho").forEach((campo) => {
    campo.disabled = !despachoAtivo;
  });
}

// Junta os valores preenchidos nos cartões de IA
function coletarDadosIa() {
  return {
    predicaoAtiva: document.getElementById("campoPredicaoAtiva").checked,
    janelaPrevisaoDias: document.getElementById("campoJanelaPrevisao").value,
    despachoAtivo: document.getElementById("campoDespachoAtivo").checked,
    criteriosDespacho: {
      menorDistancia: document.getElementById("campoCriterioDistancia").checked,
      skillCompativel: document.getElementById("campoCriterioSkill").checked,
      menorCarga: document.getElementById("campoCriterioCarga").checked,
    },
    sugestoes: {
      reposicaoPecas: document.getElementById("campoSugestaoPecas").checked,
      horarioManutencao: document.getElementById("campoSugestaoHorario")
        .checked,
      redistribuicaoTecnicos: document.getElementById("campoSugestaoTecnicos")
        .checked,
    },
  };
}

/* ----------- Eventos e carregamento das novas abas ----------- */

// Desenha o conteúdo inicial de todas as abas novas
function renderizarNovasAbas() {
  // Usuários
  renderizarCartoesResumo("resumoUsuarios", resumoUsuarios);
  renderizarTabelaUsuarios(listaUsuarios);

  // Permissões
  renderizarMatrizPermissoes();
  renderizarSeletorPerfilPermissao();
  renderizarAcoesPerfil();

  // Integrações
  renderizarItensIntegracao("listaIntegracoesErp", integracoesErp);
  renderizarItensIntegracao(
    "listaIntegracoesComunicacao",
    integracoesComunicacao,
  );
  alternarSubAbaIntegracao("otis");

  // Notificações
  renderizarTiposNotificacao();
  renderizarListaInterruptores("listaCanaisNotificacao", canaisNotificacao);

  // Segurança
  renderizarCartoesResumo("resumoSeguranca", resumoSeguranca);
  atualizarProvedoresSso();

  // Auditoria
  renderizarFiltrosAuditoria();
  renderizarTabelaAuditoria();
  renderizarIndicadoresAuditoria();

  // IA
  renderizarTreinamentoIa();
  atualizarDependenciasIa();
}

// Liga os eventos de clique, digitação e seleção das abas novas
function iniciarEventosNovasAbas() {
  // Usuários: busca e filtros atualizam a tabela; botões mostram aviso de desenvolvimento
  document
    .getElementById("campoBuscaUsuario")
    .addEventListener("input", filtrarUsuarios);
  document
    .getElementById("filtroPerfilUsuario")
    .addEventListener("change", filtrarUsuarios);
  document
    .getElementById("filtroStatusUsuario")
    .addEventListener("change", filtrarUsuarios);
  document.getElementById("botaoNovoUsuario").addEventListener("click", () => {
    alert("Cadastro de usuário em desenvolvimento.");
  });
  document
    .getElementById("corpoTabelaUsuarios")
    .addEventListener("click", (evento) => {
      if (evento.target.closest(".iconeAcao")) {
        alert("Ações do usuário em desenvolvimento.");
      }
    });

  // Permissões: clique na célula troca o nível; seletor troca o perfil das ações
  document
    .getElementById("corpoTabelaPermissoes")
    .addEventListener("click", (evento) => {
      const celula = evento.target.closest(".celulaNivel");
      if (!celula || celula.classList.contains("celulaNivelBloqueada")) return;
      alterarNivelAcesso(
        Number(celula.dataset.linha),
        Number(celula.dataset.coluna),
      );
    });
  document
    .getElementById("campoPerfilPermissao")
    .addEventListener("change", renderizarAcoesPerfil);
  document
    .getElementById("listaAcoesPermissao")
    .addEventListener("change", (evento) => {
      const perfil = document.getElementById("campoPerfilPermissao").value;
      acoesPorPerfil[perfil][evento.target.dataset.acao] =
        evento.target.checked;
    });
  document
    .getElementById("botaoSalvarPermissoes")
    .addEventListener("click", () => {
      confirmarSalvamento(coletarDadosPermissoes());
    });

  // Integrações: sub-abas, teste de conexão e botões de configuração
  document.querySelectorAll("[data-subaba]").forEach((aba) => {
    aba.addEventListener("click", () =>
      alternarSubAbaIntegracao(aba.dataset.subaba),
    );
  });
  document
    .getElementById("botaoTestarConexao")
    .addEventListener("click", testarConexaoOtis);
  document
    .getElementById("botaoConfigurarOtis")
    .addEventListener("click", () => {
      alert("Configuração da plataforma OTIS em desenvolvimento.");
    });
  document.getElementById("botaoDetalhesIot").addEventListener("click", () => {
    alert("Detalhes dos sensores IoT em desenvolvimento.");
  });
  document.querySelectorAll(".cartaoIntegracao").forEach((cartao) => {
    cartao.addEventListener("click", (evento) => {
      const botao = evento.target.closest(".botaoConfigurarIntegracao");
      if (botao)
        alert(`Configuração de ${botao.dataset.nome} em desenvolvimento.`);
    });
  });

  // Notificações: sub-abas, destinatários e salvar
  document.querySelectorAll("[data-subaba-notificacao]").forEach((aba) => {
    aba.addEventListener("click", () =>
      alternarSubAbaNotificacao(aba.dataset.subabaNotificacao),
    );
  });
  document
    .querySelectorAll('input[name="destinatariosNotificacao"]')
    .forEach((campo) => {
      campo.addEventListener("change", atualizarDestinatarios);
    });
  document
    .getElementById("botaoSalvarNotificacoes")
    .addEventListener("click", () => {
      confirmarSalvamento(coletarDadosNotificacoes());
    });

  // Segurança: interruptores que alteram outros elementos, logs e salvar
  document
    .getElementById("campoMfaObrigatorio")
    .addEventListener("change", atualizarResumoMfa);
  document
    .getElementById("campoLoginSso")
    .addEventListener("change", atualizarProvedoresSso);
  document
    .getElementById("botaoVisualizarLogs")
    .addEventListener("click", () => alternarAba("auditoria"));
  document
    .getElementById("botaoSalvarSeguranca")
    .addEventListener("click", () => {
      confirmarSalvamento(coletarDadosSeguranca());
    });

  // Auditoria: qualquer filtro atualiza a tabela; exportar baixa o CSV
  [
    "campoPeriodoInicio",
    "campoPeriodoFim",
    "filtroUsuarioAuditoria",
    "filtroModuloAuditoria",
    "filtroTipoAuditoria",
  ].forEach((id) => {
    document
      .getElementById(id)
      .addEventListener("change", renderizarTabelaAuditoria);
  });
  document
    .getElementById("botaoExportarAuditoria")
    .addEventListener("click", exportarAuditoria);

  // IA: interruptores principais habilitam ou desabilitam as opções dependentes
  document
    .getElementById("campoPredicaoAtiva")
    .addEventListener("change", atualizarDependenciasIa);
  document
    .getElementById("campoDespachoAtivo")
    .addEventListener("change", atualizarDependenciasIa);
  document.getElementById("botaoSalvarIa").addEventListener("click", () => {
    confirmarSalvamento(coletarDadosIa());
  });
}

// Ponto de entrada: carrega a navbar e prepara a tela de configurações
function iniciarPaginaConfiguracoes() {
  carregarNavbar();
  renderizarResumoSistema();
  renderizarArmazenamento();
  iniciarEventos();
  renderizarNovasAbas();
  iniciarEventosNovasAbas();
}

iniciarPaginaConfiguracoes();

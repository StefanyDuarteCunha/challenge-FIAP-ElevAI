// Lista de usuários mostrada na tabela
const listaUsuarios = [
  {
    nome: "Ana Souza",
    email: "ana@elevai.com",
    perfil: "Administrador",
    status: "Ativo",
  },
  {
    nome: "Bruno Lima",
    email: "bruno@elevai.com",
    perfil: "Gestor",
    status: "Ativo",
  },
  {
    nome: "Carlos Mendes",
    email: "carlos@elevai.com",
    perfil: "Técnico",
    status: "Ativo",
  },
  {
    nome: "Fernando Alves",
    email: "fernando@elevai.com",
    perfil: "Gestor",
    status: "Inativo",
  },
  {
    nome: "Ricardo Santos",
    email: "ricardo@elevai.com",
    perfil: "Técnico",
    status: "Ativo",
  },
];

// Adiciona na lista um usuário enviado pelo formulário de cadastro
function adicionarNovoUsuario() {
  const parametros = new URLSearchParams(window.location.search);

  const nome = parametros.get("nome");
  const email = parametros.get("email");
  const perfil = parametros.get("perfil");
  const status = parametros.get("status");

  if (nome && email && perfil && status) {
    listaUsuarios.push({ nome, email, perfil, status });

    const abaUsuarios = document.querySelector('[data-aba="usuarios"]');
    abaUsuarios.click();
  }
}

// Mostra os usuários na tabela
function mostrarUsuarios(lista) {
  const corpoTabela = document.getElementById("corpoTabelaUsuarios");
  corpoTabela.innerHTML = "";

  lista.forEach((usuario) => {
    const linha = document.createElement("tr");
    const classeStatus = usuario.status === "Ativo" ? "statusAtivo" : "statusInativo";

    linha.innerHTML = `
      <td>${usuario.nome}</td>
      <td>${usuario.email}</td>
      <td>${usuario.perfil}</td>
      <td>
        <span class="statusUsuario ${classeStatus}">
          ${usuario.status}
        </span>
      </td>
    `;

    corpoTabela.appendChild(linha);
  });
}

// Filtra a tabela pela busca, perfil e status
function filtrarUsuarios() {
  const busca = document.getElementById("buscaUsuario").value.toLowerCase();
  const perfil = document.getElementById("filtroPlanoUsuario").value;
  const status = document.getElementById("filtroStatusUsuario").value;

  const usuariosFiltrados = listaUsuarios.filter((usuario) => {
    const encontrouBusca =
      usuario.nome.toLowerCase().includes(busca) ||
      usuario.email.toLowerCase().includes(busca) ||
      usuario.perfil.toLowerCase().includes(busca);

    const encontrouPerfil = perfil === "todos" || usuario.perfil === perfil;
    const encontrouStatus = status === "todos" || usuario.status === status;

    return encontrouBusca && encontrouPerfil && encontrouStatus;
  });

  mostrarUsuarios(usuariosFiltrados);
}

// Inicia os eventos da tela de usuários
function iniciarUsuarios() {
  adicionarNovoUsuario();
  mostrarUsuarios(listaUsuarios);

  document.getElementById("buscaUsuario").addEventListener("input", filtrarUsuarios);
  document.getElementById("filtroPlanoUsuario").addEventListener("change", filtrarUsuarios);
  document.getElementById("filtroStatusUsuario").addEventListener("change", filtrarUsuarios);
}

iniciarUsuarios();

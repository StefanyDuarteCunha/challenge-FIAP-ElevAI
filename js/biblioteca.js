import { carregarNavbar } from "./scripts.js";

// Categorias exibidas na coluna lateral, com a contagem total de documentos de cada uma
const listaCategorias = [
    { nome: "Todos os documentos", total: 1248 },
    { nome: "Manuais", total: 428 },
    { nome: "Projetos", total: 312 },
    { nome: "Croquis", total: 218 },
    { nome: "Procedimentos", total: 126 },
    { nome: "Laudos", total: 98 },
    { nome: "Certificados", total: 44 },
    { nome: "Normas", total: 22 },
];

// Documentos exibidos na tabela principal (mock de uma página de resultados)
const listaDocumentos = [
    { nome: "Manual de Manutenção Elevadores Gen2", categoria: "Manuais", tipo: "PDF", versao: "v2.1", atualizado: "08/05/2026", tamanho: "18,4 MB", descricao: "Manual completo de manutenção preventiva e corretiva para elevadores da linha Gen2 Premier e Comfort.", tags: ["manutenção", "gen2", "elevadores", "otis"] },
    { nome: "Procedimento de Resgate de Passageiros", categoria: "Procedimentos", tipo: "PDF", versao: "v1.3", atualizado: "07/05/2026", tamanho: "3,2 MB", descricao: "Passo a passo seguro para resgate de passageiros em caso de parada entre andares.", tags: ["resgate", "segurança", "procedimento"] },
    { nome: "Catálogo de Peças Elevadores Gen2", categoria: "Catálogos", tipo: "PDF", versao: "v4.0", atualizado: "05/05/2026", tamanho: "22,7 MB", descricao: "Catálogo com códigos e imagens das peças de reposição da linha Gen2.", tags: ["peças", "catálogo", "gen2"] },
    { nome: "Projeto Elevador Gen2 - Ed. Paulista", categoria: "Projetos", tipo: "DWG", versao: "v1.0", atualizado: "03/05/2026", tamanho: "9,1 MB", descricao: "Projeto técnico de instalação do elevador Gen2 no edifício da Av. Paulista.", tags: ["projeto", "instalação", "paulista"] },
    { nome: "Laudo Técnico - Elevador #12345", categoria: "Laudos", tipo: "PDF", versao: "v1.2", atualizado: "01/05/2026", tamanho: "1,8 MB", descricao: "Laudo técnico de inspeção periódica do equipamento EV-12345.", tags: ["laudo", "inspeção"] },
    { nome: "Norma NBR 16083 - Elevadores", categoria: "Normas", tipo: "PDF", versao: "v3.0", atualizado: "28/04/2026", tamanho: "4,6 MB", descricao: "Norma técnica brasileira sobre requisitos de segurança para elevadores.", tags: ["norma", "nbr", "segurança"] },
    { nome: "Procedimento de Lubrificação Gen2", categoria: "Procedimentos", tipo: "PDF", versao: "v2.0", atualizado: "25/04/2026", tamanho: "2,1 MB", descricao: "Procedimento padrão de lubrificação dos componentes mecânicos da linha Gen2.", tags: ["lubrificação", "gen2", "manutenção"] },
    { nome: "Croqui Casa de Máquinas - Gen2", categoria: "Croquis", tipo: "PDF", versao: "v1.1", atualizado: "22/04/2026", tamanho: "1,3 MB", descricao: "Croqui esquemático da casa de máquinas dos elevadores Gen2.", tags: ["croqui", "casa de máquinas"] },
];

let categoriaSelecionada = "Todos os documentos";

// Desenha a lista de categorias na barra lateral, marcando a categoria ativa
function renderizarCategorias() {
    const lista = document.getElementById("listaCategorias");
    lista.innerHTML = listaCategorias.map((categoria) => `
        <li class="itemCategoria ${categoria.nome === categoriaSelecionada ? "itemCategoriaAtivo" : ""}" data-categoria="${categoria.nome}">
            <span>${categoria.nome}</span>
            <span class="contadorCategoria">${categoria.total.toLocaleString("pt-BR")}</span>
        </li>
    `).join("");

    // Cada item de categoria passa a filtrar a tabela ao ser clicado
    lista.querySelectorAll(".itemCategoria").forEach((item) => {
        item.addEventListener("click", () => selecionarCategoria(item.dataset.categoria));
    });
}

// Retorna apenas os documentos da categoria escolhida (ou todos, se for a opção geral)
function filtrarDocumentosPorCategoria() {
    if (categoriaSelecionada === "Todos os documentos") {
        return listaDocumentos;
    }
    return listaDocumentos.filter((documento) => documento.categoria === categoriaSelecionada);
}

// Troca a categoria ativa e atualiza a tabela de documentos
function selecionarCategoria(nomeCategoria) {
    categoriaSelecionada = nomeCategoria;
    renderizarCategorias();
    renderizarTabelaDocumentos(filtrarDocumentosPorCategoria());
}

// Escolhe o ícone do bootstrap-icons de acordo com o tipo de arquivo do documento
function iconePorTipo(tipo) {
    if (tipo === "DWG") return "bi-file-earmark-ruled";
    return "bi-file-earmark-pdf";
}

// Renderiza as linhas da tabela de documentos a partir de uma lista
function renderizarTabelaDocumentos(lista) {
    const corpoTabela = document.getElementById("corpoTabelaDocumentos");
    corpoTabela.innerHTML = "";

    lista.forEach((documento, indice) => {
        const linha = document.createElement("tr");
        linha.className = "linhaDocumento";
        linha.innerHTML = `
            <td><i class="bi ${iconePorTipo(documento.tipo)} iconeDocumento"></i> ${documento.nome}</td>
            <td>${documento.categoria}</td>
            <td>${documento.tipo}</td>
            <td>${documento.versao}</td>
            <td>${documento.atualizado}</td>
            <td class="acoesDocumento">
                <i class="bi bi-eye iconeAcao" title="Visualizar"></i>
                <i class="bi bi-download iconeAcao" title="Baixar"></i>
                <i class="bi bi-three-dots-vertical iconeAcao" title="Mais ações"></i>
            </td>
        `;
        linha.addEventListener("click", () => selecionarDocumento(documento));
        corpoTabela.appendChild(linha);

        // O primeiro documento da lista já aparece selecionado no visualizador
        if (indice === 0) selecionarDocumento(documento, linha);
    });
}

// Busca somente pelo nome do documento, dentro da categoria já filtrada
function buscarDocumentos() {
    const texto = document.getElementById("campoBuscaDoc").value.toLowerCase();
    const listaBase = filtrarDocumentosPorCategoria();
    const listaFiltrada = listaBase.filter((documento) => documento.nome.toLowerCase().includes(texto));
    renderizarTabelaDocumentos(listaFiltrada);
}

// Atualiza o painel do visualizador e o painel de detalhes com o documento escolhido
function selecionarDocumento(documento, linha) {
    document.querySelectorAll(".linhaDocumento").forEach((tr) => tr.classList.remove("linhaDocumentoAtiva"));
    if (linha) linha.classList.add("linhaDocumentoAtiva");

    document.getElementById("nomeArquivoVisualizador").textContent = `${documento.nome} - ${documento.tipo.toLowerCase() === "pdf" ? "pdf" : documento.tipo.toLowerCase()}`;
    document.getElementById("detalheNome").textContent = documento.nome;
    document.getElementById("detalheCategoria").textContent = documento.categoria;
    document.getElementById("detalheTipo").textContent = documento.tipo;
    document.getElementById("detalheVersao").textContent = documento.versao;
    document.getElementById("detalheTamanho").textContent = documento.tamanho;
    document.getElementById("detalheAtualizado").textContent = documento.atualizado;
    document.getElementById("detalheDescricao").textContent = documento.descricao;
    document.getElementById("detalheTags").innerHTML = documento.tags.map((tag) => `<span class="tag">${tag}</span>`).join("");
}

// Alterna entre as abas "Detalhes" e "Informações" do painel direito
function alternarAbaDetalhes(nomeAba) {
    document.querySelectorAll(".abaDetalhe").forEach((aba) => {
        aba.classList.toggle("abaDetalheAtiva", aba.dataset.aba === nomeAba);
    });
    document.querySelectorAll(".painelDetalheConteudo").forEach((painel) => {
        painel.classList.toggle("d-none", painel.dataset.painel !== nomeAba);
    });
}

// Liga os eventos de busca e das abas de detalhes do documento
function iniciarEventos() {
    document.getElementById("campoBuscaDoc").addEventListener("input", buscarDocumentos);

    document.querySelectorAll(".abaDetalhe").forEach((aba) => {
        aba.addEventListener("click", () => alternarAbaDetalhes(aba.dataset.aba));
    });
}

// Ponto de entrada: carrega a navbar e prepara a tela da biblioteca
function iniciarPaginaBiblioteca() {
    carregarNavbar();
    renderizarCategorias();
    renderizarTabelaDocumentos(listaDocumentos);
    iniciarEventos();
}

iniciarPaginaBiblioteca();

export function statusPecas () {
    const selectFiltroStatus = document.getElementById("filtroStatus");
    const selectFiltroCateg = document.getElementById("filtroCategPecas");
    const inputBusca = document.getElementById("buscaPecaDigit");
    const containerLines = document.getElementById("container-pecas-js");
    
    if (!selectFiltroStatus || !selectFiltroCateg || !inputBusca || !containerLines) return;

    const status = containerLines.querySelectorAll("tr");

    // Cria um aviso caso o filtro não encontre nenhum card
    const linhaVazia = document.createElement("tr");
    linhaVazia.style.display = "none";
    linhaVazia.innerHTML = `<td colspan="6" class="text-center dadoEquipe py-3">Nenhuma peça encontrada para este status.</td>`;
    containerLines.appendChild(linhaVazia);

    // Função auxiliar para remover acentos na busca (ex: "eletrica" encontra "Elétrica")
    const normalizar = (texto) =>
        texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    function aplicarFiltros() {
        const statusSelecionado = selectFiltroStatus.value; // 'todos', 'alto', 'baixo', 'normal'
        const categSelecionada = selectFiltroCateg.value; // 'todos', 'acessorios', 'construcao', 'consumiveis', 'eletrica', 'eletronica', 'estrutural', 'mecanica', 'seguranca', 'outro'
        const termoBusca = normalizar(inputBusca.value.trim());
        let visiveis = 0;

        status.forEach((stat) => {
            const statusPecaSelec = stat.getAttribute("status-peca");
            const categPecaSelec = stat.getAttribute("categ-peca");
            const textoLinha = normalizar(stat.textContent);
            
            const baseStatus = statusSelecionado === "todos" || statusPecaSelec === statusSelecionado;
            const baseCateg = categSelecionada === "todos" || categPecaSelec === categSelecionada;
            const baseBusca = termoBusca === "" || textoLinha.includes(termoBusca);

            if (baseStatus && baseCateg && baseBusca) {
                stat.style.display = ""; // Restaura o display original do CSS
                visiveis++;
            } else {
                stat.style.display = "none";
            }
        });

        // Mostra ou esconde a mensagem de fila vazia
        linhaVazia.style.display = visiveis === 0 ? "" : "none";
    }

    // Ambos os filtros chamam a mesma função ao mudar
    selectFiltroStatus.addEventListener("change", aplicarFiltros);
    selectFiltroCateg.addEventListener("change", aplicarFiltros);
    inputBusca.addEventListener("input", aplicarFiltros);
}
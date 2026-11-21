export function statusTecnicos () {
    const selectFiltro = document.getElementById("filtroTecnico");
    const containerLines = document.getElementById("container-status-tecnicos");
    
    if (!selectFiltro || !containerLines) return;

    const status = containerLines.querySelectorAll("tr");

    // Cria um aviso caso o filtro não encontre nenhum card
    const linhaVazia = document.createElement("tr");
    linhaVazia.style.display = "none";
    linhaVazia.innerHTML = `<td colspan="6" class="text-center dadoEquipe py-3">Nenhum técnico encontrado para este status.</td>`;
    containerLines.appendChild(linhaVazia);

    selectFiltro.addEventListener("change", () => {
        const valorSelecionado = selectFiltro.value; // 'todos', 'disponivel', 'atendimento', 'deslocamento'
        let visiveis = 0;

        status.forEach((stat) => {
            const statusTec = stat.getAttribute("status-profissional");

            if (valorSelecionado === "todos" || statusTec === valorSelecionado) {
                stat.style.display = ""; // Restaura o display original do CSS
                visiveis++;
            } else {
                stat.style.display = "none";
            }
        });

        // Mostra ou esconde a mensagem de fila vazia
        linhaVazia.style.display = visiveis === 0 ? "" : "none";
    });
}
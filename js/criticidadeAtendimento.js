export function criticidadeAtendimento() {
    const selectFiltro = document.getElementById("filtroCriticidade");
    const containerCards = document.getElementById("container-cards-fila");
    
    if (!selectFiltro || !containerCards) return;

    const cards = containerCards.querySelectorAll(".colAtendimento30");

    // Cria um aviso caso o filtro não encontre nenhum card
    const mensagemVazia = document.createElement("p");
    mensagemVazia.textContent = "Nenhum atendimento encontrado para esta criticidade na fila.";
    mensagemVazia.className = "dadosAtendimento mt-3";
    mensagemVazia.style.display = "none";
    containerCards.appendChild(mensagemVazia);

    selectFiltro.addEventListener("change", () => {
        const valorSelecionado = selectFiltro.value; // 'todos', 'critico', 'alto', 'medio', 'baixo'
        let visiveis = 0;

        cards.forEach((card) => {
            const criticidadeCard = card.getAttribute("data-criticidade");

            if (valorSelecionado === "todos" || criticidadeCard === valorSelecionado) {
                card.style.display = ""; // Restaura o display original do CSS
                visiveis++;
            } else {
                card.style.display = "none";
            }
        });

        // Mostra ou esconde a mensagem de fila vazia
        mensagemVazia.style.display = visiveis === 0 ? "block" : "none";
    });
}
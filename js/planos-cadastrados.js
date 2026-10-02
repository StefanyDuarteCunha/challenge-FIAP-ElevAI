// Abre a tela de novo plano pelo botão original do Cronograma
document.getElementById("abrirNovoPlano").addEventListener("click", function () {
    window.location.href = "novo-plano.html";
});

// Volta ao Cronograma ao cancelar ou concluir, sem receber dados do plano
window.addEventListener("load", function () {
    const parametros = new URLSearchParams(window.location.search);

    if (parametros.get("aba") === "cronograma") {
        document.getElementById("btn-cronograma").click();
    }
});

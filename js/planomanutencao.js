// Valores ilustrativos para comparar as manutenções de cada mês
const mesesManutencao = [
    "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
    "Jul", "Ago", "Set", "Out", "Nov", "Dez"
];

const manutencoesPrevistas = [70, 60, 85, 60, 80, 55, 90, 65, 70, 90, 80, 80];
const manutencoesRealizadas = [40, 50, 70, 50, 65, 45, 80, 50, 60, 70, 65, 70];

// Desenha o gráfico com o canvas do HTML, sem bibliotecas novas
function desenharGraficoManutencao() {
    const canvas = document.getElementById("graficoMensalManutencao");
    const contexto = canvas.getContext("2d");
    const inicioX = 45;
    const inicioY = 20;
    const altura = 250;
    const larguraMes = 55;

    contexto.clearRect(0, 0, canvas.width, canvas.height);
    contexto.font = "14px Arial";

    // Desenha a escala de zero a cem e as linhas horizontais
    for (let valor = 0; valor <= 100; valor += 20) {
        const y = inicioY + altura - (valor / 100) * altura;

        contexto.fillStyle = "#606060";
        contexto.textAlign = "right";
        contexto.fillText(valor, inicioX - 10, y + 5);
        contexto.strokeStyle = "#dddddd";
        contexto.beginPath();
        contexto.moveTo(inicioX, y);
        contexto.lineTo(705, y);
        contexto.stroke();
    }

    // Cada mês recebe duas barras: previstas e realizadas
    mesesManutencao.forEach(function (mes, indice) {
        const x = inicioX + indice * larguraMes + 10;
        const alturaPrevista = (manutencoesPrevistas[indice] / 100) * altura;
        const alturaRealizada = (manutencoesRealizadas[indice] / 100) * altura;

        contexto.fillStyle = "#278bd2";
        contexto.fillRect(x, inicioY + altura - alturaPrevista, 14, alturaPrevista);

        contexto.fillStyle = "#11b9c6";
        contexto.fillRect(x + 18, inicioY + altura - alturaRealizada, 14, alturaRealizada);

        contexto.fillStyle = "#606060";
        contexto.textAlign = "center";
        contexto.fillText(mes, x + 16, inicioY + altura + 25);
    });
}

// Mantém os indicadores originais nas outras abas
function atualizarIndicadoresManutencao() {
    const visaoGeralAberta = document.getElementById("btn-visao-geral").classList.contains("ativo");

    document.getElementById("indicadoresCronograma").style.display = visaoGeralAberta ? "none" : "";
    document.getElementById("indicadoresVisaoGeral").hidden = !visaoGeralAberta;
}

// Espera a navegação original ser preparada antes de abrir a visão geral
window.addEventListener("load", function () {
    desenharGraficoManutencao();

    const botoes = document.querySelectorAll(".containerBotoes .botaoNavPage");

    botoes.forEach(function (botao) {
        botao.addEventListener("click", atualizarIndicadoresManutencao);
    });

    document.getElementById("btn-visao-geral").click();
});

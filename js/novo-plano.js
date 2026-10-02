// Controla qual das quatro etapas está aberta
let etapaPlanoAtual = 0;
const paineisPlano = document.querySelectorAll(".painelEtapaPlano");
const indicadoresEtapaPlano = document.querySelectorAll(".etapasNovoPlano li");
const formularioPlano = document.getElementById("formNovoPlano");

// Exibe somente a etapa selecionada, sem apagar os dados preenchidos
function mostrarEtapaPlano() {
    paineisPlano.forEach(function (painel, indice) {
        painel.hidden = indice !== etapaPlanoAtual;
    });

    indicadoresEtapaPlano.forEach(function (indicador, indice) {
        indicador.classList.remove("etapaAtual");
        indicador.removeAttribute("aria-current");

        if (indice === etapaPlanoAtual) {
            indicador.classList.add("etapaAtual");
            indicador.setAttribute("aria-current", "step");
        }
    });

    document.getElementById("voltarEtapaPlano").hidden = etapaPlanoAtual === 0;
    document.getElementById("proximaEtapaPlano").hidden = etapaPlanoAtual === 3;
    document.getElementById("salvarNovoPlano").hidden = etapaPlanoAtual !== 3;

    if (etapaPlanoAtual === 3) {
        montarResumoPlano();
    }
}

// Confere os campos obrigatórios apenas na etapa atual
function validarEtapaPlano() {
    const campos = paineisPlano[etapaPlanoAtual].querySelectorAll("input, select, textarea");

    for (let indice = 0; indice < campos.length; indice++) {
        if (!campos[indice].reportValidity()) {
            return false;
        }
    }

    if (etapaPlanoAtual === 1) {
        const selecionados = document.querySelectorAll('[name="equipamentoPlano"]:checked');
        document.getElementById("erroEquipamentosPlano").hidden = selecionados.length > 0;

        if (selecionados.length === 0) {
            return false;
        }
    }

    return true;
}

// Monta o resumo com texto, sem interpretar os dados como HTML
function montarResumoPlano() {
    const resumo = document.getElementById("resumoNovoPlano");
    resumo.innerHTML = "";
    const selecionados = document.querySelectorAll('[name="equipamentoPlano"]:checked');
    const nomesEquipamentos = [];

    selecionados.forEach(function (campo) {
        nomesEquipamentos.push(campo.value);
    });

    const data = document.getElementById("dataPlano").value.split("-").reverse().join("/");
    const dados = [
        ["Nome do plano", document.getElementById("nomePlano").value],
        ["Tipo de manutenção", document.getElementById("tipoPlano").value],
        ["Descrição", document.getElementById("descricaoPlano").value || "Não informada"],
        ["Equipamentos", nomesEquipamentos.join("\n")],
        ["Primeira manutenção", data],
        ["Horário", document.getElementById("horarioPlano").value],
        ["Frequência", document.getElementById("frequenciaPlano").value],
        ["Responsável técnico", document.getElementById("responsavelPlano").value],
        ["Verificações", document.getElementById("verificacoesPlano").value || "Não informadas"]
    ];

    dados.forEach(function (dado) {
        const titulo = document.createElement("dt");
        const valor = document.createElement("dd");
        titulo.textContent = dado[0];
        valor.textContent = dado[1];
        resumo.appendChild(titulo);
        resumo.appendChild(valor);
    });
}

// Próximo só avança quando os dados da etapa estão válidos
document.getElementById("proximaEtapaPlano").addEventListener("click", function () {
    if (validarEtapaPlano()) {
        etapaPlanoAtual++;
        mostrarEtapaPlano();
    }
});

document.getElementById("voltarEtapaPlano").addEventListener("click", function () {
    etapaPlanoAtual--;
    mostrarEtapaPlano();
});

// Enter avança nas primeiras etapas; a confirmação descarta os dados
formularioPlano.addEventListener("submit", function (evento) {
    evento.preventDefault();

    if (etapaPlanoAtual !== 3) {
        document.getElementById("proximaEtapaPlano").click();
        return;
    }

    // Limpa os campos e retorna ao Cronograma sem enviar dados do plano
    formularioPlano.reset();
    window.location.replace("planomanutencao.html?aba=cronograma");
});

mostrarEtapaPlano();

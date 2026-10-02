// Planos ilustrativos, sem cadastro ou banco de dados
const listaTodosPlanos = [
    {
        nome: "Preventiva 2025",
        tipo: "Preventiva",
        equipamentos: 132,
        ultimaExecucao: "10/01/2025",
        status: "Em dia"
    },
    {
        nome: "Preditiva - PQ01",
        tipo: "Preditiva",
        equipamentos: 54,
        ultimaExecucao: "08/01/2025",
        status: "Em dia"
    },
    {
        nome: "Corretiva Emergencial",
        tipo: "Corretiva",
        equipamentos: 18,
        ultimaExecucao: "05/01/2025",
        status: "Em dia"
    },
    {
        nome: "Inspeção Semestral",
        tipo: "Inspeção",
        equipamentos: 28,
        ultimaExecucao: "02/01/2025",
        status: "Em dia"
    },
    {
        nome: "Manutenção Torres B",
        tipo: "Preventiva",
        equipamentos: 36,
        ultimaExecucao: "28/12/2024",
        status: "Atrasado"
    },
    // Mais sete planos ilustrativos para completar a lista de 12
    {
        nome: "Preventiva - Portas e Sensores",
        tipo: "Preventiva",
        equipamentos: 24,
        ultimaExecucao: "12/01/2025",
        status: "Em dia"
    },
    {
        nome: "Preditiva - Motores de Tração",
        tipo: "Preditiva",
        equipamentos: 16,
        ultimaExecucao: "09/01/2025",
        status: "Em dia"
    },
    {
        nome: "Inspeção - Escadas Rolantes",
        tipo: "Inspeção",
        equipamentos: 12,
        ultimaExecucao: "07/01/2025",
        status: "Em dia"
    },
    {
        nome: "Corretiva - Painéis de Comando",
        tipo: "Corretiva",
        equipamentos: 8,
        ultimaExecucao: "04/01/2025",
        status: "Atrasado"
    },
    {
        nome: "Preventiva - Plataformas PCD",
        tipo: "Preventiva",
        equipamentos: 10,
        ultimaExecucao: "03/01/2025",
        status: "Em dia"
    },
    {
        nome: "Inspeção - Freios e Segurança",
        tipo: "Inspeção",
        equipamentos: 20,
        ultimaExecucao: "30/12/2024",
        status: "Atrasado"
    },
    {
        nome: "Preventiva - Elevadores de Carga",
        tipo: "Preventiva",
        equipamentos: 14,
        ultimaExecucao: "29/12/2024",
        status: "Em dia"
    },
    // Mais doze planos ilustrativos para manter o total de 24 planos ativos do painel
    { nome: "Preventiva - Elevadores Comerciais", tipo: "Preventiva", equipamentos: 22, ultimaExecucao: "27/12/2024", status: "Em dia" },
    { nome: "Inspeção Trimestral", tipo: "Inspeção", equipamentos: 30, ultimaExecucao: "26/12/2024", status: "Em dia" },
    { nome: "Preditiva - Sensores de Porta", tipo: "Preditiva", equipamentos: 18, ultimaExecucao: "23/12/2024", status: "Em dia" },
    { nome: "Preventiva - Escadas Rolantes", tipo: "Preventiva", equipamentos: 26, ultimaExecucao: "20/12/2024", status: "Atrasado" },
    { nome: "Inspeção de Segurança", tipo: "Inspeção", equipamentos: 32, ultimaExecucao: "18/12/2024", status: "Em dia" },
    { nome: "Lubrificação Programada", tipo: "Preventiva", equipamentos: 40, ultimaExecucao: "16/12/2024", status: "Em dia" },
    { nome: "Preventiva - Torres A", tipo: "Preventiva", equipamentos: 34, ultimaExecucao: "14/12/2024", status: "Em dia" },
    { nome: "Preditiva - Vibração e Ruído", tipo: "Preditiva", equipamentos: 15, ultimaExecucao: "12/12/2024", status: "Atrasado" },
    { nome: "Revisão de Cabos de Tração", tipo: "Inspeção", equipamentos: 21, ultimaExecucao: "10/12/2024", status: "Em dia" },
    { nome: "Preventiva - Operadores de Porta", tipo: "Preventiva", equipamentos: 19, ultimaExecucao: "08/12/2024", status: "Em dia" },
    { nome: "Inspeção Anual de Elevadores", tipo: "Inspeção", equipamentos: 27, ultimaExecucao: "05/12/2024", status: "Em dia" },
    { nome: "Manutenção - Sistemas de Tração", tipo: "Corretiva", equipamentos: 13, ultimaExecucao: "02/12/2024", status: "Atrasado" },
 ];

// Exibe os planos encontrados na tabela
function mostrarTodosPlanos(lista) {
    const corpo = document.getElementById("corpoTodosPlanos");
    corpo.innerHTML = "";

    lista.forEach(function (plano) {
        const linha = document.createElement("tr");
        const dados = [plano.nome, plano.tipo, plano.equipamentos, plano.ultimaExecucao];

        dados.forEach(function (dado) {
            const celula = document.createElement("td");
            celula.textContent = dado;
            linha.appendChild(celula);
        });

        const celulaStatus = document.createElement("td");
        const status = document.createElement("span");
        status.textContent = plano.status;
        status.classList.add("statusListaPlano");

        if (plano.status === "Em dia") {
            status.classList.add("listaPlanoEmDia");
        } else {
            status.classList.add("listaPlanoAtrasado");
        }

        celulaStatus.appendChild(status);
        linha.appendChild(celulaStatus);
        corpo.appendChild(linha);
    });

    document.getElementById("mensagemTodosPlanos").hidden = lista.length > 0;
}

// Combina a busca pelo nome com o filtro de status
function filtrarTodosPlanos() {
    const busca = document.getElementById("buscaTodosPlanos").value.trim().toLowerCase();
    const status = document.getElementById("statusTodosPlanos").value;

    const resultado = listaTodosPlanos.filter(function (plano) {
        const correspondeNome = plano.nome.toLowerCase().includes(busca);
        const correspondeStatus = status === "" || plano.status === status;

        return correspondeNome && correspondeStatus;
    });

    mostrarTodosPlanos(resultado);
}

mostrarTodosPlanos(listaTodosPlanos);
document.getElementById("buscaTodosPlanos").addEventListener("input", filtrarTodosPlanos);
document.getElementById("statusTodosPlanos").addEventListener("change", filtrarTodosPlanos);

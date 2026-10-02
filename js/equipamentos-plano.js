// Dados da imagem: datas e status são mantidos como no exemplo
// As áreas foram identificadas pelos nomes dos equipamentos
const equipamentosDoPlano = [
    {
        codigo: "EQP-001",
        nome: "Elevador Social - Torre A",
        planta: "Financeiro",
        area: "Torre A",
        proximaManutencao: "10/02/2025",
        status: "Em dia"
    },
    {
        codigo: "EQP-002",
        nome: "Elevador de Serviço",
        planta: "Operações",
        area: "Serviço",
        proximaManutencao: "15/02/2025",
        status: "Em dia"
    },
    {
        codigo: "EQP-003",
        nome: "Escada Rolante - Shop",
        planta: "Shopping",
        area: "Shop",
        proximaManutencao: "20/02/2025",
        status: "Em dia"
    },
    {
        codigo: "EQP-004",
        nome: "Plataforma PCD",
        planta: "Recepção",
        area: "PCD",
        proximaManutencao: "25/02/2025",
        status: "Atrasado"
    },
    {
        codigo: "EQP-005",
        nome: "Elevador Carga",
        planta: "Logística",
        area: "Carga",
        proximaManutencao: "28/02/2025",
        status: "Em dia"
    },
];

// Preenche a tabela com os equipamentos encontrados
function mostrarEquipamentosPlano(lista) {
    const corpoTabela = document.getElementById("corpoEquipamentosPlano");
    corpoTabela.innerHTML = "";

    lista.forEach(function (equipamento) {
        const linha = document.createElement("tr");
        const dados = [
            equipamento.codigo,
            equipamento.nome,
            equipamento.planta,
            equipamento.proximaManutencao
        ];

        // Cria uma célula para cada informação do equipamento
        dados.forEach(function (dado) {
            const celula = document.createElement("td");
            celula.textContent = dado;
            linha.appendChild(celula);
        });

        // Mostra o status com a cor correspondente
        const celulaStatus = document.createElement("td");
        const status = document.createElement("span");
        status.textContent = equipamento.status;
        status.classList.add("statusEquipamentoPlano");

        if (equipamento.status === "Em dia") {
            status.classList.add("planoEmDia");
        } else {
            status.classList.add("planoAtrasado");
        }

        celulaStatus.appendChild(status);
        linha.appendChild(celulaStatus);
        corpoTabela.appendChild(linha);
    });

    document.getElementById("mensagemEquipamentosPlano").hidden = lista.length > 0;
}

// Aplica a busca, a planta e a área ao mesmo tempo
function filtrarEquipamentosPlano() {
    const busca = document.getElementById("buscaEquipamentosPlano").value.trim().toLowerCase();
    const planta = document.getElementById("filtroPlantaPlano").value;
    const area = document.getElementById("filtroAreaPlano").value;

    const resultado = equipamentosDoPlano.filter(function (equipamento) {
        const correspondeBusca = equipamento.codigo.toLowerCase().includes(busca)
            || equipamento.nome.toLowerCase().includes(busca);
        const correspondePlanta = planta === "" || equipamento.planta === planta;
        const correspondeArea = area === "" || equipamento.area === area;

        return correspondeBusca && correspondePlanta && correspondeArea;
    });

    mostrarEquipamentosPlano(resultado);
}

// Atualiza a tabela ao digitar ou selecionar um filtro
mostrarEquipamentosPlano(equipamentosDoPlano);

document.getElementById("buscaEquipamentosPlano").addEventListener("input", filtrarEquipamentosPlano);
document.getElementById("filtroPlantaPlano").addEventListener("change", filtrarEquipamentosPlano);
document.getElementById("filtroAreaPlano").addEventListener("change", filtrarEquipamentosPlano);

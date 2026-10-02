// Distribuição dos 412 equipamentos por região; os percentuais totalizam 100%
const regioesDoPlano = [
    {
        nome: "Sudeste",
        equipamentos: 165,
        percentual: 40,
        pendentes: 11,
        data: "04/10/2026",
        status: "Atenção",
        cor: "#21bc78"
    },
    {
        nome: "Sul",
        equipamentos: 89,
        percentual: 22,
        pendentes: 7,
        data: "07/10/2026",
        status: "Em dia",
        cor: "#469ac2"
    },
    {
        nome: "Nordeste",
        equipamentos: 73,
        percentual: 18,
        pendentes: 6,
        data: "05/10/2026",
        status: "Atenção",
        cor: "#4e7bbd"
    },
    {
        nome: "Centro-Oeste",
        equipamentos: 47,
        percentual: 11,
        pendentes: 4,
        data: "10/10/2026",
        status: "Em dia",
        cor: "#16b5b8"
    },
    {
        nome: "Norte",
        equipamentos: 38,
        percentual: 9,
        pendentes: 6,
        data: "03/10/2026",
        status: "Crítico",
        cor: "#3c61a1"
    },
 ];

// Mostra a distribuição nacional, independentemente do filtro da tabela
function mostrarDistribuicaoRegioes() {
    const container = document.getElementById("barrasRegioesPlano");

    regioesDoPlano.forEach(function (regiao) {
        const item = document.createElement("div");
        item.classList.add("itemDistribuicaoRegiao");

        const rotulo = document.createElement("div");
        rotulo.classList.add("rotuloDistribuicaoRegiao");

        const nome = document.createElement("span");
        nome.textContent = regiao.nome;

        const quantidade = document.createElement("strong");
        quantidade.textContent = regiao.equipamentos + " (" + regiao.percentual + "%)";

        rotulo.appendChild(nome);
        rotulo.appendChild(quantidade);

        const trilha = document.createElement("div");
        trilha.classList.add("trilhaDistribuicaoRegiao");

        const barra = document.createElement("div");
        barra.classList.add("barraDistribuicaoRegiao");
        // A largura usa a quantidade real dividida pelo total nacional de 412
        barra.style.width = (regiao.equipamentos / 412) * 100 + "%";
        barra.style.backgroundColor = regiao.cor;

        trilha.appendChild(barra);
        item.appendChild(rotulo);
        item.appendChild(trilha);
        container.appendChild(item);
    });
}

// Preenche as linhas da tabela com as regiões selecionadas
function mostrarTabelaRegioes(lista) {
    const corpo = document.getElementById("corpoTabelaRegioes");
    corpo.innerHTML = "";

    lista.forEach(function (regiao) {
        const linha = document.createElement("tr");
        const dados = [
            regiao.nome,
            regiao.equipamentos + " (" + regiao.percentual + "%)",
            regiao.pendentes,
            regiao.data
        ];

        dados.forEach(function (dado) {
            const celula = document.createElement("td");
            celula.textContent = dado;
            linha.appendChild(celula);
        });

        const celulaStatus = document.createElement("td");
        const status = document.createElement("span");
        status.textContent = regiao.status;
        status.classList.add("statusRegiaoPlano");

        if (regiao.status === "Em dia") {
            status.classList.add("regiaoEmDia");
        } else if (regiao.status === "Atenção") {
            status.classList.add("regiaoAtencao");
        } else {
            status.classList.add("regiaoCritica");
        }

        celulaStatus.appendChild(status);
        linha.appendChild(celulaStatus);
        corpo.appendChild(linha);
    });

    document.getElementById("mensagemRegioesPlano").hidden = lista.length > 0;
}

// Combina o período escolhido e o status da manutenção
function filtrarRegioesPlano() {
    const periodo = document.getElementById("periodoRegioesPlano").value;
    const status = document.getElementById("statusRegioesPlano").value;
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const fimSemana = new Date(hoje);
    fimSemana.setDate(hoje.getDate() + 7);

    const resultado = regioesDoPlano.filter(function (regiao) {
        const partesData = regiao.data.split("/");
        const data = new Date(partesData[2], partesData[1] - 1, partesData[0]);
        const correspondeStatus = status === "" || regiao.status === status;
        let correspondePeriodo = true;

        if (periodo === "mes") {
            correspondePeriodo = data.getMonth() === hoje.getMonth()
                && data.getFullYear() === hoje.getFullYear();
        } else if (periodo === "semana") {
            correspondePeriodo = data >= hoje && data < fimSemana;
        }

        return correspondeStatus && correspondePeriodo;
    });

    mostrarTabelaRegioes(resultado);
}

mostrarDistribuicaoRegioes();
filtrarRegioesPlano();

document.getElementById("periodoRegioesPlano").addEventListener("change", filtrarRegioesPlano);
document.getElementById("statusRegioesPlano").addEventListener("change", filtrarRegioesPlano);

// Reutiliza o botão original para abrir diretamente a aba Equipamentos
// A troca de aba conserva a navegação e os indicadores já existentes
document.getElementById("verEquipamentosRegioes").addEventListener("click", function () {
    document.getElementById("btn-equipamentos").click();
});

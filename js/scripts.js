/* ----------- Global ----------- */
// função utilizada para carregar a navbar em todas as outras telas - todas as telas
export function carregarNavbar() {
    fetch('navbar.html')
        .then(r => r.text())
        .then(html => {
            const template = document.createElement('template');
            template.innerHTML = html.trim();
            document.getElementById('navbar-placeholder').appendChild(template.content);

            ativarLinkAtual();
        });
}

function ativarLinkAtual() {
    const links = document.querySelectorAll('.titleNav a');

    // Obtém o nome do arquivo da página atual
    const paginaAtual = window.location.pathname.split('/').pop();

    links.forEach(link => {
        const href = link.getAttribute('href').split('/').pop();

        link.classList.remove('ativo');

        if (href === paginaAtual) {
            link.classList.add('ativo');
        }
    });
}



/* ----------- Tela - Dashboard ----------- */
// função utilizada para criar gráfico rosca - tela Dashboard
export function graficoRosca() {
    const ctx = document.getElementById('graficoRosca');

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Crítica', 'Alta', 'Média', 'Baixa'],
            datasets: [{
                data: [34, 25, 50, 19],
                backgroundColor: [
                    '#ff2d2d',
                    '#ff6b2c',
                    '#ffc107',
                    '#28a745'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,  // trás responsividade ao gráfico
            cutout: '60%',  // modifica o tamanho interno da rosquinha
            maintainAspectRatio: false,  // o gráfico para de utilizar a sua proporção padrão e remove espaços excessivos de paddding
            layout: {
                padding: 0
            },
            plugins: {
                datalabels: {
                    color: "#fff",
                    font: {
                        size: 12
                    },
                    formatter: (value) => value   // mostra o número
                },
                legend: {
                    display: true,
                    position: "right",
                    align: 'center',
                    labels: {
                        responsive: true,
                        usePointStyle: true,
                        pointStyle: 'circle',
                        padding: 20,
                        boxWidth: 20,
                        font: {
                            size: 12
                        }
                    }
                }
            }
        },
        plugins: [ChartDataLabels]
    });
}



// função utilizada para criar gráfico rosca SLA - tela Dashboard
export function graficoRoscaSLA() {
    const ctx = document.getElementById('graficoRoscaSLA');

    const centerText = {
        id: "centerText",
        afterDraw(chart) {
            const { ctx, chartArea: { width, height } } = chart;

            // valor da posição 0 do seu data
            const value = chart.data.datasets[0].data[0] + "%";

            ctx.save();
            ctx.font = "bold 26px sans-serif";
            ctx.fillStyle = "#000"; // cor do texto
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            // posição central do gráfico
            ctx.fillText(value, width / 2, height / 2);
            ctx.restore();
        }
    };

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Dentro do SLA', 'Fora do SLA'],
            datasets: [{
                data: [92, 8],
                backgroundColor: [
                    '#0c5dc2',
                    '#64bcef',
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,  // trás responsividade ao gráfico
            cutout: '60%',  // modifica o tamanho interno da rosquinha
            maintainAspectRatio: false,  // o gráfico para de utilizar a sua proporção padrão e remove espaços excessivos de paddding
            layout: {
                padding: 0
            },
            plugins: {
                legend: {
                    display: false,
                }
            }
        },
        plugins: [centerText]
    });
}



// função utilizada para criar gráfico linha - tela Dashboard
export function graficoLinhas() {
    const ctx = document.getElementById('graficoLinhas').getContext('2d');

    const dados = {
        labels: ['03/05', '04/05', '05/05', '06/05', '07/05', '08/05', '09/05', '10/05', '11/05'],
        datasets: [
            {
                label: 'Resolvidas',
                data: [250, 300, 280, 320, 310, 350, 200, 300, 220], 
                borderColor: '#28a745',
                backgroundColor: 'rgba(40, 167, 69, 0.1)',
                tension: 0.3,
                fill: false
            },
            {
                label: 'Abertas',
                data: [100, 150, 180, 200, 215, 300, 125, 180, 75], 
                borderColor: '#007bff', 
                backgroundColor: 'rgba(0, 123, 255, 0.1)',
                tension: 0.3,
                fill: false
            }
        ]
    };

    new Chart(ctx, {
        type: 'line',
        data: dados,
        options: {
            responsive: true,  // trás responsividade ao gráfico
            plugins: {
                legend: {
                    display: true,
                    position: "right",
                    labels: {
                        padding: 30   // aumenta o espaço entre os itens
                        }
                }
            },
            scales: {
                x: {
                    title: {
                        display: false,
                    },
                    grid: {
                        display: false // Remove as linhas horizontais
                    },
                },
                y: {
                    title: {
                        display: false,
                    },
                    ticks: {
                        stepSize: 100   // intervalo de 100 em 100
                    },
                    grid: {
                        display: false // Remove as linhas verticais
                    },
                    min: 70,          // Faz o gráfico começar estritamente em 50
                    max: 370,         // Mantém o limite superior em 100
                }
            }
        }
    });
}



/* ----------- Tela - Relatório ----------- */
// função utilizada para manter botão ativo e alternar conteúdo - tela Relatório
export function botaoNavPagesRelatorio() {
    const btnPadrao = document.getElementById('botao-padrao');
    const btnMeus = document.getElementById('botao-meus-relatorios');
    const tabelaPadrao = document.getElementById('tabela-padrao');
    const tabelaMeus = document.getElementById('tabela-meus-relatorios');

    // Evento para o botão "Relatórios padrão"
    btnPadrao.addEventListener('click', () => {
        // Ajusta os botões
        btnPadrao.classList.add('ativo');
        btnMeus.classList.remove('ativo');

        // Ajusta as divs (mostra padrão, esconde meus)
        tabelaPadrao.classList.remove('escondido');
        tabelaMeus.classList.add('escondido');
    });

    // Evento para o botão "Meus relatórios"
    btnMeus.addEventListener('click', () => {
        // Ajusta os botões
        btnMeus.classList.add('ativo');
        btnPadrao.classList.remove('ativo');

        // Ajusta as divs (esconde padrão, mostra meus)
        tabelaPadrao.classList.add('escondido');
        tabelaMeus.classList.remove('escondido');
    });
}



/* ----------- Tela - Atendimento ----------- */
// função utilizada para manter botão ativo e alternar conteúdo - tela Atendimento
export function botaoNavPageAtendimento() {
    const btnFila = document.getElementById('botao-fila');
    const btnHistoric = document.getElementById('botao-historico');
    const telaFila = document.getElementById('tela-fila');
    const telaHistorico = document.getElementById('tela-historico');

    // Evento para o botão "Fila de Atendimento"
    btnFila.addEventListener('click', () => {
        // Ajusta os botões
        btnFila.classList.add('ativo');
        btnHistoric.classList.remove('ativo');

        // Ajusta as divs (mostra padrão, esconde meus)
        telaFila.classList.remove('escondido');
        telaHistorico.classList.add('escondido');
    });

    // Evento para o botão "Histórico de atendimento"
    btnHistoric.addEventListener('click', () => {
        // Ajusta os botões
        btnHistoric.classList.add('ativo');
        btnFila.classList.remove('ativo');

        // Ajusta as divs (esconde padrão, mostra meus)
        telaFila.classList.add('escondido');
        telaHistorico.classList.remove('escondido');
    });
}


/* ----------- Tela - Plano de Manutenção ----------- */
// função utilizada para manter botão ativo e alternar conteúdo - tela Plano de Manutenção
export function botaoNavPageManutencao() {
    const btnVisaoGeral = document.getElementById('btn-visao-geral');
    const btnCronograma = document.getElementById('btn-cronograma');
    const btnEquipamentos = document.getElementById('btn-equipamentos');
    const btnRegioes = document.getElementById('btn-regioes');
    const telaVisaoGeral = document.getElementById('tela-visao-geral');
    const telaCronograma = document.getElementById('tela-cronograma');
    const telaEquipamentos = document.getElementById('tela-equipamentos');
    const telaRegioes = document.getElementById('tela-regioes');

    // Evento para o botão "Visão Geral"
    btnVisaoGeral.addEventListener('click', () => {
        // Ajusta os botões
        btnVisaoGeral.classList.add('ativo');
        btnCronograma.classList.remove('ativo');
        btnEquipamentos.classList.remove('ativo');
        btnRegioes.classList.remove('ativo');

        // Ajusta as divs (mostra padrão, esconde meus)
        telaVisaoGeral.classList.remove('escondido');
        telaCronograma.classList.add('escondido');
        telaEquipamentos.classList.add('escondido');
        telaRegioes.classList.add('escondido');
    });

    // Evento para o botão "Cronograma"
    btnCronograma.addEventListener('click', () => {
        // Ajusta os botões
        btnVisaoGeral.classList.remove('ativo');
        btnCronograma.classList.add('ativo');
        btnEquipamentos.classList.remove('ativo');
        btnRegioes.classList.remove('ativo');

        // Ajusta as divs (mostra padrão, esconde meus)
        telaVisaoGeral.classList.add('escondido');
        telaCronograma.classList.remove('escondido');
        telaEquipamentos.classList.add('escondido');
        telaRegioes.classList.add('escondido');
    });

    // Evento para o botão "Equipamentos"
    btnEquipamentos.addEventListener('click', () => {
        // Ajusta os botões
        btnVisaoGeral.classList.remove('ativo');
        btnCronograma.classList.remove('ativo');
        btnEquipamentos.classList.add('ativo');
        btnRegioes.classList.remove('ativo');

        // Ajusta as divs (mostra padrão, esconde meus)
        telaVisaoGeral.classList.add('escondido');
        telaCronograma.classList.add('escondido');
        telaEquipamentos.classList.remove('escondido');
        telaRegioes.classList.add('escondido');
    });

    // Evento para o botão "Regiões"
    btnRegioes.addEventListener('click', () => {
        // Ajusta os botões
        btnVisaoGeral.classList.remove('ativo');
        btnCronograma.classList.remove('ativo');
        btnEquipamentos.classList.remove('ativo');
        btnRegioes.classList.add('ativo');

        // Ajusta as divs (mostra padrão, esconde meus)
        telaVisaoGeral.classList.add('escondido');
        telaCronograma.classList.add('escondido');
        telaEquipamentos.classList.add('escondido');
        telaRegioes.classList.remove('escondido');
    });
}


/* ----------- Tela - Peças ----------- */
// função utilizada para criar gráfico linha - tela Peças
export function graficoLinhasPecas() {
    const ctx = document.getElementById('graficoLinhasPecas').getContext('2d');

    // Criar um degradê na área de plotagem
    const gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);  // informação ctx.canvas.height coloca um degrade que acompanha o tamanho do gráfico
    gradient.addColorStop(0, 'rgba(0, 123, 255, 0.4)');  // cor mais forte perto da linha
    gradient.addColorStop(1, 'rgba(0, 123, 255, 0)');    // transparente no eixo X

    const dados = {
        labels: ["Set", "Out", "Nov", "Dez", "Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago"],
        datasets: [{
            data: [50, 75, 65, 100, 150, 55, 90, 85, 80, 140, 145, 200], 
            borderColor: '#007bff', 
            backgroundColor: gradient,
            tension: 0.3,
            fill: true  // usado para que o gradiente funcione
        }]
    };

    new Chart(ctx, {
        type: 'line',
        data: dados,
        options: {
            responsive: true,  // trás responsividade ao gráfico
            plugins: {
                legend: {
                    display: false,
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                    }
                },
                y: {
                    title: {
                        display: true,
                    },
                    beginAtZero: true,
                    ticks: {
                        stepSize: 50   // intervalo de 100 em 100
                    }
                }
            },
            maintainAspectRatio: false,
            layout: {
                padding: 0
            },
        }
    });
}



// função utilizada para criar gráfico barra vertical - tela Peças
export function graficoBarraV() {
    const ctx = document.getElementById('graficoBarraV');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Sensor de porta', 'Placa de controle', 'Inversor OEN2', 'Correia de tração', 'Limitador de velocidade'],
            datasets: [{
                data: [225, 180, 154, 120, 96],
                backgroundColor: '#1c3f90',
                borderWidth: 1,
                barThickness: 20
            }]
        },
        options: {
            indexAxis: 'y', // transforma em gráfico horizontal
            responsive: true,  // trás responsividade ao gráfico
            maintainAspectRatio: false,  // o gráfico para de utilizar a sua proporção padrão e remove espaços excessivos de paddding
            layout: {
                padding: 0
            },
            plugins: {
                datalabels: {
                    color: "#fff",
                    font: {
                        size: 12
                    },
                    formatter: (value) => value   // mostra o número
                },
                legend: {
                    display: false,
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    ticks: {
                        display: false   // remove os números do eixo X
                    },
                    grid: {
                        display: false   // opcional: remove as linhas de grade
                    }
                },
                y: {
                    grid: {
                        display: false   // opcional: remove as linhas de grade
                    }
                }
            }
        },
        plugins: [ChartDataLabels]
    });
}



/* ----------- Tela - KPIs ----------- */
// função utilizada para criar gráfico rosca - tela KPIs
export function graficoRoscaKpi() {
    const ctx = document.getElementById('graficoRoscaKpi');

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Crítica', 'Alta', 'Média', 'Baixa'],
            datasets: [{
                data: [126, 264, 495, 384],
                backgroundColor: [
                    '#ff2d2d',
                    '#ff6b2c',
                    '#ffc107',
                    '#28a745'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,  // trás responsividade ao gráfico
            cutout: '60%',  // modifica o tamanho interno da rosquinha
            maintainAspectRatio: false,  // o gráfico para de utilizar a sua proporção padrão e remove espaços excessivos de paddding
            layout: {
                padding: 0
            },
            plugins: {
                datalabels: {
                    color: "#fff",
                    font: {
                        size: 12
                    },
                    formatter: (value) => value   // mostra o número
                },
                legend: {
                    display: true,
                    position: "right",
                    align: 'center',
                    labels: {
                        responsive: true,
                        usePointStyle: true,
                        pointStyle: 'circle',
                        padding: 20,
                        boxWidth: 20,
                        font: {
                            size: 12
                        }
                    }
                }
            }
        },
        plugins: [ChartDataLabels]
    });
}



// função utilizada para criar gráfico linha - tela KPIs
export function graficoLinhasKpi() {
    const ctx = document.getElementById('graficoLinhasKpi').getContext('2d');

    // Criar um degradê na área de plotagem
    const gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);  // informação ctx.canvas.height coloca um degrade que acompanha o tamanho do gráfico
    gradient.addColorStop(0, 'rgba(0, 123, 255, 0.8)');  // cor mais forte perto da linha
    gradient.addColorStop(1, 'rgba(0, 123, 255, 0)');    // transparente no eixo X

    const dados = {
        labels: ["01/08", "02/08", "03/08", "04/08", "05/08", "06/08", "07/08", "08/08", "09/08", "10/08", "11/08", "12/08", "13/08", "14/08", "15/08", "16/08", "17/08", "18/08", "19/08", "20/08", "21/08", "22/08", "23/08", "24/08", "25/08", "26/08", "27/08", "28/08", "29/08", "30/08", "31/08"],
        datasets: [{
            data: [66, 81, 95, 72, 62, 75, 69, 65, 63, 74, 68, 67, 76, 96, 97, 84, 94, 90, 88, 73, 80, 85, 71, 99, 77, 93, 60, 100, 92, 86, 78], 
            borderColor: '#007bff', 
            backgroundColor: gradient,
            tension: 0.3,
            fill: true  // usado para que o gradiente funcione
        }]
    };

    new Chart(ctx, {
        type: 'line',
        data: dados,
        options: {
            responsive: true,  // trás responsividade ao gráfico
            plugins: {
                legend: {
                    display: false,
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                    },
                    ticks: {
                        // Força o gráfico a mostrar no máximo 10 rótulos
                        maxTicksLimit: 10
                    },
                    grid: {
                        display: false // Remove as linhas verticais
                    }
                },
                y: {
                    title: {
                        display: true,
                    },
                    beginAtZero: true,
                    ticks: {
                        stepSize: 10   // intervalo de 100 em 100
                    },
                    grid: {
                        display: false // Remove as linhas verticais
                    },
                    min: 50,          // Faz o gráfico começar estritamente em 50
                    max: 100,         // Mantém o limite superior em 100
                }
            },
            maintainAspectRatio: false,
            layout: {
                padding: 0
            },
        }
    });
}



// função utilizada para criar gráfico barra vertical - tela KPIs
export function graficoBarraVkpis() {
    const ctx = document.getElementById('graficoBarraVkpis');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Falha na porta interna", "Pane elétrica", "Parada entre andares", "Alarme acionado", "Falha na porta externa"],
            datasets: [{
                data: [286, 186, 154, 132, 96],
                backgroundColor: '#1c3f90',
                borderWidth: 1,
                barThickness: 20
            }]
        },
        options: {
            indexAxis: 'y', // transforma em gráfico horizontal
            responsive: true,  // trás responsividade ao gráfico
            maintainAspectRatio: false,  // o gráfico para de utilizar a sua proporção padrão e remove espaços excessivos de paddding
            layout: {
                padding: 0
            },
            plugins: {
                datalabels: {
                    color: "#fff",
                    font: {
                        size: 12
                    },
                    formatter: (value) => value   // mostra o número
                },
                legend: {
                    display: false,
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    ticks: {
                        display: false   // remove os números do eixo X
                    },
                    grid: {
                        display: false   // opcional: remove as linhas de grade
                    }
                },
                y: {
                    grid: {
                        display: false   // opcional: remove as linhas de grade
                    }
                }
            }
        },
        plugins: [ChartDataLabels]
    });
}
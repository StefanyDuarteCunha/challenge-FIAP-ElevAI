
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
                        display: true,
                    }
                },
                y: {
                    title: {
                        display: true,
                    },
                    beginAtZero: true,
                    ticks: {
                        stepSize: 100   // intervalo de 100 em 100
                    }
                }
            }
        }
    });
}



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
                }
            }
        },
        plugins: [ChartDataLabels]
    });
}

// função utilizada para carregar a navbar em todas as outras telas
export function carregarNavbar() {
    fetch('navbar.html')
        .then(r => r.text())
        .then(html => {
            const template = document.createElement('template');
            template.innerHTML = html.trim();
            document.getElementById('navbar-placeholder').appendChild(template.content);
        });
}

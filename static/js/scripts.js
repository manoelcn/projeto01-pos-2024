/*!
* Start Bootstrap - Simple Sidebar v6.0.6 (https://startbootstrap.com/template/simple-sidebar)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-simple-sidebar/blob/master/LICENSE)
*/
// 
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sb-sidenav-toggled');
        // }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

});


// Função para gerar anos dinamicamente
function populateYears() {
    const selectElement = document.getElementById('school_year');
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 5;

    for (let year = currentYear; year >= startYear; year--) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        selectElement.appendChild(option);
    }
}

// Chama a função para preencher o <select> ao carregar a página
document.addEventListener('DOMContentLoaded', populateYears);

// Função para formatar a data
function formatDate(dateString) {
    // Divide a data em partes [ano, mês, dia]
    const [year, month, day] = dateString.split('-');
    // Retorna a data no formato "dd/mm/yyyy"
    return `${day}/${month}/${year}`;
}

// Obtém o elemento de data de nascimento
const birthdateElement = document.getElementById('birthdate');

// Verifica se o elemento existe
if (birthdateElement) {
    // Obtém a data original (no formato "yyyy/mm/dd")
    const originalDate = birthdateElement.textContent.trim();

    // Formata a data para "dd/mm/yyyy"
    const formattedDate = formatDate(originalDate);

    // Atualiza o conteúdo do elemento com a data formatada
    birthdateElement.textContent = formattedDate;
}

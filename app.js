const toggle = document.getElementById('menu-toggle');
const menu = document.querySelector('.menu');
const hamburguesa = document.querySelector('.hamburguesa');

function cerrarMenu() {
    toggle.checked = false;
    document.body.style.overflow = '';
}

function abrirMenu() {
    toggle.checked = true;
    document.body.style.overflow = 'hidden';
}

// Control directo por JS: más confiable que depender del label+checkbox nativo,
// que en algunos emuladores de celular no reacciona bien al toque.
hamburguesa.addEventListener('click', function(e) {
    e.preventDefault();
    if (toggle.checked) {
        cerrarMenu();
    } else {
        abrirMenu();
    }
});

document.addEventListener('click', function(e) {
    const clickDentroDelMenu = menu.contains(e.target);
    const clickEnHamburguesa = hamburguesa.contains(e.target);

    if (!clickDentroDelMenu && !clickEnHamburguesa) {
        cerrarMenu();
    }
});

// Cierra el menú primero y RECIÉN DESPUÉS salta a la sección,
// para que no se vean superpuestos mientras se desvanece
menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const destino = document.querySelector(this.getAttribute('href'));
        cerrarMenu();
        setTimeout(() => {
            if (destino) destino.scrollIntoView({ behavior: 'smooth' });
        }, 300); // coincide con la duración de la transición del menú en el CSS
    });
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') cerrarMenu();
});

// Al cargar la página el menú siempre arranca cerrado
cerrarMenu();
window.addEventListener('pageshow', cerrarMenu);

// Si agrandás la ventana (o rotás el celular), se cierra solo
window.addEventListener('resize', function () {
    if (window.innerWidth > 768) cerrarMenu();
});


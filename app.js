    const toggle = document.getElementById('menu-toggle');
    const menu = document.querySelector('.menu');

    document.addEventListener('click', function(e) {
        if (!menu.contains(e.target) && !toggle.contains(e.target)) {
            toggle.checked = false;
        }
    });

    window.addEventListener('scroll', function() {
        toggle.checked = false;
    });
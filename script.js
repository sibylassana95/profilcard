// Gestion du thème avec optimisation des performances
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;

    // Fonction pour définir le thème
    const setTheme = (isDark) => {
        html.classList.toggle('dark', isDark);
        localStorage.theme = isDark ? 'dark' : 'light';
    };

    // Vérifier le thème préféré de l'utilisateur
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.theme;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        setTheme(true);
    }

    // Gérer le clic sur le bouton avec debounce
    let debounceTimer;
    themeToggle.addEventListener('click', () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            setTheme(!html.classList.contains('dark'));
        }, 100);
    });

    // Observer les changements de préférence système
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!('theme' in localStorage)) {
            setTheme(e.matches);
        }
    });
});
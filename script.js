document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  const shareBtn = document.getElementById('share-btn');

  let toastTimeout;

  // Theme management
  const setTheme = (isDark) => {
    html.classList.toggle('dark', isDark);
    localStorage.theme = isDark ? 'dark' : 'light';
    document.documentElement.style.transition = 'background-color 0.3s ease';
  };

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.theme;

  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    setTheme(true);
  }

  themeToggle.addEventListener('click', () => {
    setTheme(!html.classList.contains('dark'));
  });

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!('theme' in localStorage)) {
      setTheme(e.matches);
    }
  });

  // Toast notification
  const showToast = (message) => {
    clearTimeout(toastTimeout);
    toastMessage.textContent = message;
    toast.classList.add('show');
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 2500);
  };

  // Share functionality
  if (shareBtn) {
    shareBtn.addEventListener('click', async () => {
      const shareData = {
        title: 'Siby Lassana | Développeur Full Stack',
        text: 'Découvrez ma carte de visite numérique !',
        url: window.location.href,
      };

      if (navigator.share) {
        try {
          await navigator.share(shareData);
        } catch (err) {
          if (err.name !== 'AbortError') {
            navigator.clipboard.writeText(window.location.href);
            showToast('Lien copié dans le presse-papier !');
          }
        }
      } else {
        navigator.clipboard.writeText(window.location.href);
        showToast('Lien copié dans le presse-papier !');
      }
    });
  }

  // Smooth image load
  const img = document.querySelector('img[alt="Siby Lassana"]');
  if (img) {
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.6s ease';
    img.addEventListener('load', () => {
      img.style.opacity = '1';
    });
    if (img.complete) {
      img.style.opacity = '1';
    }
  }

  // Stagger animation entrances
  const animateElements = document.querySelectorAll('.animate-slide-up, .animate-scale-in, .animate-fade-in');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  animateElements.forEach((el) => {
    el.style.animationPlayState = 'paused';
    observer.observe(el);
  });
});
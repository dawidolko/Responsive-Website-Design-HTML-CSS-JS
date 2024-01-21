document.addEventListener('DOMContentLoaded', (event) => {
    const cookieContainer = document.querySelector('.cookie');
    const acceptButton = document.querySelector('.cookie__btn');

    // Funkcja do ukrywania komunikatu o cookie
    const hideCookieBanner = () => {
        cookieContainer.style.display = 'none';
    };

    // Sprawdź, czy użytkownik już zaakceptował pliki cookie
    const cookieAccepted = localStorage.getItem('cookieAccepted');
    if (cookieAccepted) {
        hideCookieBanner();
    }

    // Dodaj obsługę zdarzenia kliknięcia do przycisku "Akceptuj"
    acceptButton.addEventListener('click', () => {
        localStorage.setItem('cookieAccepted', 'true');
        hideCookieBanner();
    });
});

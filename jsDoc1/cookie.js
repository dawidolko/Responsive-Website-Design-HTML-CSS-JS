/**
 * Funkcja obsługująca zdarzenie `DOMContentLoaded`.
 * @param {Event} event - Obiekt zdarzenia `DOMContentLoaded`.
 */
document.addEventListener('DOMContentLoaded', (event) => {
    /**
     * Pobranie referencji do elementów HTML.
     */
    const cookieContainer = document.querySelector('.cookie');
    const acceptButton = document.querySelector('.cookie__btn');

    /**
     * Funkcja do ukrywania komunikatu o plikach cookie.
     */
    const hideCookieBanner = () => {
        cookieContainer.style.display = 'none';
    };

    /**
     * Sprawdzenie, czy użytkownik już zaakceptował pliki cookie.
     */
    const cookieAccepted = localStorage.getItem('cookieAccepted');
    if (cookieAccepted) {
        hideCookieBanner();
    }

    /**
     * Dodanie obsługi zdarzenia kliknięcia do przycisku "Akceptuj".
     */
    acceptButton.addEventListener('click', () => {
        localStorage.setItem('cookieAccepted', 'true');
        hideCookieBanner();
    });
});

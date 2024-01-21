/**
 * Funkcja obsługuje zdarzenie DOMContentLoaded, które jest wywoływane, gdy całe drzewo DOM jest załadowane i gotowe do interakcji.
 * @param {Event} event - Obiekt zdarzenia DOMContentLoaded.
 */
document.addEventListener('DOMContentLoaded', (event) => {
    // Pobierz elementy HTML dotyczące komunikatu o plikach cookie
    const cookieContainer = document.querySelector('.cookie');
    const acceptButton = document.querySelector('.cookie__btn');

    /**
     * Funkcja do ukrywania komunikatu o plikach cookie.
     */
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

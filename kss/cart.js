// Funkcja do dodawania przedmiotów do koszyka
function addToCart(buttonElement) {
    const name = buttonElement.getAttribute('data-name');
    const price = parseFloat(buttonElement.getAttribute('data-price'));
    const image = buttonElement.getAttribute('data-image'); // Pobierz ścieżkę obrazu

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ name, price, image }); // Dodaj przedmiot do koszyka

    localStorage.setItem('cart', JSON.stringify(cart)); // Zaktualizuj koszyk w localStorage
    updateCartCount(); // Aktualizuj licznik koszyka
}

// Funkcja do wyświetlania przedmiotów w koszyku
function displayCart() {
    let cartItems = document.getElementById('cartItems');
    let totalPrice = 0;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartItems.innerHTML = ''; // Wyczyść istniejące przedmioty

    cart.forEach((item, index) => {
        let itemElement = document.createElement('div');
        itemElement.classList.add('item');
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" style="width:100px;"> 
            <span>${item.name} - $${item.price.toFixed(2)}</span>
            <button onclick="removeFromCart(${index})">Remove</button> 
        `;
        cartItems.appendChild(itemElement);

        totalPrice += item.price;
    });

    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty.</p>';
    }

    document.getElementById('totalPrice').innerText = `$${totalPrice.toFixed(2)}`;
    updateCartCount(); // Aktualizuj licznik koszyka również tutaj
}

// Funkcja do usuwania pojedynczego przedmiotu z koszyka
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1); // Usuń przedmiot z koszyka

    localStorage.setItem('cart', JSON.stringify(cart)); // Zaktualizuj koszyk w localStorage
    displayCart(); // Odśwież widok koszyka
    updateCartCount(); // Aktualizuj licznik koszyka
}

// Funkcja do aktualizacji licznika koszyka
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let count = cart.length; // Liczba przedmiotów w koszyku
    document.getElementById('cartCount').textContent = count; // Ustaw tekst licznika koszyka
}

function validateAndCheckout() {
    // Pobierz wartości z pól formularza
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const cardNumber = document.getElementById('cardNumber').value;
    const cardMM = document.getElementById('cardMM').value;
    const cardYYYY = document.getElementById('cardYYYY').value;
    const cardCVV = document.getElementById('cardCVV').value;

    // Prosta walidacja (można rozszerzyć o bardziej skomplikowane sprawdzenia)
    if (name && phone && address && cardNumber && cardMM && cardYYYY && cardCVV) {
        alert('Zakupy zrealizowane. Więcej informacji na mailu.');

        // Tutaj można dodać kod do obsługi płatności, wysyłania danych na serwer itp.

        // Oczyść koszyk
        localStorage.removeItem('cart');
        displayCart();
        updateCartCount();
    } else {
        alert('Proszę uzupełnić wszystkie dane.');
    }
}

// Wywołaj funkcje po załadowaniu DOM
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount(); // Aktualizacja licznika przy ładowaniu strony
    if (window.location.pathname.includes('cart.html')) {
        displayCart(); // Wyświetl przedmioty w koszyku jeśli jesteś na stronie koszyka
    }
});

/**
 * Pobranie elementów HTML do obsługi interakcji z użytkownikiem.
 */
let container = document.getElementById("container"),
    content = document.getElementById("content"),
    message = document.getElementById("message"),
    button = document.getElementById("button");

/**
 * Obsługuje kliknięcie przycisku i wyświetla komunikat.
 */
button.addEventListener("click", function () {
    let input_hour = document.getElementById("select-hour").value;
    let input_minutes = document.getElementById("input-minutes").value;

    message.innerHTML = `Chcę się spotkać o <b>${input_hour}:${input_minutes}</b> <br> (uzgodnione z kim trzeba) <br> zapraszam przed tą godziną <br> Dawid Olko:)`;
    content.style.display = "flex"; 
    content.style.justifyContent = "center";
    container.style.display = "none";

    setTimeout(function () {
        content.style.display = "none"; 
        container.style.display = "flex"; 
    }, 2000); 
});

/**
 * Pobranie elementów zegara.
 */
const hourElement = document.querySelector(".hour");
const minuteElement = document.querySelector(".minute");
const secondElement = document.querySelector(".second");
const timeElement = document.querySelector(".time");
const dateElement = document.querySelector(".date");
const toggle = document.querySelector(".toggle");

/**
 * Tablica dni tygodnia.
 * @type {string[]}
 */
const days = [
    "Niedziela",
    "Poniedziałek",
    "Wtorek",
    "Środa",
    "Czwartek",
    "Piątek",
    "Sobota",
];

/**
 * Tablica nazw miesięcy.
 * @type {string[]}
 */
const months = [
    "Sty",
    "Lut",
    "Mar",
    "Kwi",
    "Maj",
    "Cze",
    "Lip",
    "Sie",
    "Wrz",
    "Paz",
    "Lis",
    "Gru",
];

/**
 * Obsługuje przełączanie trybu jasnego/ciemnego.
 * @param {Event} e - Obiekt zdarzenia.
 */
toggle.addEventListener("click", (e) => {
    const html = document.querySelector("html");
    if (html.classList.contains("dark")) {
        html.classList.remove("dark");
        e.target.innerHTML = "Dark mode";
    } else {
        html.classList.add("dark");
        e.target.innerHTML = "Bright mode";
    }
});

/**
 * Skaluje wartość z określonego zakresu na inny zakres.
 * @param {number} num - Wartość do przeskalowania.
 * @param {number} in_min - Minimalna wartość wejściowa.
 * @param {number} in_max - Maksymalna wartość wejściowa.
 * @param {number} out_min - Minimalna wartość wyjściowa.
 * @param {number} out_max - Maksymalna wartość wyjściowa.
 * @returns {number} - Przeskalowana wartość.
 */
const scale = (num, in_min, in_max, out_min, out_max) => {
    return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};

/**
 * Aktualizuje wyświetlany czas na zegarze.
 */
const setTime = () => {
    const time = new Date();
    const date = time.getDate();
    const month = time.getMonth();
    const day = time.getDay();
    const hours = time.getHours();
    const hoursForClock = hours;
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    const ampm = "";

    hourElement.style.transform = `translate(-50%, -100%) rotate(${scale(
        hoursForClock,
        0,
        11,
        0,
        360
    )}deg)`;
    minuteElement.style.transform = `translate(-50%, -100%) rotate(${scale(
        minutes,
        0,
        59,
        0,
        360
    )}deg)`;
    secondElement.style.transform = `translate(-50%, -100%) rotate(${scale(
        seconds,
        0,
        59,
        0,
        360
    )}deg)`;

    timeElement.innerHTML = `${hoursForClock}:${minutes < 10 ? `0${minutes}` : minutes} ${ampm}`;
    dateElement.innerHTML = `${days[day]},  <span class="circle">${date}</span> ${months[month]} `;
};

setTime();

/**
 * Uaktualnia czas co sekundę.
 */
setInterval(setTime, 1000);

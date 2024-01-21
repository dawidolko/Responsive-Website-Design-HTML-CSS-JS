/**
 * Zmienna do przechowywania wyszukanego miasta.
 * @type {string}
 */
var city = "";

/**
 * Deklaracje zmiennych.
 * @type {HTMLElement}
 */
var searchCity = document.getElementById("search-city");
/**
 * @type {HTMLElement}
 */
var searchButton = document.getElementById("search-button");
/**
 * @type {HTMLElement}
 */
var clearButton = document.getElementById("clear-history");
/**
 * @type {HTMLElement}
 */
var currentCity = document.getElementById("current-city");
/**
 * @type {HTMLElement}
 */
var currentTemperature = document.getElementById("temperature");
/**
 * @type {HTMLElement}
 */
var currentHumidity = document.getElementById("humidity");
/**
 * @type {HTMLElement}
 */
var currentWSpeed = document.getElementById("wind-speed");
/**
 * @type {HTMLElement}
 */
var currentUvindex = document.getElementById("uv-index");

/**
 * Tablica przechowująca historię wyszukanych miast.
 * @type {string[]}
 */
var sCity = [];

/**
 * Funkcja sprawdza, czy miasto istnieje w historii.
 * @param {string} c - Miasto do sprawdzenia.
 * @returns {number} - Zwraca -1, jeśli miasto istnieje, w przeciwnym razie 1.
 */
function find(c) {
  for (var i = 0; i < sCity.length; i++) {
    if (c.toUpperCase() === sCity[i]) {
      return -1;
    }
  }
  return 1;
}

/**
 * Klucz API do serwisu pogodowego.
 * @type {string}
 */
var APIKey = "a0aca8a89948154a4182dcecc780b513";

/**
 * Wyświetla aktualną i przyszłą pogodę po wprowadzeniu miasta.
 * @param {Event} event - Obiekt zdarzenia.
 */
function displayWeather(event) {
  event.preventDefault();
  if (searchCity.value.trim() !== "") {
    city = searchCity.value.trim();
    currentWeather(city);
  }
}

/**
 * Funkcja do wywołania API pogodowego.
 * @param {string} city - Miasto, dla którego ma zostać pobrana pogoda.
 */
function currentWeather(city) {
  // Budowanie URL-a do pobrania danych z serwera
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&APPID=" +
    APIKey;

  // Wywołanie API za pomocą XMLHttpRequest
  var xhr = new XMLHttpRequest();
  xhr.open("GET", queryURL, true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);

      // Pobranie ikony pogody
      var weatherIcon = response.weather[0].icon;
      var iconURL = "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";

      // Pobranie daty
      var date = new Date(response.dt * 1000).toLocaleDateString();

      // Wyświetlenie danych
      currentCity.innerHTML = response.name + " (" + date + ") " + "<img src=" + iconURL + ">";
      var tempF = (response.main.temp - 273.15);
      currentTemperature.innerHTML = tempF.toFixed(2) + "&#8451";
      currentHumidity.innerHTML = response.main.humidity + "%";
      var ws = response.wind.speed;
      var windSmph = (ws * 2.237).toFixed(1);
      currentWSpeed.innerHTML = windSmph + "MPH";
      UVIndex(response.coord.lon, response.coord.lat);
      forecast(response.id);

      // Zapis miasta do historii
      sCity = JSON.parse(localStorage.getItem("cityname")) || [];
      if (find(city) > 0) {
        sCity.push(city.toUpperCase());
        localStorage.setItem("cityname", JSON.stringify(sCity));
        addToList(city);
      }
    } else {
      console.log("Błąd: " + xhr.status);
    }
  };
  xhr.send();
}

/**
 * Funkcja do pobrania UV Index.
 * @param {number} ln - Długość geograficzna.
 * @param {number} lt - Szerokość geograficzna.
 */
function UVIndex(ln, lt) {
  var uvqURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + lt + "&lon=" + ln;

  // Wywołanie API za pomocą XMLHttpRequest
  var xhr = new XMLHttpRequest();
  xhr.open("GET", uvqURL, true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      currentUvindex.innerHTML = response.value;
    } else {
      console.log("Błąd: " + xhr.status);
    }
  };
  xhr.send();
}

/**
 * Funkcja do wyświetlenia prognozy na 5 dni.
 * @param {number} cityid - Identyfikator miasta.
 */
function forecast(cityid) {
  var dayover = false;
  var queryForcastURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityid + "&appid=" + APIKey;

  // Wywołanie API za pomocą XMLHttpRequest
  var xhr = new XMLHttpRequest();
  xhr.open("GET", queryForcastURL, true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);

      for (var i = 0; i < 5; i++) {
        var date = new Date(response.list[((i + 1) * 8) - 1].dt * 1000).toLocaleDateString();
        var iconCode = response.list[((i + 1) * 8) - 1].weather[0].icon;
        var iconURL = "https://openweathermap.org/img/wn/" + iconCode + ".png";
        var tempK = response.list[((i + 1) * 8) - 1].main.temp;
        var tempF = ((tempK - 273.5)).toFixed(2);
        var humidity = response.list[((i + 1) * 8) - 1].main.humidity;

        document.getElementById("fDate" + i).innerHTML = date;
        document.getElementById("fImg" + i).innerHTML = "<img src=" + iconURL + ">";
        document.getElementById("fTemp" + i).innerHTML = tempF + "&#8451";
        document.getElementById("fHumidity" + i).innerHTML = humidity + "%";
      }
    } else {
      console.log("Błąd: " + xhr.status);
    }
  };
  xhr.send();
}

/**
 * Dodaje miasto do historii.
 * @param {string} c - Miasto do dodania.
 */
function addToList(c) {
  var listEl = document.createElement("li");
  listEl.textContent = c.toUpperCase();
  listEl.className = "list-group-item";
  listEl.dataset.value = c.toUpperCase();
  document.querySelector(".list-group").appendChild(listEl);
}

/**
 * Wywołuje wcześniejsze wyszukiwanie po kliknięciu na element historii.
 * @param {Event} event - Obiekt zdarzenia.
 */
function invokePastSearch(event) {
  var liEl = event.target;
  if (liEl.matches("li")) {
    city = liEl.textContent.trim();
    currentWeather(city);
  }
}

/**
 * Ładuje ostatnie miasto z historii.
 */
function loadLastCity() {
  document.querySelector("ul").innerHTML = "";
  var sCity = JSON.parse(localStorage.getItem("cityname"));
  if (sCity !== null) {
    for (var i = 0; i < sCity.length; i++) {
      addToList(sCity[i]);
    }
    city = sCity[i - 1];
    currentWeather(city);
  }
}

/**
 * Wyczyść historię wyszukiwania.
 * @param {Event} event - Obiekt zdarzenia.
 */
function clearHistory(event) {
  event.preventDefault();
  sCity = [];
  localStorage.removeItem("cityname");
  location.reload();
}

/**
 * Dodaje obsługę zdarzenia keydown na polu do wprowadzania miasta.
 */
searchCity.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    displayWeather(event);
  }
});

/**
 * Aktualizuje funkcję displayWeather, aby obsługiwała również wciśnięcie Enter.
 * @param {Event} event - Obiekt zdarzenia.
 */
function displayWeather(event) {
  if (event) {
    event.preventDefault();
  }
  if (searchCity.value.trim() !== "") {
    city = searchCity.value.trim();
    currentWeather(city);
  }
}

// Obsługa zdarzeń
searchButton.addEventListener("click", displayWeather);
document.addEventListener("click", invokePastSearch);
window.addEventListener("load", loadLastCity);
clearButton.addEventListener("click", clearHistory);

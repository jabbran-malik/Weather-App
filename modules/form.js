// modules/form.js
import { getWeather } from "./api.js";
import { convertTemp, renderWeather } from "./utils.js";

export function setupForm() {
    const form = document.getElementById("weather-form");
    const input = document.getElementById("cities");
    const weatherInfo = document.getElementById("weather-info");
    const unitSwitch = document.getElementById("unit-switch");

    let currentUnit = unitSwitch.checked ? 'F' : 'C'; // initial unit
    let lastCityData = null; // store last city data for toggle

    // Unit toggle event
    unitSwitch.addEventListener('change', () => {
        currentUnit = unitSwitch.checked ? 'F' : 'C';
        if (lastCityData) {
            renderWeather(lastCityData, currentUnit, weatherInfo);
        }
    });

    // Form submit event
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const city = input.value.trim();
        if (!city) {
            weatherInfo.innerHTML = "<p class='error'>Please enter a city name</p>";
            weatherInfo.classList.add("show");
            return;
        }

        weatherInfo.innerHTML = "<p class='loading'>Loading...</p>";
        weatherInfo.classList.add('show');

        try {
            const data = await getWeather(city);
            lastCityData = data; // store for toggle
            renderWeather(data, currentUnit, weatherInfo);
            localStorage.setItem('weatherApp_lastCity', city);
        } catch (error) {
            weatherInfo.innerHTML = `<p class='error'>${error.message}</p>`;
        }
    });
}

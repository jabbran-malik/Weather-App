import { getWeather } from "./api.js";
import { renderWeather } from "./utils.js";

const weatherInfo = document.getElementById('weather-info');
const unitSwitch = document.getElementById("unit-switch");

let currentUnit = unitSwitch.checked ? 'F' : 'C';

const lastCity = localStorage.getItem('weatherApp_lastCity');
const defaultCity = lastCity || 'Rawalpindi';

let defaultCityData = null; // store default city data for toggle

// Load default city
(async function () {
    try {
        const data = await getWeather(defaultCity);
        defaultCityData = data;
        renderWeather(data, currentUnit, weatherInfo);
    } catch (error) {
        weatherInfo.innerHTML = `<p class='error'>${error.message}</p>`;
    }
})();

unitSwitch.addEventListener('change', () => {
    currentUnit = unitSwitch.checked ? 'F' : 'C';
    if (defaultCityData) {
        renderWeather(defaultCityData, currentUnit, weatherInfo);
    }
});

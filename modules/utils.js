// Convert temperature between Celsius and Fahrenheit
export function convertTemp(tempC, unit) {
    if (unit === 'F') {
        return (tempC * 9/5 + 32).toFixed(1);
    }
    return tempC.toFixed(1);
}

// Render weather info in the popup
export function renderWeather(data, unit, weatherInfoElement) {
    const temp = convertTemp(data.main.temp, unit);
    const symbol = unit === 'C' ? '°C' : '°F';

    weatherInfoElement.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>Temperature: ${temp} ${symbol}</p>
        <p>Condition: ${data.weather[0].description}</p>
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather icon">
    `;
    weatherInfoElement.classList.add("show");
}

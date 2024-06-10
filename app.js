const apiKey = 'bb1e8c237edaf9a6fdd16a62ee7c878b';  

document.getElementById('city-input').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        getWeatherByCity();
    }
});

async function getWeatherByCity() {
    const city = document.getElementById('city-input').value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const date = new Date();
    document.getElementById('time').innerText = date;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(document.getElementById('error').innerHTML = 'City not found. reload page and search again.');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        document.getElementById('error').innerHTML = `<p>${error.message}</p>`;
        document.getElementById('hide-table').innerHTML = '';
        document.getElementById('table-2').innerHTML = '';

    }
   

}

async function getWeatherByLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

            const date = new Date();
            document.getElementById('time').innerText = date;

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Location not found');
                }
                const data = await response.json();
                displayWeather(data);

            } catch (error) {
                document.getElementById('error').innerHTML = `<p>${error.message}</p>`;
                document.getElementById('hide-table').innerHTML = '';
                document.getElementById('table-2').innerHTML = '';
            }
        }, (error) => {
            document.getElementById('error').innerHTML = `<p>Geolocation error: ${error.message}. reload page and search again.</p>`;
            document.getElementById('hide-table').innerHTML = '';
            document.getElementById('table-2').innerHTML = '';
        });
    } else {
        document.getElementById('error').innerHTML = `<p>Geolocation is not supported by this browser.</p>`;
        document.getElementById('hide-table').innerHTML = '';
        document.getElementById('table-2').innerHTML = '';
    }
}

function displayWeather(data) {


    const city = data.name;
    const weatherDescription = data.weather[0].description;
    const temperature = data.main.temp;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;

    const getTemp = data.main.temp;
    const getWindSpeed = data.wind.speed;
    const getFeelsLike = data.main.feels_like;
    const getTempMin = data.main.temp_min;
    const getTempMax = data.main.temp_max;
    const getPressure = data.main.pressure;
    const getHumidity = data.main.humidity;
    const getDescription = data.weather[0].description;

    // Update city name in the placeholders
    document.getElementById('city-name').innerHTML = capitalizeFirstWord(city);

    document.getElementById('temp').innerHTML = Math.round(getTemp);
    document.getElementById('col-temp').innerHTML = Math.round(getTemp);
    document.getElementById('feelsLike').innerHTML = Math.round(getFeelsLike);
    document.getElementById('tempMin').innerHTML = Math.round(getTempMin);
    document.getElementById('tempMax').innerHTML = Math.round(getTempMax);
    document.getElementById('pressure').innerHTML = getPressure;
    document.getElementById('humidity').innerHTML = Math.round(getHumidity);
    document.getElementById('description').innerHTML = capitalizeFirstWord(getDescription);
    document.getElementById('col-description').innerHTML = capitalizeFirstWord(getDescription);

    if (getDescription == 'haze') {
        document.getElementById('image').src = 'img/haze.png';
        document.getElementById('bg-image').style.backgroundImage = "url('img/hazy-img.png')";
    }
    else if (getDescription == 'clear sky') {
        document.getElementById('image').src = 'img/sun.png';
        document.getElementById('bg-image').style.backgroundImage = "url('img/clear-sky-img.jpg')";

    }
    else if (getDescription == 'moderate rain') {
        document.getElementById('image').src = 'img/downpour.png';
        document.getElementById('bg-image').style.backgroundImage = "url('img/overcast-clouds-img.jpg')";
    }
    else if (getDescription == 'few clouds') {
        document.getElementById('image').src = 'img/clouds.png';
        document.getElementById('bg-image').style.backgroundImage = "url('img/few-clouds-img.jpg')";

    }
    else if (getDescription == 'overcast clouds') {
        document.getElementById('image').src = 'img/clouds.png';
        document.getElementById('bg-image').style.backgroundImage = "url('img/overcast-clouds-img.jpg')";

    }
    else if (getDescription == 'light rain') {
        document.getElementById('image').src = 'img/drop.png';
        document.getElementById('bg-image').style.backgroundImage = "url('img/light-rain-img.png')";

    }
    else if (getDescription == 'mist') {
        document.getElementById('image').src = 'img/clouds.png';
        document.getElementById('bg-image').style.backgroundImage = "url('img/mist-img.jpg')";

    }
    else if (getDescription == 'stormy') {
        document.getElementById('image').src = 'img/thunder-bolt.png';
        document.getElementById('bg-image').style.backgroundImage = "url('img/stormy-img.png')";

    }
    else if (getDescription == 'rainy') {
        document.getElementById('image').src = 'img/drop.png';
        document.getElementById('bg-image').style.backgroundImage = "url('img/light-rain-img.png')";

    }
    else if (getDescription == 'windy') {
        document.getElementById('image').src = 'img/wind.png';
        document.getElementById('bg-image').style.backgroundImage = "url('img/windy-img.jpg')";

    }
    else if (getDescription == 'broken clouds') {
        document.getElementById('image').src = 'img/cloudy.png';
        document.getElementById('bg-image').style.backgroundImage = "url('img/broken-clouds-img.jpg')";

    }
    else if (getDescription == 'fog') {
        document.getElementById('image').src = 'img/cloudy.png';
        document.getElementById('bg-image').style.backgroundImage = "url('img/mist-img.jpg')";

    }
    else if (getDescription == 'sunny') {
        document.getElementById('image').src = 'img/sun.png';
        document.getElementById('bg-image').style.backgroundImage = "url('img/sunny-img.png')";

    }
    else if (getDescription == 'scattered clouds') {
        document.getElementById('image').src = 'img/cloudy.png';
        document.getElementById('bg-image').style.backgroundImage = "url('img/broken-clouds-img.jpg')";

    }

}

function capitalizeFirstWord(city) {
    // Convert the first letter of the text to uppercase.
    const firstLetter = city.charAt(0).toUpperCase();

    // Slice the rest of the text from the second character.
    const restOfText = city.slice(1);

    // Concatenate the uppercase first letter with the rest of the text.
    return firstLetter + restOfText;
}

const toggleDarkModeButton = document.getElementById('toggle-dark-mode');

toggleDarkModeButton.addEventListener('click', () => {
    const body = document.body;
    const dark = document.getElementById('bg-image');
    body.classList.toggle('dark-mode');
    dark.classList.toggle('dark-mode');
});

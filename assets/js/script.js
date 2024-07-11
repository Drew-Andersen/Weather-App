const apiKey = '8f49c9fb0f482a3ae81198fe62e5b25d';
const inputCity = $('#city-input');
const submitBtn = $('#submit-btn');
const currentWeatherDiv = $('#curent-weather');
const forcastWeatherDiv = $('#weather-forcast');
const historyDiv = $('#city-history');


function getCities() {
    const storedCities = JSON.parse(localStorage.getItem('cities'));
    if (storedCities !== null) {
        return storedCities;
    } else {
        const emptyCity = [];
        return emptyCity;
    }
}

function saveCities(cities) {
    const tempCities = getCities();
    tempCities.push(cities);
    localStorage.setItem('cities', JSON.stringify(tempCities));
}

function displayCities() {
    historyDiv.empty();
    const tempCities = getCities();
    tempCities.forEach((city, i) => {
        const cityCard = $('<div>');
        cityCard.addClass('city-card bg-secondary text-white text-center border border-light rounded');
        cityCard.attr('data-id', i);
        cityCard.text(city);
        historyDiv.append(cityCard);
    });
}

function getData() {
    let city = inputCity.val().trim();
    const apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;
    https://api.openweathermap.org/data/2.5/weather?q={city}&appid={apiKey}&

    fetch(apiURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            currentWeatherDiv.empty();
            renderCurrentWeather(city, data);
            saveCities(city);
            displayCities();
            renderForcastWeather(city,data);
        })
        .catch(function (error) {
            console.log(error);
        });
}

function renderCurrentWeather(city, weather) {
    const cityName = weather.city.name;
    const curDate = dayjs().format('M/D/YYYY');
    const temp = weather.list[0].main.temp;
    const wind = weather.list[0].wind.speed;
    const humid = weather.list[0].main.humidity;
    const icon = weather.list[0].weather[0].icon;
    const iconURL = `https://openweathermap.org/img/wn/${icon}.png`;

    const weatherDiv = $('<div>').addClass('card col-10 m-auto');
    const cityNameh4 = $('<h4>');
    const temph6 = $("<h6>");
    const windH6 = $('<h6>');
    const humidityH6 = $('<h6>');
    const iconImg = $('<img>');

    cityNameh4.text(cityName + ' (' + curDate + ')');
    temph6.text('Temp: ' + temp + '°F');
    windH6.text('Wind: ' + wind + 'mph');
    humidityH6.text('Humidity: ' + humid + '%');
    iconImg.attr('src', iconURL);

    cityNameh4.append(iconImg)
    weatherDiv.append(cityNameh4, temph6, windH6, humidityH6);
    currentWeatherDiv.append(weatherDiv);
}

//ToDo 
function renderForcastWeather (city,weather) {
    for (let i = 0; i <5; i++) {
        // Add a div to hold the card elements
        const forcastCard = $('<div>');
        forcastCard.addClass('card col-2');
        // Add a date for the card
        const forcastDate = $('<p>');
        forcastDate.text(dayjs().add(i + 1, 'day').format('M/D/YYYY'));
        // Create weather icon
        const weatherIcon = $('<img>');
        const icon = weather.list[i].weather[0].icon;
        weatherIcon.attr('src', `https://openweathermap.org/img/wn/${icon}@2x.png`);
        // Creat temp component
        const temp = weather.list[i].main.temp;
        const tempDiv = $('<p>');
        tempDiv.text('Temp: ' + temp + '°F');
        // Create wind component
        const wind = weather.list[i].wind.speed;
        const windDiv = $('<p>');
        windDiv.text('Wind: ' + wind + 'mph');
        // Add humidity component
        const humid = weather.list[i].main.humidity;
        const humidDiv = $('<p>');
        humidDiv.text('Humidity: ' + humid + '%');

        // Append them to the page
        forcastCard.append(forcastDate, weatherIcon, tempDiv, windDiv, humidDiv);
        forcastWeatherDiv.append(forcastCard);
    }
}

function handleSearchHistory() {
    cityID = $(this).attr('data-id');
    let savedCities = getCities();
    currentWeatherDiv.empty();
    // forcastWeatherDiv.empty();
    renderCurrentWeather(savedCities[cityID]);
    // renderForcastWeather(savedCities[cityID]);
}

submitBtn.on('click', getData);
historyDiv.on('click', '.city-card', handleSearchHistory);

window.onload = displayCities;





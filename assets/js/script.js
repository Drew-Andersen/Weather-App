// Bug not letting the history buttons work
    // Cannot read properties of 'city' line 64:30.

const apiKey = '8f49c9fb0f482a3ae81198fe62e5b25d';
const inputCity = $('#city-input');
const submitBtn = $('#submit-btn');
const currentWeatherDiv = $('#curent-weather');
const forcastWeatherDiv = $('#weather-forcast');
const historyDiv = $('#city-history');

// Check if there are cities stored in localStorage, if not create a new empty array
function getCities() {
    const storedCities = JSON.parse(localStorage.getItem('cities'));
    if (storedCities !== null) {
        return storedCities;
    } else {
        const emptyCity = [];
        return emptyCity;
    }
}

// Save the searched cities to localStorage
function saveCities(cities) {
    const tempCities = getCities();
    tempCities.push(cities);
    localStorage.setItem('cities', JSON.stringify(tempCities));
}

function displayCities() {
    historyDiv.empty();
    const tempCities = getCities();
    // Loop through localStoage and create a <button> for each stored city
    tempCities.forEach((city, i) => {
        const cityCard = $('<button>'); 
        cityCard.addClass('city-card bg-secondary text-white text-center border border-light rounded col-12 mb-1');
        cityCard.attr('data-id', i);
        // Text of the <button> is set to the city name
        cityCard.text(city);
        historyDiv.append(cityCard);
    });
}

function getData() {
    let city = inputCity.val().trim();
    const apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;

    fetch(apiURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // Empty the divs
            currentWeatherDiv.empty();
            forcastWeatherDiv.empty();
            // Run the functions with the data
            displayCities();
            saveCities(city);
            renderCurrentWeather(city, data) 
            renderForcastWeather(city,data);
        })
        .catch(function (error) {
            console.log(error);
        });
}

function renderCurrentWeather(city, weather) {
    // console.log(weather);
    // Created variables 
    const cityName = weather.city.name;
    const curDate = dayjs().format('M/D/YYYY');
    const temp = weather.list[0].main.temp;
    const wind = weather.list[0].wind.speed;
    const humid = weather.list[0].main.humidity;
    const icon = weather.list[0].weather[0].icon;
    const iconURL = `https://openweathermap.org/img/wn/${icon}.png`;

    // Created elements to hold the variables
    const weatherDiv = $('<div>').addClass('card col-10 m-auto');
    const cityNameh4 = $('<h4>');
    const temph6 = $("<h6>");
    const windH6 = $('<h6>');
    const humidityH6 = $('<h6>');
    const iconImg = $('<img>');

    // Added text to the variables
    cityNameh4.text(cityName + ' (' + curDate + ')');
    temph6.text('Temp: ' + temp + '°F');
    windH6.text('Wind: ' + wind + 'mph');
    humidityH6.text('Humidity: ' + humid + '%');
    iconImg.attr('src', iconURL);

    // Appended the elements to the page
    cityNameh4.append(iconImg)
    weatherDiv.append(cityNameh4, temph6, windH6, humidityH6);
    currentWeatherDiv.append(weatherDiv);
}

function renderForcastWeather (city,weather) {
    let dayOffset = 0;
    for (let i = 0; i <5; i++) {
        // Add a div to hold the card elements
        const forcastCard = $('<div>');
        forcastCard.addClass('card col-2');
        // Add a date for the card
        const forcastDate = $('<p>');
        forcastDate.text(dayjs().add(i + 1, 'day').format('M/D/YYYY'));
        // Create weather icon
        const weatherIcon = $('<img>');
        const icon = weather.list[dayOffset].weather[0].icon;
        weatherIcon.attr('src', `https://openweathermap.org/img/wn/${icon}@2x.png`);
        // Creat temp component
        const temp = weather.list[dayOffset].main.temp;
        const tempDiv = $('<p>');
        tempDiv.text('Temp: ' + temp + '°F');
        // Create wind component
        const wind = weather.list[dayOffset].wind.speed;
        const windDiv = $('<p>');
        windDiv.text('Wind: ' + wind + 'mph');
        // Add humidity component
        const humid = weather.list[dayOffset].main.humidity;
        const humidDiv = $('<p>');
        humidDiv.text('Humidity: ' + humid + '%');

        // Checks to make sure that it is per day not every 3 hours
        dayOffset = dayOffset + 8;

        // Append them to the page
        forcastCard.append(forcastDate, weatherIcon, tempDiv, windDiv, humidDiv);
        forcastWeatherDiv.append(forcastCard);
    }
}

function handleSearchHistory() {
    // Targets the history buttons (attribute = data-id)
    cityID = $(this).attr('data-id');
    // Pull the cities from localStorage
    let savedCities = getCities();
    // Empty the current weather and forcast divs
    currentWeatherDiv.empty();
    forcastWeatherDiv.empty();
    // Run the functions with the stored cities
    renderCurrentWeather(savedCities[cityID]);
    renderForcastWeather(savedCities[cityID]);
}

// Event listeners
submitBtn.on('click', getData);
historyDiv.on('click', '.city-card', handleSearchHistory);

window.onload = displayCities;





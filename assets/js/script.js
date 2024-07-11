const apiKey = '8f49c9fb0f482a3ae81198fe62e5b25d';
const inputCity = $('#city-input');
const submitBtn = $('#submit-btn');
const storedCities = JSON.parse(localStorage.getItem('cities')) || [];

function getData() {
    let city = inputCity.val().trim();
    const apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(apiURL)
    .then(function (response) {
      return response.json();
      storedInHistory();
    })
    .then(function (data) {
      console.log(data);
      renderCurrentWeather(city,data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function renderCurrentWeather (city,weather) {
    const currentWeatherDiv = $('#curent-weather');
    const temp = weather.list[0].main.temp;
    const wind = weather.list[0].wind.speed;
    const humid = weather.list[0].main.humidity;
    const icon = weather.list[0].weather[0].icon;
    const iconURL = `https://openweathermap.org/img/wn/${icon}.png`;

    const temph6 = $("<h6>");
    const windH6 = $('<h6>');
    const humidityH6 = $('<h6>');
    const iconImg = $('<img>');

    temph6.text(temp);
    windH6.text(wind);
    humidityH6.text(humid);
    iconImg.attr('src', iconURL);

    currentWeatherDiv.append(iconImg, temph6, windH6, humidityH6);
    // get other const to append
}

//ToDo
function renderForcastWeather (city,weather) {
    // similar to the renderCurrentWeather
    console.log('forcast funciton');
}
    
// not working
function storeInHistory (city) {
    storedCities.push(city);
    localStorage.setItem('cities', JSON.stringify(storedCities));
}

function createHistoryBtn () {
    storedCities.forEach(city => {
        const historyBtn = $('<button>');
        historyBtn.addClass('btn text-white-50');
        historyBtn.text(city[i]);
    });
}

submitBtn.on('click', getData);
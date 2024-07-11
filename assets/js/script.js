const apiKey = '8f49c9fb0f482a3ae81198fe62e5b25d';
const inputCity = $('#city-input');
const submitBtn = $('#submit-btn');
const currentWeatherDiv = $('#curent-weather');
const historyDiv = $('#city-history');
const storedCities = JSON.parse(localStorage.getItem('cities')) || [];

function getData() {
    let city = inputCity.val().trim();
    const apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;

    fetch(apiURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      renderCurrentWeather(city,data);
    //   renderForcastWeather(city,data);
      storedInHistory(city);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function renderCurrentWeather (city,weather) {
    const cityName = weather.city.name;
    const curDate = dayjs().format('M/D/YYYY');
    const temp = weather.list[0].main.temp;
    const wind = weather.list[0].wind.speed;
    const humid = weather.list[0].main.humidity;
    const icon = weather.list[0].weather[0].icon;
    const iconURL = `https://openweathermap.org/img/wn/${icon}.png`;

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
    currentWeatherDiv.append(cityNameh4, temph6, windH6, humidityH6);
}

//ToDo 
// function renderForcastWeather (city,weather) {
//     // similar to the renderCurrentWeather
//     console.log('forcast funciton'); // Is working
// }
    
function storedInHistory (city) {
    storedCities.push(city);
    localStorage.setItem('cities', JSON.stringify(storedCities));
}

function createHistoryBtn () {
    const historyCities = JSON.parse(localStorage.getItem('cities'));

    for (i = 0; i < historyCities.length; i++) {
        const historyBtn = $('<button>');
        historyBtn.addClass('btn history-btn text-white-50');
        historyBtn.text(historyCities[i]);
        historyDiv.append(historyBtn);
        console.log(historyCities);
    };
}

// function handleSearchHistory () {

// }

submitBtn.on('click', getData);
// historyDiv.on('click', handleSearchHistory);





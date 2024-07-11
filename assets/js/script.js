const apiKey = '8f49c9fb0f482a3ae81198fe62e5b25d';
const inputCity = $('#city-input');
const submitBtn = $('#submit-btn');

function getData() {
    let city = inputCity.val().trim();
    const apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(apiURL)
    .then(function (response) {
      return response.json()
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
    const temp = weather.list[0].main.temp;
    const wind = weather.list[0].wind.speed;
    const humidity = weather.list[0].main.humidity;
    const icon = weather.list[0].weather[0].icon;
    const iconURL = `https://openweathermap.org/img/wn/${icon}.png`;
}

submitBtn.on('click', getData);
// JavaScript File

$(function(){
    $('#btnGetWeather').click(function () {
        getWeatherByCity('en', dataReceived, showError, $('#inputCityName').val());
    });
    
    getWeatherData('en', dataReceived, showError);
    

    function dataReceived(data) {
        var offset = (new Date()).getTimezoneOffset()*60*1000; // Відхилення від UTC  в мілісекундах
        var city = data.city.name;
        var country = data.city.country;
       
        $("#weatherTable tr:not(:first)").remove();

        $.each(data.list, function(){
            // "this" тримає об'єкт прогнозу звідси: http://openweathermap.org/forecast16
            var localTime = new Date(this.dt*1000 - offset); // конвертуємо час з UTC у локальний
            addWeather(
                this.weather[0].icon,
                moment(localTime).calendar(),	// Використовуємо moment.js для представлення дати
                this.weather[0].description,
                Math.round(this.temp.day) + '&deg;C',
                this.humidity + '%',
                Math.round(this.speed) + 'm/s'
            );
        });
      
         $.each(data.list, function(){
            // "this" тримає об'єкт прогнозу звідси: http://openweathermap.org/forecast16
            var localTime = new Date(this.dt*1000 - offset); // конвертуємо час з UTC у локальний
            addWeather4days(
                this.weather[0].icon,
                moment(localTime).calendar(),	// Використовуємо moment.js для представлення дати
                this.weather[0].description,
                Math.round(this.temp.day) + '&deg;C'
            );
        });
        
        
        $('#location').html(city + ', <b>' + country + '</b>' + days); // Додаємо локацію на сторінку
    }
    
     function addWeather(icon, day, condition, temp, humidity, speed){
        var markup =  '<div class="day-today"><p><span>' + day +'</span></p></div>' +
            '<div class="icon-today"><p><span>' + '<img src="images/icons/'+ 
                  ( (icon === '10ddd')? '10d' : icon) // Fix in case if server returns unknown icon 10ddd 
                  + '.png" />' + '</span></p></div>' +
            '<div class="temp-today"><p><span>' + temp + '</span></p></div>' +
            '<div class="cond-today"><p><span>' + condition + '</span></span></p></div>' +
            '<div class="wind-today"><p>Wind: <span>' + speed  + '</span></p></div>' +
            '<div class="hum-today"><p>Humidity: <span>' + humidity + '</span></p></div>';
        today.innerHTML = markup; 
    }
    

  function addWeather4days(icon, day, condition, temp){
        var markup = '<div class="day"> <p><span>' + day + '</span></p></div>' +
                '<div class="temp"> <p><span>' + temp + '</span></p></div>' +
                '<div class="icon"> <p><span>' + '<img src="images/icons/'+ 
                  ( (icon === '10ddd')? '10d' : icon) // Fix in case if server returns unknown icon 10ddd 
                  + '.png" />' + '</span></p></div>' +
                '<div class="cond"> <p><span>' + condition + '</span></span></p></div>';
         day1.innerHTML = markup; 
    }


    function showError(msg){
        $('#error').html('Сталася помилка: ' + msg);
    }
});
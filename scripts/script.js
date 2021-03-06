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
        $('#location').html(city + ', <b>' + country + '</b>'); // Додаємо локацію на сторінку

       /*  Weather for today */
        var localTime = new Date(data.list[0].dt*1000 - offset); // конвертуємо час з UTC у локальний
        $('#today-day').html(moment(localTime).format("DD MMM YY"));
        $('#today-icon').html('<img src="images/icons/'+ ( (data.list[0].weather[0].icon === '10ddd')? 'na' : data.list[0].weather[0].icon) + '.png" />');
        $('#today-tempd').html(Math.round(data.list[0].temp.day) + '&deg;C');
        $('#today-tempn').html(Math.round(data.list[0].temp.night) + '&deg;C');
        $('#today-cond').html(data.list[0].weather[0].description);
        $('#today-wind').html(Math.round(data.list[0].speed) + 'm/s');
        $('#today-hum').html(data.list[0].humidity + '%');
        background_img (data.list[0].weather[0].icon); 
         
        /*  Weather for next 4 days */  
         $('#forecast').empty();
        for (var i = 1; i < 5; i++) {
            var localTime = new Date(data.list[i].dt*1000 - offset); // конвертуємо час з UTC у локальний
            addWeather4days(
                data.list[i].weather[0].icon,
                moment(localTime).format("DD MMM YY"),	// Використовуємо moment.js для представлення дати
                data.list[i].weather[0].description,
                Math.round(data.list[i].temp.day) + '&deg;C',
                Math.round(data.list[i].temp.night) + '&deg;C'
            );
        };
    }

    function addWeather4days(icon, day, condition, tempd, tempn){
        var markup = '<div id="day">' +
        '<div class="day"> <p><span>' + day + '</span></p></div>' +
                '<div class="tempd"> <p><span>' + tempd + '</span></p></div>' +
                '<div class="tempn"> <p><span>' + tempn + '</span></p></div>' +
                '<div class="icon"> <p><span>' + '<img src="images/icons/'+ 
                  ( (icon === '10ddd')? 'na' : icon) // Fix in case if server returns unknown icon 10ddd 
                  + '.png" />' + '</span></p></div>' +
                '<div class="cond"> <p><span>' + condition + '</span></span></p></div>' +
                '</div>';
         $('#forecast').append(markup); 
    }
    
    function background_img(icon) {
        if (icon === '09d' || icon === '10d' || icon === '11d' || icon === '09n' || icon === '10n' || icon === '11n') { 
            $('#body').removeClass().addClass('rain');
            return; 
        } else  if (icon === '01d' || icon === '01n' || icon === '10ddd' || icon === 'na') {
                    $('#body').removeClass().addClass('sun');
                    return; 
                } else  if (icon === '02d' || icon === '03d' || icon === '04d' || icon === '02n' || icon === '03n' || icon === '04n' || icon === '50d' || icon === '50n') {
                            $('#body').removeClass().addClass('cloud');
                            return;
                        } else  if (icon === '13d' || icon === '13n') {
                                    $('#body').removeClass().addClass('frost');
                                    return;
                                };
    }

    function showError(msg){
        $('#error').html('Сталася помилка: ' + msg);
    }
});
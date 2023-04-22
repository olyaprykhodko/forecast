const param = {
    'url' : "https://api.openweathermap.org/data/2.5/",
    'appid' : '624121dc12d6f0a23229247d53cb8b8c'
}

function getWeather() {
    const cityId = document.querySelector('select').value;
    fetch(`${param.url}weather?id=${cityId}&units=metric&APPID=${param.appid}`)
    .then(weather => {
        return weather.json() })
    .then(data => {
        document.querySelector('.name').innerHTML = '';
        document.querySelector('.temp').innerHTML = '';
        document.querySelector('.icon').innerHTML = '';
        document.querySelector('.wind').innerHTML = '';
        document.querySelector('.humidity').innerHTML = '';
        document.querySelector('.pressure').innerHTML = '';
    
        showWeather(data);
    
    })
}

let select = document.createElement('select');
document.querySelector('.sel').appendChild(select);
select.classList.add('sel-style');

let option1 = new Option('Kyiv', '703448');
select.append(option1);

let option2 = new Option('Odesa', '698740');
select.append(option2);

let option3 = new Option('Kharkiv', '706483');
select.append(option3);

let option4 = new Option('Luhansk', '702658');
select.append(option4);

let option5 = new Option('Lviv', '702550');
select.append(option5);


function capsLetter(str) {
    return str[0].toUpperCase() + str.slice(1);
 }



function windDeg(num) {
    let str = '';
    if (num >= 0 && num < 45) {
        str += 'N' + '↓';
    } else if (num >= 45 && num < 90) {
        str += 'N/E' + '↙';
    } else if (num >= 90 && num < 135) {
        str += 'E' + '←';
    } else if (num >= 135 && num < 180) {
        str += 'S/E' + '↖';
    } else if (num >= 180 && num < 225) {
        str += 'S' + '↑';
    } else if (num >= 225 && num < 270) {
        str += 'S/W' + '↗';
    } else if (num >= 270 && num < 315) {
        str += 'W' + '→';
    } else if (num >= 315 && num < 337) {
        str += 'N/W' + '↘'
    } else if (num >= 337 && num <= 360)
        str += 'N' + '↓';
    return str;
}



function showWeather(data) {
    document.querySelector('.name').textContent = `${data.name}, Ukraine`;
    document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '&deg;';
    document.querySelector('.icon').innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png"> ${capsLetter(data.weather[0]['description'])}`;
    document.querySelector('.wind').innerHTML = `Wind: ${(data.wind.speed).toFixed(1)} m/s,  ${windDeg(data.wind.deg)}`;
    document.querySelector('.humidity').innerHTML = `Humidity: ${data.main.humidity}%`
    document.querySelector('.pressure').innerHTML = `Pressure: ${data.main.pressure} hPa`;
}

getWeather();
document.querySelector('select').onchange = getWeather;



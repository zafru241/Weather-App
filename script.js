let appId ="ceedb37f871be8f4a89e357323023cb2";
let units = "imperial";
let searchMethod;

function getsearchMethod(searchTerm){
    if(searchTerm.length === 5 && Number.parseInt(searchTerm) +'' === searchTerm )
        searchMethod ='zip';
    else{
        searchMethod = 'q';
    }    
}

function searchWeather(searchTerm){
    getsearchMethod(searchTerm);
    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`).then(result =>{
        return result.json();
    }).then(result =>{
        inIt(result);
    })
}


function inIt(resultfromServer){
    switch (resultfromServer.weather[0].main) {
        case 'Clear':
            document.body.style.backgroundImage ='url("images/clear.jpg")';
            break;

        case 'Clouds':
            document.body.style.backgroundImage ='url("images/cloudy.jpg")';
            break;

        case 'Rain':
        case 'Drizzle':
        case  'Mist':
            document.body.style.backgroundImage ='url("images/rainy.jpg")';
            break;
            
        case 'Thunderstrom':
            document.body.style.backgroundImage ='url("images/strom.jpg")';
            break;
        case 'Snow':
            document.body.style.backgroundImage ='url("images/snow.jpg")';
            break;    
    
        default:
            break;
    }
    let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
    let temperatureElement = document.getElementById('temperature');
    let humidityElement = document.getElementById('humidity');
    let windSpeedElement = document.getElementById('windSpeed');
    let cityHeader = document.getElementById('cityHeader');
    let weatherIcon = document.getElementById('documentIconImg');

    weatherIcon.src ="http://openweathermap.org/img/wn/" + resultfromServer.weather[0].Icon+ '04d.png';

    let resultDescription = resultfromServer.weather[0].description;
    weatherDescriptionHeader.innerText = resultDescription.charAt().toUpperCase() + resultDescription.slice(1);

    
    temperatureElement.innerHTML = Math.floor(resultfromServer.weather[0].main.temperature) +"&#176";
    windSpeedElement.innerHTML = 'Winds at '+ Math.floor(resultfromServer.weather[0].windSpeed) +"m/s";
    cityHeader.innerHTML = resultfromServer.name;
    humidityElement.innerHTML = "Humidity level at  " + resultfromServer.main.humidity + "%"; 

    setPositionforweatherinfo();
}

    


    

function setPositionforweatherinfo(){
    let weatherContainer = document.getElementById('weatherContainer');
    let weatherContainerHeight = weatherContainer.clientHeight; 
    let weatherContainerWidth = weatherContainer.clientWidth;

    weatherContainer.style.left = "calc(50% - ${weatherContainerWidth/2}px)";
    weatherContainer.style.top = "calc(50% - ${weatherContainerHeight/1.3}px)";
    weatherContainer.style.visibility = "visible";
}

document.getElementById("searchBtn").addEventListener("click", () =>{
    let searchTerm = document.getElementById("searchInput").value;
    if(searchTerm)
     searchWeather(searchTerm);
}) 
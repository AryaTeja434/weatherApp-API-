

const apikey="5299b3332d72f16ec5e7a4b92a5fbf2c";

const cityInput=document.getElementById("city");
const card=document.querySelector(".card");
const weatherform=document.querySelector(".weatherform");

weatherform.addEventListener("submit",async event=>{
    event.preventDefault();
    const city=cityInput.value;


    if(city){
        try{
            const weatherData= await getWeatherData(city);
            displayWeatherData(weatherData);
        }
        catch(error){
            console.error(error);
            displayError("Ouch! Place not found! Try with a nearby city/town. ")
        }
    }
    else{
        displayError("Please enter a City Name");
    }
})

async function getWeatherData(city){

    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city},IN&appid=5299b3332d72f16ec5e7a4b92a5fbf2c`

    const response=await fetch(url);

    if (!response.ok){
        throw new Error("Could not fetch!");
    }

    return await response.json();
}

function displayWeatherData(data){
    console.log(data);
    const {name: city, main:{temp,humidity},weather:[{description,id}]}=data;

    card.textContent="";
    card.style.display="flex";

    const cityDisplay=document.createElement("h3");
    const tempDisplay=document.createElement("p");
    const humidityDisplay=document.createElement("p");
    const descDisplay=document.createElement("p");
    const weatherEmoji=document.createElement("p");

    cityDisplay.textContent=city;
    tempDisplay.textContent=`${(temp-273.15).toFixed(2)}°C`;
    humidityDisplay.textContent=`Humidity: ${humidity}%`;
    descDisplay.textContent=description;
    weatherEmoji.textContent=getWeatherEmoji(id);
    



    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("HumidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");

    

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
}

function getWeatherEmoji(id){
    switch(true){
        case (id>=200 && id<300):
            return "⛈️";
        case (id>=300 && id<400):
            return "🌧️";
        case (id>=400 && id<500):
            return "🌧️";
        case (id>=500 && id<600):
            return "🌧️";
        case (id>=600 && id<700):
            return "☃️";
        case (id>=700 && id<800):
            return "🌫️";
        case (id===800):
            return "☀️";
        case (id>=801 && id<810):
            return "🌨️"; 
        default:
            return "😭";
    }
}

function displayError(msg){
    const message=document.createElement("p")
    message.textContent=msg;
    message.classList.add("errorDisplay");
    card.textContent="";
    card.style.display="Flex";
    card.appendChild(message)
}


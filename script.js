let weather = {
    apiKey: "c8d17c612e6a86a75679d888d35af99d",
    fetchWeather: function(city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q="
        + city 
        +"&units=metric&appid=" 
        + this.apiKey)

        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },

    displayWeather: function(data) {
        // Get all data from the JSON file that is needed ps "you can get more keys if you want"
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        const {country} = data.sys;

        document.querySelector(".country-name").innerText = "Country: " + country;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = 
        "http://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = Math.trunc(temp) + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + "km/h";
        //this search for an image on unsplash equal to the name input you type in the search bar
        document.body.style.backgroundImage = "url('https://source.unsplash.com/random/?" + name + "')";
        
    },
    // this search function returns the value that is put in the search bar and compares it to the Json file 
    search: function() {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }

};

document.querySelector(".search button").addEventListener("click", function(){
    weather.search();
});

// This eventlistener is for pressing Enter instead of clicking on the search button
document.querySelector(".search-bar").addEventListener("keyup", function(event){
    if (event.key == "Enter") {
        weather.search();
    }
})

weather.fetchWeather("Beirut");
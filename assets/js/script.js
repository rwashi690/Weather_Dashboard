// Define necessary variables to target variables 
submitBtn = document.getElementById('weatherSubmit');
searchInput = document.getElementById('weatherInput');
currentWeatherEl = document.getElementById('currentWeather');
fiveDayWeatherEl =document.getElementById('5dayWeather');
pastSearches =document.getElementById('searchList');
// Target elements for current weather
tempEl = document.getElementById('temp');
windEl = document.getElementById('wind');
humidEl	= document.getElementById('humid');
uvEl = document.getElementById('uv');
cityNameEl = document.getElementById('cityName');


// Creating a function to execute search
function search(cityInput){
	// let cityTag = document.createElement("h3");
	// cityTag.textContent = cityInput;
	// // cityTag.className = 
	// currentWeatherEl.appendChild(cityTag);
	cityNameEl.textContent =cityInput
	getCityCurrent(cityInput)
}

// Create an event listener to execute search function
submitBtn.addEventListener("click", function(event){
	event.preventDefault();
	let citySearched = searchInput.value;
	search(citySearched);

})

// Creating a fetch request to determine the weather at a specific lattitude and longitude
function weatherRequestCurrent(latitude, longitude) {
	fetch("https://api.openweathermap.org/data/2.5/onecall?lat="+latitude+"&lon="+longitude+"&units=imperial&exclude=minutely,hourly&appid=00e50f3e30c93092b592e69d5a4564df", {
		"method": "GET"
		}
	)
		.then(response => {
			return response.json();
		})
		.then(data => {
			// console.log(data.current);
			let currentData=[]
			let temperature =data.current.temp
			let wind=data.current.wind_speed
			let humidity=data.current.humidity
			let uv=data.current.uvi
			currentData.push(temperature, wind, humidity, uv)
			console.log(currentData)
			tempEl.textContent="Temperature(°F): "+currentData[0]
			windEl.textContent="Wind (mi/hr): "+currentData[1];
			humidEl.textContent="Humidity(%): "+currentData[2];
			uvEl.textContent="UV Index: "+currentData[3];

		})
		.catch(err => {
			console.error(err);
		});
}

// Creating a fetch request to obtain the weather from the listed city
function getCityCurrent(cityRequested){
	fetch("http://api.openweathermap.org/geo/1.0/direct?q="+cityRequested+"&limit=1&appid=00e50f3e30c93092b592e69d5a4564df", {
		"method": "GET"
		}
	)
		.then(response => {
			return response.json();
		})
		.then(data => {
			// console.log(data);
            let {lat,lon} = data[0];
			// console.log(weatherRequest(lat,lon))
			weatherRequestCurrent(lat,lon)
		})
		.catch(err => {
			console.error(err);
		});    
}

// console.log(getCity('Dallas'))
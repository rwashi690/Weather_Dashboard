// Define necessary variables to target variables 
submitBtn = document.getElementById('weatherSubmit');
searchInput = document.getElementById('weatherInput');
currentWeatherEl = document.getElementById('currentWeather');
fiveDayWeatherEl =document.getElementById('5dayWeather');
pastSearches =document.getElementById('searchList');

// Creating a fetch request to determine the weather at a specific lattitude and longitude
function weatherRequest(latitude, longitude) {
	fetch("https://api.openweathermap.org/data/2.5/onecall?lat="+latitude+"&lon="+longitude+"&exclude=minutely,hourly&appid=00e50f3e30c93092b592e69d5a4564df", {
		"method": "GET"
		}
	)
		.then(response => {
			return response.json();
		})
		.then(data => {
			console.log(data);
		})
		.catch(err => {
			console.error(err);
		});
}

// Creating a fetch request to obtain the weather from the listed city
function getCity (cityRequested){
	fetch("http://api.openweathermap.org/geo/1.0/direct?q="+cityRequested+"&limit=1&appid=00e50f3e30c93092b592e69d5a4564df", {
		"method": "GET"
		}
	)
		.then(response => {
			return response.json();
		})
		.then(data => {
			console.log(data);
            let {lat,lon} = data[0];
			weatherRequest(lat,lon)
		})
		.catch(err => {
			console.error(err);
		});    
}

console.log(getCity('Dallas'))
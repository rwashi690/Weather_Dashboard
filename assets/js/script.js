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
currentIconEl = document.getEle

//With moment define today, and 5 days from today
const today = moment().format('MMMM Do YYYY')
const days = []
for (let x=0; x<6; x++){
	days.push(moment().add(x, 'days').format('MMMM Do YYYY'));
	// this["day"+x] = moment().add(x-1, 'days')
}



// Creating a function to execute search
function search(cityInput){
	// Target the h3 element in the current weather div element and display the city name
	cityNameEl.textContent =cityInput
	// Execute the search
	getCityCurrent(cityInput)
}

// Create an event listener to execute search function
submitBtn.addEventListener("click", function(event){
	event.preventDefault();
	let citySearched = searchInput.value;
	search(citySearched);
})

// // FOR THE CURRENT WEATHER PANEL DEFINE DEFAULT CITY OF ATL, GA
// // Creating a fetch request to determine the weather at a specific lattitude and longitude
// function weatherRequestCurrentDefault(latitude, longitude) {
// 	fetch("https://api.openweathermap.org/data/2.5/onecall?lat="+latitude+"&lon="+longitude+"&units=imperial&exclude=minutely,hourly&appid=00e50f3e30c93092b592e69d5a4564df", {
// 		"method": "GET"
// 		}
// 	)
// 		.then(response => {
// 			return response.json();
// 		})
// 		.then(data => {
// 			console.log(currentData)
// 			// Retrieve the temperature, wind, humidity, and uv index and input them into an array
// 			let currentData=[]
// 			let temperature =data.current.temp
// 			let wind=data.current.wind_speed
// 			let humidity=data.current.humidity
// 			let uv=data.current.uvi
// 			currentData.push(temperature, wind, humidity, uv)
// 			// Dynamically add those elements to the HTML page
// 			tempEl.textContent="Temperature(°F): "+currentData[0]
// 			windEl.textContent="Wind (mi/hr): "+currentData[1];
// 			humidEl.textContent="Humidity(%): "+currentData[2];
// 			uvEl.textContent="UV Index: "+currentData[3];

// 		})
// 		.catch(err => {
// 			console.error(err);
// 		});
// }
// // Creating a fetch request to obtain the weather from the listed city
// function getCityCurrentDefault(cityRequested){
// 	fetch("http://api.openweathermap.org/geo/1.0/direct?q="+cityRequested+"&limit=1&appid=00e50f3e30c93092b592e69d5a4564df", {
// 		"method": "GET"
// 		}
// 	)
// 		.then(response => {
// 			return response.json();
// 		})
// 		.then(data => {
//             let {lat,lon} = data[0];
// 			weatherRequestCurrent(lat,lon)
// 		})
// 		.catch(err => {
// 			console.error(err);
// 		});    
// }


// DISPLAY CURRENT CITY ONCE SEARCH IS EXECUTED
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
			console.log(data)
			// Retrieve the temperature, wind, humidity, and uv index and input them into an array for current day
			let currentData=[]
			let temperature =data.current.temp
			let wind=data.current.wind_speed
			let humidity=data.current.humidity
			let uv=data.current.uvi
			currentData.push(temperature, wind, humidity, uv)
			// Dynamically add those elements to the HTML page
			tempEl.textContent="Temperature: "+currentData[0]+"°F";
			windEl.textContent="Wind: "+currentData[1]+" miles/hour";
			humidEl.textContent="Humidity: "+currentData[2]+"%";
			uvEl.textContent="UV Index: "+currentData[3];
			// Define 5 day data
			const {daily} = data
			// Obtain data for the next 8 days and loop through only 5
			for (let i=1; i<6; i++){
				daily[i]
				const cardEl = document.createElement("div")
				cardEl.classList.add("card")
				const cardHeaderEl = document.createElement("h5")
				cardHeaderEl.classList.add("card-title")
				const cardBodyEl = document.createElement("div")
				cardBodyEl.classList.add("card-body")
				const brEl= document.createElement("br")
				const cardBody1El =document.createElement("div")
				const cardBody2El = document.createElement("div")
				const cardBody3El = document.createElement("div")
				const imgEl = document.createElement("img")
				imgEl.src= `http://openweathermap.org/img/wn/${daily[i].weather[0].icon}.png`
				cardHeaderEl.textContent = days[i]
				cardBodyEl.appendChild(imgEl)
				cardBody1El.textContent = `H: ${daily[i].temp.max}°F / L: ${daily[i].temp.min}°F`
				cardBody2El.textContent = `Wind Speed: ${daily[i].wind_speed} miles/hour`
				cardBody3El.textContent = `Humidity:${daily[i].humidity}%`
				cardBodyEl.appendChild(cardBody1El)
				cardBodyEl.appendChild(brEl)
				cardBodyEl.appendChild(cardBody2El)
				cardBodyEl.appendChild(cardBody3El)
				cardEl.appendChild(cardHeaderEl)
				cardEl.appendChild(cardBodyEl)
				fiveDayWeatherEl.appendChild(cardEl)
			}
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
            let {lat,lon} = data[0];
			weatherRequestCurrent(lat,lon)
		})
		.catch(err => {
			console.error(err);
		});    
}
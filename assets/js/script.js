// Creating a function to determine the weather at a specific lattitude and longitude
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


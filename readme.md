# Work Day Scheduler
This is the sixth major project that I have worked on. Working on this project was a very educational in terms of using API calls to retrieve information from third party sources and using for loops to iterate through that information and turn it into a usable format. 

## Project Details
This project features a fairly basic grid format created using Bootstrap.js rows and columns. This made styling fairly easy as I was able to set up the sections and areas where I wanted information to be populated. Things that were accomplished:
---
1. Use a type of pseudocode to create a "road map" to guide myself as I coded the project. 
2. Utilize bootstrap.js to style my index.html. 
3. Use a Fetch api call function to retrieve the latitude and longitude from the Geocode API.  
4. Created variables for latitude and longitude that would be passed into the One Call API so that user input would trigger a new api call and retrieve more in-depth information. 
5. Use for loops to iterate through the data and create variables for current weather conditions and future forecasts for all locations. 
6. Revealed the weather information through dynamic element creationg in javascript. 
---
Things that I did not accomplish:
1. Have not added the image icons for weather conditions though I see this as an easy thing to implement in the future.  
2. I was unable to add in the color styling to the uv index though I plan to do so with an if conditional in the future.  
---
![Snapshot](https://user-images.githubusercontent.com/89880190/136501617-d7c5415e-bf7b-4ebc-90f2-2e4ae2147d73.png)


## Code Snippets
Here are few code snippets that I enjoyed coding and what they accomplished. This first snippet used the Fetch api call in conjunction with the Geocode API to retrieve latitude and longitude for a location. I was able to turn these into variables to be passed on to another function. 
```
function getApiLatLon(requestCity, requestGeo) {
    fetch(requestGeo) 
    .then(function(response) {

        return response.json();

    }).then(function(data) {
        console.log(data);//returning an array of information for just Oakland, CA
        for (var i = 0; i < data.length; i++) {
            //console.log(data[i].lat);//confirming that I am receiving the correct infomration
            //console.log(data[i].lon);
            var lat = data[i].lat;
            var long = data[i].lon;
            var cityName = data[i].name;

            //console.log(lat);//placed lat and long in variables
            //console.log(long);//success
            getOneCall(lat, long, cityName)
        }
    });
}
```

Next is the small snippet of the function that I passed the lat and long into. This function served a major purpose in performing a new API call using One Call API as well as establishing variables for current and future weather conditions. I also used a moment.js format method to convert the date, which was in unix time, to a modern state. 
```
function getOneCall(lat, long, cityName) {
    console.log(lat);//successfully passed lat and long to another function
    console.log(long);
    console.log(cityName);

    var requestOneCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=imperial&exclude=minutely,hourly&appid=00471da76e321693dd8116e27589ccf9`

    console.log(requestOneCall); //successfully retrieving information for Oakland, CA
    fetch (requestOneCall)
    .then(function(response) {
        
        return response.json();
    }).then(function(data) {
        console.log(data);

        var unixDate = data.current.dt;
        var weatherDescr = data.current.weather[0].main + " is the current weather condition";
        var currTemp = data.current.temp + " Degrees Fahrenheit";
        var humidity = data.current.humidity + " %";
        var speed = data.current.wind_speed + " mph";
        var uvIndex = data.current.uvi;

        var trueDate = moment.unix(unixDate).format("MM/DD/YYYY");

```

Lastly is a code example of an event listener that I used to add cities to a list of searched cities, save them to local storage, and be able to utilitze previous searches on screen.  
```
$("#add-city").on("click", function(event) {
    event.preventDefault();
    var requestCity = document.getElementById("city-input").value;
    var requestGeo = "https://api.openweathermap.org/geo/1.0/direct?q=" + requestCity + "&limit=1&appid=00471da76e321693dd8116e27589ccf9";
    //console.log(requestCity);
    //console.log(requestGeo);
    getApiLatLon(requestCity, requestGeo);
    localStorage.setItem("city-name", requestCity); //save user input in local storage
    
    var recentCity = document.getElementById('recent');
    
    var pastCities = document.createElement("button");
    var storeCity = document.createTextNode(requestCity);
    pastCities.appendChild(storeCity);
    recentCity.appendChild(pastCities);


    $("button").on("click", function(event) {
        event.preventDefault();
        getApiLatLon(requestCity, requestGeo);
    });
});
```

## Get a copy

To get a working copy on your machine you will need a few things such as access to Gitbash or Terminal, a working SSH key, a Github account, and a code reader like VS Code

Getting your clone:

```
Once you have a working SSH key added to your Github account, go to the weather-dashboard repository. Click the green "code" button on the top right and clonecopy the @github.com link with the SSH key option to your clipboard. 
```

Next:

```
Open Gitbash or Terminal and navigate to a directory that you would like to add the cloned repository. Once in your desired directory type in
"git clone 'right click to paste'" and press enter. This will clone the repository onto your personal machine.
```

Lastly: 

```
Type 'ls' into your Gitbash or Terminal to see a list of items within the directory. If you have done the previous steps correctly then you should see a respository titled "weather-dashboard". Simply type in "code ." to open it in your code editor of choice and have fun!
```

### Built With

* [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
* [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
* [JAVASCRIPT](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
* [JQUERY](https://jquery.com/)
* [BOOTSTRAP.JS](https://getbootstrap.com/)
* [MOMENT.JS](https://momentjs.com/)

## Deployed Link
* [See the Live Site!](https://tylerbyeager.github.io/weather-dashboard/)

## Authors

* **Tyler Brian Yeager**

- [Link to Repo Site](https://github.com/TylerBYeager/weather-dashboard)
- [Link to Github](https://github.com/TylerBYeager/tylerbyeager.github.io)
- [Link to LinkedIn](https://www.linkedin.com/in/tyler-yeager-611926213/)

## License

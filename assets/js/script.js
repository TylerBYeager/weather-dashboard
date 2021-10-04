//use a fetch or ajax call to get lat and long information.
//check to make sure that you are receieving information
//run through the function and assign lat and long variables to be passed to another function
//create another function using the one call weather api
//through this function implement the variables of lat and long to get information on a city
//create a variable for input so that user input for a city gets matched in and outputs the correct information. 
//store in the local storage//
//be able to call that information back. 
//create a function that dynamically places the information on the dashboard. 
//be sure that certain bits of info, per the readme, are populated onto the page
//When done, begin work on getting the future forcase put into variables or cards
//create functions to get those placed on the page as well. 
//ESTABLISH AN EVENT LISTENER OR ON CLICK THAT RENDERS ALL OF THIS INFORMATION WHEN SUBMIT IS PRESSED. 
//refer back to documentation to learn more as you go
//refer back to code drills/activities/jerome's examples on the movie website.
//when functionality is completed begin working on styling. 


//var requestGeo;
//var requestOneCall;
//var requestCity;
var addCity = document.getElementById('add-city');
var cDate = document.getElementById('cDate');
var cDes = document.getElementById("cDes");
var cTemp = document.getElementById("cTemp");
var cHum = document.getElementById("cHum");
var cSpeed = document.getElementById("cSpeed");
var cUvI = document.getElementById("cUvI");
var listCities = [];




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

        var trueDate = moment.unix(unixDate).format("MM/DD/YYYY");//convert unix into modern timestamp
        //console.log(trueDate);
        console.log(trueDate, weatherDescr, currTemp, humidity, speed, uvIndex);
        
        



        //five day variables
        //tomorrow
        console.log(data.daily[0].dt);
        console.log(data.daily[0].weather[0].main);
        console.log(data.daily[0].temp.min);
        console.log(data.daily[0].temp.max);
        console.log(data.daily[0].humidity);
        console.log(data.daily[0].wind_speed);
        console.log(data.daily[0].uvi);

        
        












        appendPage(trueDate, weatherDescr, currTemp, humidity, speed, uvIndex)




        
    
    });
}



$("#add-city").on("click", function(event) {
    event.preventDefault();
    var requestCity = document.getElementById("city-input").value;
    var requestGeo = "https://api.openweathermap.org/geo/1.0/direct?q=" + requestCity + "&limit=1&appid=00471da76e321693dd8116e27589ccf9";
    //console.log(requestCity);
    //console.log(requestGeo);
    getApiLatLon(requestCity, requestGeo);
});

function appendPage(trueDate, weatherDescr, currTemp, humidity, speed, uvIndex) {
    var tDate = document.createTextNode(trueDate);
    var wDes = document.createTextNode(weatherDescr);
    var temp = document.createTextNode(currTemp);
    var humi = document.createTextNode(humidity);
    var wSpd = document.createTextNode(speed);
    var uIndex = document.createTextNode(uvIndex); 
    cDate.innerHTML = "";
    cDes.innerHTML = "";
    cTemp.innerHTML = "";
    cHum.innerHTML = "";
    cSpeed.innerHTML = "";
    cUvI.innerHTML = "";
    cDate.appendChild(tDate);
    cDes.appendChild(wDes);
    cTemp.appendChild(temp);
    cHum.appendChild(humi);
    cSpeed.appendChild(wSpd);
    cUvI.appendChild(uIndex);
//appended weather information to html page
    

        
        
}
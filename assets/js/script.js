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
        //console.log(trueDate, weatherDescr, currTemp, humidity, speed, uvIndex);



        //five day variables
        //tomorrow - day1
        var date1 = data.daily[1].dt;
        var wea1 = data.daily[1].weather[0].main;
        var tempMin1 = data.daily[1].temp.min;
        var tempMax1 = data.daily[1].temp.max;
        var hum1 = data.daily[1].humidity;
        var wspeed1 = data.daily[1].wind_speed;
        var uvi1 = data.daily[1].uvi;
        

        var trueDate1 = moment.unix(date1).format("MM/DD/YYYY");
        

        //day 2
        var date2 = data.daily[2].dt;
        var wea2 = data.daily[2].weather[0].main;
        var tempMin2 = data.daily[2].temp.min;
        var tempMax2 = data.daily[2].temp.max;
        var hum2 = data.daily[2].humidity;
        var wspeed2 = data.daily[2].wind_speed;
        var uvi2 = data.daily[2].uvi;

        var trueDate2 = moment.unix(date2).format("MM/DD/YYYY");

        //day 3
        var date3 = data.daily[3].dt;
        var wea3 = data.daily[3].weather[0].main;
        var tempMin3 = data.daily[3].temp.min;
        var tempMax3 = data.daily[3].temp.max;
        var hum3 = data.daily[3].humidity;
        var wspeed3 = data.daily[3].wind_speed;
        var uvi3 = data.daily[3].uvi;

        var trueDate3 = moment.unix(date3).format("MM/DD/YYYY");

        //day 4
        var date4 = data.daily[4].dt;
        var wea4 = data.daily[4].weather[0].main;
        var tempMin4 = data.daily[4].temp.min;
        var tempMax4 = data.daily[4].temp.max;
        var hum4 = data.daily[4].humidity;
        var wspeed4 = data.daily[4].wind_speed;
        var uvi4 = data.daily[4].uvi;

        var trueDate4 = moment.unix(date4).format("MM/DD/YYYY");

        //day 5
        var date5 = data.daily[5].dt;
        var wea5 = data.daily[5].weather[0].main;
        var tempMin5 = data.daily[5].temp.min;
        var tempMax5 = data.daily[5].temp.max;
        var hum5 = data.daily[5].humidity;
        var wspeed5 = data.daily[5].wind_speed;
        var uvi5 = data.daily[5].uvi;

        var trueDate5 = moment.unix(date5).format("MM/DD/YYYY");

        //all variables for future dates
        //created variables for unix date conversions into modern




        appendPage(trueDate, weatherDescr, currTemp, humidity, speed, uvIndex, trueDate1, trueDate2, trueDate3, trueDate4, trueDate5, wea1, wea2, wea3, wea4, wea5, tempMin1,
             tempMin2, tempMin3, tempMin4, tempMin5, tempMax1, tempMax2, tempMax3, tempMax4, tempMax5, hum1, hum2, hum3, hum4, hum5, wspeed1, wspeed2, wspeed3,
              wspeed4, wspeed5, uvi1, uvi2, uvi3, uvi4, uvi5);




        
    
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

function appendPage(trueDate, weatherDescr, currTemp, humidity, speed, uvIndex, trueDate1, trueDate2, trueDate3, trueDate4, trueDate5, wea1, wea2, wea3, wea4, wea5, tempMin1,
    tempMin2, tempMin3, tempMin4, tempMin5, tempMax1, tempMax2, tempMax3, tempMax4, tempMax5, hum1, hum2, hum3, hum4, hum5, wspeed1, wspeed2, wspeed3,
     wspeed4, wspeed5, uvi1, uvi2, uvi3, uvi4, uvi5) {
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

    var listMake = document.createElement("ul");
    var lMake = document.createElement("li");
    var lMake2 = document.createElement("li");
    var lMake3 = document.createElement("li");
    var lMake4 = document.createElement("li");
    var lMake5 = document.createElement("li");
    var lMake6 = document.createElement("li");
    var lMake7 = document.createElement("li");

    var tDate1 = document.createTextNode(trueDate1);
    var wDes1 = document.createTextNode(wea1);

    lMake.appendChild(tDate1);
    lMake2.appendChild(wDes1);
    listMake.appendChild(lMake);

    var addFuture = document.getElementById('future');
    addFuture.appendChild(cardMake);






}
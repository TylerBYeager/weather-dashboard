//use a fetch or ajax call to get lat and long information.
//check to make sure that you are receieving information
//run through the function and asign lat and long variables to be passed to another function
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


var requestGeo = "http://api.openweathermap.org/geo/1.0/direct?q=Oakland,CA&limit=5&appid=00471da76e321693dd8116e27589ccf9";
var requestOneCall;




function getApiLatLon() {
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
getApiLatLon();


function getOneCall(lat, long, cityName) {
    console.log(lat);//successfully passed lat and long to another function
    console.log(long);
    console.log(cityName);

    var requestOneCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely,hourly&appid=00471da76e321693dd8116e27589ccf9`

    console.log(requestOneCall); //successfully retrieving information for Oakland, CA
    fetch (requestOneCall)
    .then(function(response) {
        
        return response.json();
    }).then(function(data) {
        console.log(data);
        for (var a = 0; a < data.length; a++) {
            console.log(data[i].current.dt);
        }
    })
    
    
}
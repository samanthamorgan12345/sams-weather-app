


function search(searchInput){
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&units=imperial&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();  
  let searchInput = document.querySelector("#city-entered").value;
  search(searchInput);

}

function getCurrentLocation(event) {
  console.log(event);
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(gpsPosition);
}

function showWeather(response) {

  let weatherIcon = document.querySelector("#weather-picture");

  farTemp = response.data.main.temp;

  document.querySelector("#weather-city").innerHTML = response.data.name;
  document.querySelector("#weather-data").innerHTML = Math.round(response.data.main.temp);

  document.querySelector("#max-and-min").innerHTML = `${Math.round(response.data.main.temp_max)}° / ${Math.round(response.data.main.temp_min)}°`;
  
  document.querySelector("#weather-description").innerHTML = response.data.weather[0].description;
  
  weatherIcon.setAttribute("src", `images/${response.data.weather[0].icon}.svg`);
}

function gpsPosition(position){
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

function showCel(event){
  event.preventDefault();
  let tempFar = document.querySelector("#weather-data");
  let celTemp = ((farTemp - 32) * 5 / 9);

  farLink.classList.remove("active");
  celLink.classList.add("active");
  tempFar.innerHTML = Math.round(celTemp);
  
}

function showFar(event){
  event.preventDefault();
  let tempCel = document.querySelector("#weather-data");

  farLink.classList.add("active");
  celLink.classList.remove("active");

  tempCel.innerHTML = Math.round(farTemp);
}




let button = document.querySelector("#gps-button");

button.addEventListener("click", getCurrentLocation);


let farTemp = null;


let form = document.querySelector("#change-city");

form.addEventListener("submit", handleSubmit);




let now = new Date();

let h3 = document.querySelector("h3");

let date = now.getDate();
let hours = now.getHours();
if(hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if(minutes < 10) {
  minutes = `0${minutes}`;
}
let year = now.getFullYear();

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let month = months[now.getMonth()];

h3.innerHTML = `${month} ${date}, ${year} ${hours}:${minutes}`


let celLink = document.querySelector("#cel-link");

celLink.addEventListener("click", showCel);


let farLink = document.querySelector("#far-link");

farLink.addEventListener("click", showFar);

search("New York");
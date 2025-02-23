const button = document.getElementById("searchButt");
const input = document.getElementById("city-name");

const cityName = document.getElementById("cityName");
const cityTime = document.getElementById("time");
const cityTemp = document.getElementById("temp");
const cityfeel = document.getElementById("feels");
const citywind = document.getElementById("wind");
const cityhumi = document.getElementById("humid");
const cityuv = document.getElementById("uv");
const citycondition = document.getElementById("condition");
// const cityimg = document.getElementById("img");

function createRain(cloud) {
  let rect = cloud.getBoundingClientRect();
  for (let i = 0; i < 50; i++) {
    let rainDrop = document.createElement("div");
    rainDrop.classList.add("rain");
    document.body.appendChild(rainDrop);
    rainDrop.style.position = "absolute";
    rainDrop.style.left = rect.left + Math.random() * 500 + "px";
    rainDrop.style.top = rect.bottom + "px";
    rainDrop.style.animationDuration = Math.random() * 1 + 0.5 + "s";
    setTimeout(() => rainDrop.remove(), 1000);
  }
}
setInterval(() => {
  createRain(document.getElementById("bigCloud"));
}, 500);


async function getData(city) {
  try {
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=03ab76e3346b4d55ab2173613252301&q=${city}&aqi=yes`);
    
    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log("API Response:", data);  // Add console log here
    return data;
  } catch (error) {
    console.error("Error:", error);  // Log any errors to the console
    alert("Something went wrong! Please check the city name and try again.");
    return null;
  }
}

// Function to update UI with weather data
function updateWeather(result) {
  cityName.innerText = `${result.location.name}, ${result.location.region} - ${result.location.country}`;
  cityTime.innerText = result.location.localtime;
  cityTemp.innerText = `${result.current.temp_c}°C`;
  cityfeel.innerText = `Feels Like: ${result.current.feelslike_c} °C`;
  citywind.innerText = `Wind Speed: ${result.current.wind_kph} Km/h`;
  cityhumi.innerText = `Humidity: ${result.current.humidity}%`;
  cityuv.innerText = `UV: ${result.current.uv} μW/cm²`;
  citycondition.innerText = `${result.current.condition.text}`;
//   cityimg.innerText = `${result.current.condition.icon}`;
}

// Event listener for search button click
button.addEventListener("click", async () => {
  const value = input.value.trim();
  
  if (!value) {
    alert("Please enter a city name.");
    return;
  }

  console.log("Fetching weather for:", value);  // Log the city being searched
  const result = await getData(value);

  if (result) {
    updateWeather(result);
  }
});

// Event listener for Enter key in input field
input.addEventListener("keydown", async (event) => {
  if (event.key === "Enter") {  // Check if Enter key is pressed
    event.preventDefault();  // Prevent the form from submitting (default behavior)
    
    const value = input.value.trim();
    
    if (!value) {
      alert("Please Enter a City name.");
      return;
    }

    console.log("Fetching weather for:", value);  // Log the city being searched
    const result = await getData(value);

    if (result) {
      updateWeather(result);
    }
  }
});

// Set default city as Jodhpur when the page loads
document.addEventListener("DOMContentLoaded", async () => {
  input.value = "Jodhpur";  // Prepopulate the input field
  console.log("Fetching weather for default city: Jodhpur");
  const result = await getData("Jodhpur");  // Fetch Jodhpur weather data

  if (result) {
    updateWeather(result);
  }
});

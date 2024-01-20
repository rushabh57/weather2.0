window.addEventListener("load", () => {
  document.body.classList.add("show");
  document.querySelector(".loading").classList.add("hidden");

  const srchedData = document.querySelector(".srchedData");
  const srchInput = document.querySelector("#srchInput");
  const UserSrch = document.querySelector(".searchInputBox");
  const UserInput = document.querySelector("#UserSrch");
  const iconBG = document.querySelector(".icon");
  const srchIcon = document.getElementsByClassName("srchICON");

  UserSrch.addEventListener("submit", async (e) => {
    e.preventDefault();
    let input = UserInput.value.trim();

    if (input === "") {
      alert("Please enter a search term");
      return;
    }
    if (input != "") {
      srchInput.classList.add("show");
      srchInput.innerHTML = ` results for: ${input}`;
    }

    const apiEndpoint = `https://api.weatherapi.com/v1/forecast.json?key=1a8b04a4017941d5aca64445241601&days=5&q=${input}`;

    try {
      const response = await fetch(apiEndpoint);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      displayData(data);
      console.log(data);
    } catch (error) {
      // Handle errors
      console.error("Error fetching data:", error);
    }
    UserInput.value = "";
  });
  // Add event listener to elements with class "srchICON"
  for (const srchIconElement of srchIcon) {
    srchIconElement.addEventListener("click", (event) => {
      // Prevent the default click behavior to avoid page reload
      event.preventDefault();

      // Trigger the form submission
      UserSrch.dispatchEvent(new Event("submit"));
      UserInput.value = "";
    });
  }

  const forecastContainer = document.getElementById("forecast-container");
  function generateForecastDayCards(data) {
    forecastContainer.innerHTML = ""; // Clear previous content

    data.forEach((day) => {
      const card = document.createElement("div");
      card.className = "forecast-card";

      // Format the date
      const date = new Date(day.date);
      const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString(
        [],
        { hour: "2-digit", minute: "2-digit" }
      )}`;
      card.innerHTML = `
   <div class='forD'>
   <div>
   <img src="https:${day.day.condition.icon}" alt="Weather Icon">
   <p>${day.day.condition.text}</p>
   </div>
   <h3>${formattedDate}</h3>
   </div>
    <ul class='card-container customScroll'>
      <li>
      <img src='https://www.svgrepo.com/show/500709/sunset.svg' />
      <h4>Sunset</h4>
      <p>${day.astro.sunset}</p>
      </li>
      
      <li>
      <img src='https://www.svgrepo.com/show/500714/sunrise.svg' />
      <h4>Sunrise</h4>
      <p>${day.astro.sunrise}</p>
      </li>
      
      <li>
      <img src='https://www.svgrepo.com/show/417661/moon.svg' />
      <h4>Moonrise</h4>
      <p>${day.astro.moonrise}</p>
      </li>
      
      <li>
      <img src='https://www.svgrepo.com/show/358032/moonset.svg' />
      <h4>Moonset</h4>
      <p>${day.astro.moonset}</p>

      </li>
      <li>
      <img src='https://www.svgrepo.com/show/415413/temprature-thermometer-device.svg' />
      <h4>Avg Humidity</h4>
      <p>${day.day.avghumidity}</p>

      </li>
      <li>
      <img src='https://www.svgrepo.com/show/455589/thermometer-temp.svg' />
      <h4>Avg Temp</h4>
      <p>${day.day.avgtemp_c}°C / ${day.day.avgtemp_f}°F</p>

      </li>
      <li>
      <img src='https://www.svgrepo.com/show/415412/high-temprature-temperature.svg' />
      <h4>Max Temp</h4>
      <p>${day.day.maxtemp_c}°C / ${day.day.maxtemp_f}°F</p>

      </li>
      <li>
      <img src='https://www.svgrepo.com/show/415411/low-temprature-temperature.svg' />
      <h4>Min Temp</h4>
      <p>${day.day.mintemp_c}°C / ${day.day.mintemp_f}°F</p>

      </li>
    
      <li>
      <img src='https://www.svgrepo.com/show/510156/rain.svg' />
      <h4>Chance of Rain</h4>
      <p>${day.day.daily_chance_of_rain}%</p>

      </li>
      <li>
      <img src='https://www.svgrepo.com/show/481988/snow-crystal-2.svg' />
      <h4>Chance of Snow</h4>
      <p>${day.day.daily_chance_of_snow}%</p>

      </li>
      <li>
      <img src='https://www.svgrepo.com/show/521800/rain.svg' />
      <h4>Will it Rain</h4>
      <p> ${day.day.daily_will_it_rain ? "Yes" : "No"}  </p>

      </li>
      <li>
      <img src='https://www.svgrepo.com/show/394452/snows.svg' />
      <h4>Will it Snow</h4>
      <p>${day.day.daily_will_it_snow ? "Yes" : "No"}</p>
      </li>
      <li>
      <img src='https://www.svgrepo.com/show/384299/direction-wind-speed-navigation.svg' />
      <h4>Max Wind Speed</h4>
    <p> ${day.day.maxwind_kph} km/h / ${day.day.maxwind_mph} mph</p>
    </li>
      <li>
      <img src='https://www.svgrepo.com/show/379306/visibility.svg' />
      <h4>Avg Visibility</h4>
    <p>${day.day.avgvis_km} km / ${day.day.avgvis_miles} miles</p>
    </li>
    </ul>

  `;

      // Append the card to the forecast container
      forecastContainer.appendChild(card);
    });
  }

  // Function to display the fetched data
  function displayData(data) {
    srchedData.innerHTML = "";

    const locationInfo = document.createElement("div");
    //   locationInfo.classList.add("srchedDataBox");

    const conditionText = data.current.condition.text;
    let src;

    switch (conditionText) {
      case "Clear":
        src = "./assets/media/clear.mp4";
        break;
      case "Sunny":
        src = "./assets/media/snnuy.mp4";
        break;
      case "Cloudy":
        src = "./assets/media/clody.mp4";
        break;
      case "Rain":
        src = "./assets/media/rain.mp4";
        break;
      case "Patchy rain":
        src = "./assets/media/patchRain.mp4";
        break;
      case "Moderate":
        src = "./assets/media/Modarate.mp4";
        break;
      case "Partly cloudy":
        src = "./assets/media/partycloded.mp4";
        break;
      case "Overcast":
        src = "./assets/media/overcast.mp4";
        break;
      // Default background color
      default:
        src = "./assets/media/clouded2.mp4";
    }

    locationInfo.innerHTML = `
    <div class="srched">
    <div class="wrapper-srched">
        <div class="icon">
            <img src="${data.current.condition.icon}" alt="">
            <!-- Add your video element here -->
            <video autoplay muted loop>
              <source src=${src} type="video/mp4">
              Your browser does not support the video tag.
            </video>
            <div class="degree">
            <h1>${data.current.temp_f}°F</h1>
            <h6>${data.current.condition.text}</h6>
            </div>
        </div>
        <div class="srchedDetails">
            <div class="citydetail">
            <h1 class="cityName">${data.location.name} </h1>
            <span class='dot'></span> 
            <h4 class="countryName">${data.location.country}</h4>
            </div>
            <p class="countryregion">${data.location.region}</p>
            <div class="other-details  customScroll">
            <div class='o-wrapper customScroll'>
              ${generateMiniCards(data)}
            </div>
            </div>
            <div class="lanlot">
                <p class="lan">lat: ${data.location.lat}</p>
                <p class="lot">lon: ${data.location.lon}</p>
            </div>
        </div>
    </div>
  </div> `;

    srchedData.appendChild(locationInfo);

    generateForecastDayCards(data.forecast.forecastday);
  }
  function GenerateRelativeSrc() {
    const boxs = [
      {
        img: "./assets/media/location-pin-svgrepo-com.svg",
        Cityname: "london",
        Countryname: "United Kingdom",
      },
      {
        img: "./assets/media/location-pin-svgrepo-com.svg",
        Cityname: "Kabul",
        Countryname: "Afghanistan",
      },
      {
        img: "./assets/media/location-pin-svgrepo-com.svg",
        Cityname: "Andorra",
        Countryname: "Andorra la Vella",
      },
      {
        img: "./assets/media/location-pin-svgrepo-com.svg",
        Cityname: "Baku",
        Countryname: "Azerbaijan",
      },
      {
        img: "./assets/media/location-pin-svgrepo-com.svg",
        Cityname: "Thimphu",
        Countryname: "Bhutan",
      },
      {
        img: "./assets/media/location-pin-svgrepo-com.svg",
        Cityname: "Phnom Penh",
        Countryname: "Cambodia",
      },
      {
        img: "./assets/media/location-pin-svgrepo-com.svg",
        Cityname: "Beijing",
        Countryname: "China",
      },
      {
        img: "./assets/media/location-pin-svgrepo-com.svg",
        Cityname: "Havana",
        Countryname: "Cuba",
      },
      {
        img: "./assets/media/location-pin-svgrepo-com.svg",
        Cityname: "Andorra",
        Countryname: "Denmark",
      },
      {
        img: "./assets/media/location-pin-svgrepo-com.svg",
        Cityname: "Copenhagen",
        Countryname: "Azerbaijan",
      },
      {
        img: "./assets/media/location-pin-svgrepo-com.svg",
        Cityname: "Paris",
        Countryname: "France",
      },
      {
        img: "./assets/media/location-pin-svgrepo-com.svg",
        Cityname: "New Delhi",
        Countryname: "India",
      },
      {
        img: "./assets/media/location-pin-svgrepo-com.svg",
        Cityname: "Seoul",
        Countryname: "South Korea",
      },
      {
        img: "./assets/media/location-pin-svgrepo-com.svg",
        Cityname: "Ankara",
        Countryname: "Turkey",
      },
      {
        img: "./assets/media/location-pin-svgrepo-com.svg",
        Cityname: "Pyongyang",
        Countryname: "North Korea",
      },
      {
        img: "./assets/media/location-pin-svgrepo-com.svg",
        Cityname: "Tokyo",
        Countryname: "Japan",
      },
    ];
    const boxHTML = boxs
      .map(
        (box) => `
    <div class="places-rect">
    <div class="inner-rect">
        <div class="icon">
            <img src=${box.img} loading="lazy" alt=${box.Countryname}>
        </div>
        <div class="detail">
            <h3>${box.Cityname}</h3>
            <p>${box.Countryname}</p>
        </div>
    </div>
    <button class='check-weather-btn'>check wheather?</button>
</div>
  `
      )
      .join("");

    return boxHTML;
  }
  const sideBar = document.querySelector("#sideConBox");
  sideBar.innerHTML = GenerateRelativeSrc();

  // Attach a click event listener to all "Check Weather" buttons
  const checkWeatherButtons = document.querySelectorAll(".check-weather-btn");
  checkWeatherButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const cityName = button
        .closest(".places-rect")
        .querySelector("h3").textContent;
      UserInput.value = cityName;
      UserInput.focus();
    });
  });
  // Function to generate mini-cards based on a configuration object
  function generateMiniCards(data) {
    const cardConfig = [
      {
        img: "https://www.svgrepo.com/show/455589/thermometer-temp.svg",
        label: "Wind Speed",
        value: `${data.current.wind_mph} mph / ${data.current.wind_kph} kph`,
      },
      {
        img: "https://www.svgrepo.com/show/384299/direction-wind-speed-navigation.svg",
        label: "Wind Direction",
        value: `${data.current.wind_dir} (${data.current.wind_degree}°)`,
      },
      {
        img: "https://www.svgrepo.com/show/458843/pressure.svg",
        label: "Pressure",
        value: `${data.current.pressure_mb} mb / ${data.current.pressure_in} in`,
      },
      {
        label: "Precipitation",
        value: `${data.current.precip_mm} mm / ${data.current.precip_in} in`,
        img: "https://www.svgrepo.com/show/379576/rain.svg",
      },
      {
        img: "https://www.svgrepo.com/show/499938/humidity.svg",
        label: "Humidity",
        value: `${data.current.humidity}%`,
      },
      {
        img: "https://www.svgrepo.com/show/231068/cloud-weather.svg",
        label: "Cloud Cover",
        value: `${data.current.cloud}%`,
      },
      {
        img: "https://www.svgrepo.com/show/341126/temperature-feels-like.svg",
        label: "Feels Like",
        value: `${data.current.feelslike_c}°C / ${data.current.feelslike_f}°F`,
      },
      {
        label: "Visibility",
        value: `${data.current.vis_km} km / ${data.current.vis_miles} miles`,
        img: "https://www.svgrepo.com/show/379306/visibility.svg",
      },
      {
        img: "https://www.svgrepo.com/show/341277/uv-index-alt.svg",
        label: "UV Index",
        value: `${data.current.uv}`,
      },
      {
        img: "https://www.svgrepo.com/show/390821/forecast-blow-weather-wind-windy.svg",
        label: "Gust Speed",
        value: `${data.current.gust_mph} mph / ${data.current.gust_kph} kph`,
      },
    ];

    const miniCardsHTML = cardConfig
      .map(
        (card) => `
      <div class="mini-card">
      <img src=${card.img} alt=${card.label} />
        <h5>${card.label}</h5>
        <p>${card.value}</p>
      </div>
    `
      )
      .join("");

    return miniCardsHTML;
  }

  //

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
  getLocation();
  function showPosition(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    UserInput.value = latitude + ", " + longitude;
  }

  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.");
        break;
    }
  }
});
